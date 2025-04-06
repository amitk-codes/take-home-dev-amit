/**
 * Blockchain configuration
 * This file defines the blockchain networks and contract addresses
 * based on the environment variables
 */

require('dotenv').config();

// Default to localhost if not specified
const BLOCKCHAIN_NETWORK = process.env.BLOCKCHAIN_NETWORK || 'localhost';

// Networks configuration
const networks = {
    // Local development network
    localhost: {
        contractAddress: process.env.LOCAL_CONTRACT_ADDRESS || '0x5FbDB2315678afecb367f032d93F642f64180aa3',
        network: {
            chainId: '0x539', // 1337 in decimal
            chainName: 'Localhost 8545',
            nativeCurrency: {
                name: 'Ethereum',
                symbol: 'ETH',
                decimals: 18
            },
            rpcUrls: [process.env.LOCAL_RPC_URL || 'http://127.0.0.1:8545/'],
            blockExplorerUrls: []
        }
    },
    
    // Sepolia testnet
    sepolia: {
        contractAddress: process.env.SEPOLIA_CONTRACT_ADDRESS,
        network: {
            chainId: '0xaa36a7', // 11155111 in decimal
            chainName: 'Sepolia',
            nativeCurrency: {
                name: 'Ethereum',
                symbol: 'ETH',
                decimals: 18
            },
            rpcUrls: [process.env.SEPOLIA_RPC_URL || 'https://sepolia.infura.io/v3/'],
            blockExplorerUrls: ['https://sepolia.etherscan.io']
        }
    }
};

// Get configuration for the current network
const getNetworkConfig = () => {
    if (!networks[BLOCKCHAIN_NETWORK]) {
        console.warn(`Blockchain network ${BLOCKCHAIN_NETWORK} not found, using localhost`);
        return networks.localhost;
    }
    
    return networks[BLOCKCHAIN_NETWORK];
};

module.exports = {
    currentNetwork: BLOCKCHAIN_NETWORK,
    config: getNetworkConfig()
}; 