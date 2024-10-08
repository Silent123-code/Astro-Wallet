import React, { useState } from 'react';
import { Button, message } from 'antd';
import { startAuthentication } from '@simplewebauthn/browser'; // Import WebAuthn for authentication

const UnlockWallet = ({ onSuccess }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleFaceIDAuthentication = async () => {
    try {
      // Request a challenge from the backend
      const response = await fetch('/api/generate-authentication-challenge', {
        method: 'GET',
      });
      const authenticationOptions = await response.json(); // Contains challenge and public key

      // Use WebAuthn to authenticate with Face ID
      const assertionResponse = await startAuthentication(authenticationOptions);

      // Send the assertion (authentication result) back to the server for verification
      const verificationResponse = await fetch('/api/verify-authentication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assertionResponse),
      });

      if (verificationResponse.ok) {
        message.success('Authentication successful');
        setIsAuthenticated(true);
        if (onSuccess) onSuccess(); // Call the success callback if provided
      } else {
        message.error('Authentication error');
      }
    } catch (error) {
      console.error('Error during Face ID authentication:', error);
      message.error('Authentication error, please try again.');
    }
  };

  return (
    <div>
      <h2>Unlock Wallet with Face ID</h2>
      {!isAuthenticated ? (
        <Button type="primary" onClick={handleFaceIDAuthentication}>
          Authenticate with Face ID
        </Button>
      ) : (
        <p>Wallet unlocked!</p>
      )}
    </div>
  );
};

export default UnlockWallet;
