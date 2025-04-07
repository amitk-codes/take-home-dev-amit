// Dynamic contract address and network settings
let CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Default fallback address
let BLOCKCHAIN_NETWORK = {
    chainId: "0x539", // Default to Hardhat's local network (1337 in decimal)
    chainName: "Localhost 8545",
    nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18
    },
    rpcUrls: ["http://127.0.0.1:8545/"],
    blockExplorerUrls: []
};

// Load configuration from the server
async function loadConfiguration() {
    try {
        const response = await fetch('/api/config/blockchain');
        if (response.ok) {
            const config = await response.json();
            if (config.contractAddress) {
                CONTRACT_ADDRESS = config.contractAddress;
                console.log("Loaded contract address:", CONTRACT_ADDRESS);
            }
            if (config.network) {
                BLOCKCHAIN_NETWORK = config.network;
                console.log("Loaded network configuration:", BLOCKCHAIN_NETWORK.chainName);
            }
        }
    } catch (error) {
        console.warn("Could not load blockchain configuration, using defaults:", error);
    }
}

// Function to check if MetaMask is installed
async function checkMetaMaskInstalled() {
    if (window.ethereum) {
        return true;
    }
    return false;
}

// Function to switch to the correct chain
async function switchToCorrectChain() {
    if (!window.ethereum) {
        throw new Error("MetaMask not installed");
    }

    try {
        // First try to switch to the chain
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: BLOCKCHAIN_NETWORK.chainId }],
        });
        return true;
    } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
            try {
                // Add the network to MetaMask
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [BLOCKCHAIN_NETWORK],
                });
                return true;
            } catch (addError) {
                console.error("Error adding network:", addError);
                throw new Error(`Failed to add the ${BLOCKCHAIN_NETWORK.chainName} network to MetaMask: ${addError.message}`);
            }
        } else {
            console.error("Error switching network:", switchError);
            throw new Error(`Failed to switch to the ${BLOCKCHAIN_NETWORK.chainName} network: ${switchError.message}`);
        }
    }
}

// Function to connect to MetaMask wallet and ensure correct chain
async function connectWallet() {
    if (!window.ethereum) {
        throw new Error("MetaMask not installed");
    }

    try {
        // Ensure we're on the correct chain
        await switchToCorrectChain();
        
        // Force a complete refresh of accounts to get the most recent selection
        // This will ensure we get the account the user has currently selected in MetaMask
        await window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] });
        
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Clear the disconnected flag when manually connecting
        localStorage.removeItem('walletManuallyDisconnected');
        
        return accounts[0];
    } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        throw error;
    }
}

// Function to disconnect wallet (just UI state, not actual disconnection)
function disconnectWallet() {
    // Store disconnected state in localStorage
    localStorage.setItem('walletManuallyDisconnected', 'true');
    console.log("Wallet disconnected from UI, stored in localStorage");
    return true;
}

// Check if wallet already connected
async function checkWalletConnection() {
    // Check if the user manually disconnected in a previous session
    if (localStorage.getItem('walletManuallyDisconnected') === 'true') {
        console.log("User previously disconnected manually, not auto-connecting");
        return null;
    }

    if (!window.ethereum) {
        return null;
    }

    try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length === 0) {
            return null;
        }
        
        // Check if we're on the correct network
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (chainId !== BLOCKCHAIN_NETWORK.chainId) {
            console.log("Connected but wrong network. Current:", chainId, "Expected:", BLOCKCHAIN_NETWORK.chainId);
            return null;
        }
        
        return accounts[0];
    } catch (error) {
        console.error("Error checking wallet connection:", error);
        return null;
    }
}

// Get contract instance using ethers.js
async function getProductVerificationContract() {
    if (!window.ethereum) {
        throw new Error("MetaMask not installed");
    }

    // Ensure we're on the correct chain
    await switchToCorrectChain();

    // Get ABI from the public folder
    const response = await fetch('/contracts/ProductVerification.json');
    const contractData = await response.json();

    // Create a Web3 provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // Create contract instance
    return new ethers.Contract(CONTRACT_ADDRESS, contractData.abi, signer);
}

// Check if a product is verified
async function isProductVerified(productCode) {
    try {
        const contract = await getProductVerificationContract();
        return await contract.isProductVerified(productCode);
    } catch (error) {
        console.error("Error checking product verification:", error);
        throw error;
    }
}

// Verify a product
async function verifyProduct(productCode, walletAddress) {
    try {
        const contract = await getProductVerificationContract();
        const tx = await contract.verifyProduct(productCode);
        
        // Wait for the transaction to be mined
        await tx.wait();
        
        return {
            success: true,
            txHash: tx.hash,
            timestamp: Date.now(),
            blockNumber: tx.blockNumber
        };
    } catch (error) {
        console.error("Error verifying product:", error);
        // Check for "already verified" error
        if (error.message && error.message.includes("Product already verified")) {
            return { 
                success: false, 
                error: "This product has already been verified on the blockchain."
            };
        }
        
        return { 
            success: false, 
            error: error.message || "Failed to verify product"
        };
    }
}

// Format wallet address for display (0x9965...a4dc)
function formatAddress(address) {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

// Get the current network name
function getNetworkName() {
    return BLOCKCHAIN_NETWORK.chainName;
}

// Listen for account changes
function setupAccountChangeListener(callback) {
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', callback);
    }
}

// Listen for chain changes
function setupChainChangeListener(callback) {
    if (window.ethereum) {
        window.ethereum.on('chainChanged', chainId => {
            const formattedChainId = parseInt(chainId, 16);
            callback(formattedChainId);
        });
    }
}

// Get transaction receipt
async function getTransactionReceipt(txHash) {
    if (!window.ethereum) {
        throw new Error("MetaMask not installed");
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return await provider.getTransactionReceipt(txHash);
}

// Initialize
(async function() {
    await loadConfiguration();
})(); 