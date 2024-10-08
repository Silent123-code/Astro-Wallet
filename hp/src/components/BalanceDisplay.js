import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import './BalanceDisplay.css'; // Import the CSS file

const BalanceDisplay = ({ walletAddress }) => {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null); // New state for error handling

  useEffect(() => {
    const fetchBalance = async () => {
      if (!walletAddress) {
        setError('No wallet address provided');
        return;
      }

      try {
        const response = await fetch(`http://localhost:3001/api/balance/${walletAddress}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        if (data && data.balance !== undefined) {
          setBalance(data.balance);
        } else {
          setError('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
        setError('Error fetching balance. Please try again.');
      }
    };

    fetchBalance();
  }, [walletAddress]);

  return (
    <div className="balance-container">
      <Typography.Title level={3} className="balance-title">Wallet Balance</Typography.Title>
      {error ? ( // Display error message if there's an error
        <Typography.Text type="danger">{error}</Typography.Text>
      ) : balance !== null ? (
        <Typography.Text className="balance-amount">{balance} SOL</Typography.Text>
      ) : (
        <Typography.Text>Loading balance...</Typography.Text>
      )}
    </div>
  );
};

export default BalanceDisplay;
