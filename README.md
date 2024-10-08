# Astro Wallet

Astro Wallet is a decentralized wallet application that allows users to create and manage Solana-based wallets. Users can perform biometric authentication (Face ID on iOS, Fingerprint on Android) , check balances, and import existing wallets.
As Face ID is not working so a password system is being used to bypass the login.

## Features

- **Create Wallet**: Users can create a new wallet using Face ID, Fingerprint, or password.
- **Import Wallet**: Allows importing existing wallets.
- **Display Balance**: Fetch and display the current balance of a Solana wallet.
- **Transaction Management**: Supports sending and receiving SOL transactions.

## Technologies Used

- **Frontend**: React.js, Ant Design
- **Backend**: Node.js, Express
- **Blockchain**: Solana, Web3.js
- **Biometric Authentication**: WebAuthn API for Face ID and Fingerprint authentication

## Project Structure

```bash
hp-project/
├── backend/
│   ├── app.js
│   ├── balance.js
│   ├── package.json 
│   ├── package-lock.json   
│   ├── rpc-server.js     
│   ├── .env  
│   ├── .gitignore
├── hp/
│   ├── node_modules/
│   ├── public/
│   │   ├── images/
│   │   │   ├── Astronaut bg image.png
│   │   │   ├── earth-image.png
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   ├── moralisLogo.svg
│   │   ├── mwallet.png
│   │   ├── robots.txt
│   ├── src/
│   │   ├── assets/
│   │   │   ├── earth-image.png
│   │   ├── components/
│   │   │   ├── BalanceDisplay.css
│   │   │   ├── BalanceDisplay.js
│   │   │   ├── CreateWallet.css
│   │   │   ├── CreateWallet.js
│   │   │   ├── Transaction.css
│   │   │   ├── Transaction.js
│   │   │   ├── UnlockWallet.js
│   │   │   ├── Welcome.css
│   │   │   ├── Welcome.js
│   │   ├── logo/
│   │   │   ├── moralisLogo.svg
│   │   │   ├── mwallet.png
│   │   ├── App.css
│   │   ├── App.js 
│   │   ├── App.test.js
│   │   ├── Astronaut bg image.png  
│   │   ├── astrowallet.svg 
│   │   ├── earth-image.png
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── logo.svg   
│   │   ├── reportWebVitals.js
│   │   ├── setupTests.js
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
├── node_modules/
├── package.json
├── package-lock.json



MIT License

Copyright (c) 2024 Silent123-code

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
