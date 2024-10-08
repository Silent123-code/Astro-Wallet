import { useState } from "react";
import "./App.css";
import newLogo from "./astrowallet.svg";
import { Button, Card, Typography } from "antd";
import CreateWallet from "./components/CreateWallet";
import BalanceDisplay from "./components/BalanceDisplay";
import Transaction from "./components/Transaction";
import Welcome from "./components/Welcome"; // Ensure the import is correct
import { UserAddOutlined, WalletOutlined, TransactionOutlined } from '@ant-design/icons';
import axios from 'axios';

function App() {
  const [wallet, setWallet] = useState(null); // State for the wallet
  const [balance, setBalance] = useState(null); // State for the balance
  const [selectedOption, setSelectedOption] = useState("welcome"); // State for the selected option
  const [zoomed, setZoomed] = useState(false); // State for the zoom effect

  const handleGetStarted = () => {
    setZoomed(true); // Trigger zoom effect
    setTimeout(() => {
      setSelectedOption("createAccount"); // Change to createAccount after zoom
    }, 1000); // Delay to sync with zoom transition
  };

  const handleGoHome = () => {
    setZoomed(false); // Reset zoom when going back
    setSelectedOption("welcome");
  };

  const handleBack = () => {
    if (selectedOption === "createAccount") {
      setSelectedOption("welcome"); // Go back to welcome
    } else if (selectedOption === "createWallet") {
      setSelectedOption("createAccount"); // Go back to create account
    } else if (selectedOption === "walletOptions") {
      setSelectedOption("createWallet"); // Go back to create wallet
    } else if (selectedOption === "importWallet") {
      setSelectedOption("createAccount"); // Go back to create account
    } else if (selectedOption === "displayBalance" || selectedOption === "transaction") {
      setSelectedOption("walletOptions"); // Go back to wallet options
    }
  };

  const fetchBalance = async (publicKey) => {
    try {
      const response = await axios.post('http://localhost:3000/fetchBalance', { publicKey });
      const balance = response.data.balance;
      setBalance(balance); // Set the fetched balance
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateWallet = async () => {
    try {
      const response = await axios.post('http://localhost:3000/createWallet');
      const wallet = response.data.wallet;
      setWallet(wallet);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImportWallet = async (privateKey) => {
    try {
      const response = await axios.post('http://localhost:3000/importWallet', { privateKey });
      const wallet = response.data.wallet;
      setWallet(wallet);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTransaction = async (transactionData) => {
    try {
      const response = await axios.post('http://localhost:3000/sendTransaction', transactionData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`App-container ${zoomed ? 'zoomed' : ''}`}>
      <div className={`App ${zoomed ? 'zoomed' : ''}`}>
        <header className="header">
          <div className="logo-container" onClick={handleGoHome} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <img src={newLogo} className="headerLogo" alt="logo" />
            <Typography.Title level={2} className="wallet-title" style={{ marginLeft: '10px', color: 'white' }}>
              ASTRO WALLET
            </Typography.Title>
          </div>
          <div className="account-info">
            <span className="account-name">User1</span>
          </div>
        </header>

        <div className="balance-section">
          <Typography.Title level={1} className="balance">{balance !== null ? `Balance: ${balance}` : "No Balance"}</Typography.Title>
          <Typography.Text className="subtext"></Typography.Text>
        </div>

        {/* Render the Welcome component when selectedOption is 'welcome' */}
        {selectedOption === "welcome" && <Welcome onCreateAccount={handleGetStarted} />}

        <div className="content">
          <Card className="optionCard">
            {selectedOption === "createAccount" && (
              <div className="get-started-container">
                <Button
                  icon={<WalletOutlined />}
                  className="action-button"
                  onClick={() => setSelectedOption("createWallet")}
                  style={buttonStyle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  Create Account
                </Button>

                <Button
                  icon={<UserAddOutlined />}
                  className="action-button"
                  onClick={() => setSelectedOption("importWallet")}
                  style={buttonStyle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  Import Existing Wallet
                </Button>

                <Button
                  onClick={handleBack}
                  style={backButtonStyle}
                >
                  Back
                </Button>
              </div>
            )}

            {selectedOption === "createWallet" && (
              <>
                <CreateWallet setWallet={setWallet} onSuccess={() => setSelectedOption("walletOptions")} />
                <Button onClick={handleBack} style={backButtonStyle}>Back</Button>
              </>
            )}

            {selectedOption === "walletOptions" && wallet && (
              <div className="wallet-options">
                <Button
                  icon={<WalletOutlined />}
                  className="action-button"
                  onClick={() => setSelectedOption("displayBalance")}
                  style={buttonStyle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  Display Balance
                </Button>

                <Button
                  icon={<TransactionOutlined />}
                  className="action-button"
                  onClick={() => setSelectedOption("transaction")}
                  style={buttonStyle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  Transaction
                </Button>

                <Button
                  onClick={handleBack}
                  style={backButtonStyle}
                >
                  Back
                </Button>
              </div>
            )}

            {selectedOption === "importWallet" && (
              <>
                <CreateWallet setWallet={setWallet} />
                <Button onClick={handleBack} style={backButtonStyle}>Back</Button>
              </>
            )}

            {selectedOption === "displayBalance" && wallet && (
              <>
                <BalanceDisplay walletAddress={wallet.publicKey.toString()} />
                <Button onClick={handleBack} style={backButtonStyle}>Back</Button>
              </>
            )}

            {selectedOption === "transaction" && wallet && (
              <>
                <Transaction wallet={wallet} />
                <Button onClick={handleBack} style={backButtonStyle}>Back</Button>
              </>
            )}
          </Card>
        </div>

        <footer className="footer">
          <p>© 2024 ASTRO WALLET. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
}

// Styles for the buttons
const buttonStyle = {
  background: 'linear-gradient(45deg, #007bff, #00c3ff)',
  borderColor: 'transparent',
  borderRadius: '25px',
  padding: '10px 20px',
  fontWeight: 'bold',
  color: 'white',
  boxShadow: '0 4px 10px rgba(0, 123, 255, 0.6)',
  transition: 'transform 0.2s, box-shadow 0.2s',
};

const backButtonStyle = {
  background: '#f5f5f5',
  borderColor: '#d9d9d9',
  borderRadius: '25px',
  padding: '10px 20px',
  fontWeight: 'bold',
  color: '#595959',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  marginTop: '20px',
};

const handleMouseEnter = (e) => {
  e.target.style.transform = 'scale(1.1)';
  e.target.style.boxShadow = '0 6px 12px rgba(0, 123, 255, 0.9)';
};

const handleMouseLeave = (e) => {
  e.target.style.transform = 'scale(1)';
  e.target.style.boxShadow = '0 4px 10px rgba(0, 123, 255, 0.6)';
};

export default App;
