// Import required modules
const express = require('express');
const { Connection, PublicKey } = require('@solana/web3.js');
const cors = require('cors');
require('dotenv').config();  // To use environment variables

// Get the RPC URL and port from the environment variables
const rpcUrl = process.env.RPC_URL || 'https://default-rpc-url.com';  // Fallback URL if not in .env
const port = process.env.PORT || 3000;

// Initialize express app
const app = express();
app.use(express.json());  // Middleware to parse JSON requests
app.use(cors());  // Allow cross-origin requests (optional, but useful for frontend communication)

// Connect to the Solana network
const connection = new Connection(rpcUrl, 'confirmed');

// Route to fetch the balance of a public key
app.post('/fetchBalance', async (req, res) => {
    try {
        const { publicKey } = req.body;  // Get the public key from the request
        const balance = await connection.getBalance(new PublicKey(publicKey));  // Fetch balance from Solana
        res.json({ balance });  // Send balance as response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch balance' });
    }
});

// Route to sign a transaction
app.post('/signTransaction', async (req, res) => {
    try {
        const { transaction } = req.body;  // Get the transaction from the request
        const signature = await connection.signTransaction(transaction);  // Sign the transaction
        res.json({ signature });  // Send signature as response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to sign transaction' });
    }
});

// Health check route (optional)
app.get('/health', (req, res) => {
    res.send('Backend is running');
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
});
