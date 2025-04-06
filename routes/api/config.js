const router = require('express').Router();
const blockchainConfig = require('../../config/blockchain');

// Get blockchain configuration
router.get('/blockchain', (req, res) => {
    res.json(blockchainConfig.config);
});

module.exports = router; 