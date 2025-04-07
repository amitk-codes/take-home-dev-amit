# Blockchain Product Verification System

This repository contains a blockchain-based product verification system to verify the authenticity of products using Ethereum smart contracts.

## Screenshots:

![Product Verification Interface](https://res.cloudinary.com/cryptechdev/image/upload/v1744018010/0_t2sxcw.png)

![Verification Process](https://res.cloudinary.com/cryptechdev/image/upload/v1744018009/1_w4nyta.png)

![Connected Wallet](https://res.cloudinary.com/cryptechdev/image/upload/v1744018010/2_c38cfg.png)

## Demo Video:

[▶️ Watch Demo Video](https://res.cloudinary.com/cryptechdev/video/upload/v1744018041/Screencast_from_2025-04-07_14-47-32_c0scqi.webm)

## Table of Contents

- [Added Functionality](#added-functionality)
- [How It Works](#how-it-works)
- [What to Look At](#what-to-look-at)
- [How to Run It](#how-to-run-it)
- [Technical Notes](#technical-notes)

## Added Functionality

This system extends the existing product management application with the following blockchain features:

- **Product Verification Page**: A dedicated page where users can verify products on the blockchain
- **Wallet Connection**: Integration with MetaMask for blockchain transactions
- **Blockchain Status**: Real-time status indicators showing verification state for each product
- **Smart Contract Integration**: Ethereum smart contract that records and tracks product verification
- **Modern UI**: Clean, responsive interface with intuitive user experience

The verification system ensures that:
- Each product can only be verified once
- All verifications are transparent and immutable on the blockchain

## How It Works

### Smart Contract

The core of the system is the `ProductVerification` smart contract which:

1. Stores the verification status of products
2. Records timestamps of when products were verified
3. Emits events when a product is verified
4. Provides functions to check verification status

### Frontend Integration

The frontend connects to the blockchain through these key components:

1. **Ethers.js Integration**: Handles wallet connection and blockchain interactions
2. **Verification UI**: Provides a user-friendly interface for the verification process
3. **Status Tracking**: Shows real-time verification status in the product list

### Verification Flow

1. User connects their MetaMask wallet
2. User enters or selects a product code from the suggestions
3. User clicks "Verify Authenticity" button
4. MetaMask prompts user to sign the transaction
5. Smart contract records the verification on the blockchain
6. UI updates to show verification success

## What to Look At

### Key Components

1. **Smart Contract**
   - `on-chain/contracts/ProductVerification.sol`: The Solidity smart contract
   - `on-chain/scripts/deploy.js`: Deployment script

2. **Frontend Code**
   - `views/products/verify.ejs`: The main verification page
   - `public/js/web3.js`: Handles blockchain interactions
   - `public/css/product-verification.css`: Styling for the verification page

3. **Backend Integration**
   - `controllers/ProductController.js`: Added verification page controller
   - `config/blockchain.js`: Configuration for blockchain network

## How to Run It

### Prerequisites

- Node.js and npm
- MetaMask browser extension

### Setup Steps

1. **Clone the repository and install dependencies**
   ```
   npm install
   ```

2. **Set up the blockchain environment**
   ```
   cd on-chain
   npm install
   ```

3. **Start a local Hardhat node**
   ```
   cd on-chain
   npm run node
   ```

4. **Deploy the contract locally**
   ```
   # In a new terminal
   cd on-chain
   npm run deploy
   ```

5. **Configure MetaMask**
   - Open MetaMask
   - Create a new network with:
     - Network Name: Hardhat Local
     - RPC URL: http://127.0.0.1:8545
     - Chain ID: 1337
     - Currency Symbol: ETH
   - Import a test account using a private key from the Hardhat node output

6. **Start the application**
   ```
   # In the project root
   npm start
   ```

7. **Access the application**
   - Open your browser to `http://localhost:3000`
   - Navigate to the Products page
   - Click on "Verify Products" button

## Technical Notes

- The system uses Hardhat for local blockchain development
- Smart contract is built with OpenZeppelin's Ownable pattern for security
- All blockchain transactions require gas fees (free on local network)
