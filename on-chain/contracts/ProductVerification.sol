// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ProductVerification
 * @dev Contract for verifying product authenticity
 */
contract ProductVerification is Ownable {
    // Mapping of product codes to their verification status
    mapping(string => bool) private verifiedProducts;
    
    // Mapping to track verification timestamps
    mapping(string => uint256) private verificationTimestamps;
    
    // Event emitted when a product is verified
    event ProductVerified(string productCode, address verifier, uint256 timestamp);
    
    constructor() Ownable(msg.sender) {}
    
    /**
     * @dev Verify a product's authenticity
     * @param productCode The unique code of the product
     */
    function verifyProduct(string memory productCode) public {
        require(!isProductVerified(productCode), "Product already verified");
        
        verifiedProducts[productCode] = true;
        verificationTimestamps[productCode] = block.timestamp;
        
        emit ProductVerified(productCode, msg.sender, block.timestamp);
    }
    
    /**
     * @dev Check if a product is verified
     * @param productCode The unique code of the product
     * @return bool Whether the product is verified or not
     */
    function isProductVerified(string memory productCode) public view returns (bool) {
        return verifiedProducts[productCode];
    }
    
    /**
     * @dev Get the verification timestamp for a product
     * @param productCode The unique code of the product
     * @return uint256 The timestamp when the product was verified (0 if not verified)
     */
    function getVerificationTimestamp(string memory productCode) public view returns (uint256) {
        return verificationTimestamps[productCode];
    }
} 