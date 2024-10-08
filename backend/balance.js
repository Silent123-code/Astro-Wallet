// backend/routes/balance.js
const express = require('express');
const { Connection, PublicKey } = require('@solana/web3.js');

const router = express.Router();
const connection = new Connection('https://api.mainnet-beta.solana.com'); // Change to testnet or devnet as needed

router.get('/balance/:address', async (req, res) => {
    const { address } = req.params;

    try {
        const publicKey = new PublicKey(address);
        const balance = await connection.getBalance(publicKey);
        res.json({ balance: balance / 1e9 }); // Convert lamports to SOL
    } catch (error) {
        console.error('Error fetching balance:', error);
        res.status(500).json({ error: 'Failed to fetch balance' });
    }
});

module.exports = router;
