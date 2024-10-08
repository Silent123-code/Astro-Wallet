// backend/app.js (or wherever your Express app is defined)
const express = require('express');
const balanceRoute = require('./routes/balance');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api', balanceRoute); // Mount the balance route

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
