import React, { useState } from 'react';
import { Button, Input, message } from 'antd';
import { startRegistration } from '@simplewebauthn/browser'; // Import WebAuthn for Face ID

const CreateWallet = ({ setWallet, onSuccess }) => {
  const [walletName, setWalletName] = useState('');
  const [password, setPassword] = useState('');
  const [importedWalletData, setImportedWalletData] = useState(''); // For importing wallet

  const handleCreateWalletWithFaceID = async () => {
    if (!walletName) {
      message.error('Please enter a wallet name.');
      return;
    }

    try {
      // Request registration challenge from backend
      const response = await fetch('/api/generate-registration-challenge', {
        method: 'GET',
      });
      const registrationOptions = await response.json();

      // Perform Face ID registration using WebAuthn
      const attestationResponse = await startRegistration(registrationOptions);

      // Send the attestation response to backend for verification
      const verificationResponse = await fetch('/api/verify-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attestationResponse),
      });

      if (verificationResponse.ok) {
        message.success('Face ID registration successful!');

        // Logic to create a wallet
        const newWallet = {
          publicKey: "generatedPublicKey", // Replace with actual logic to generate wallet
          name: walletName,
          method: 'Face ID',
        };

        setWallet(newWallet);

        if (onSuccess) {
          onSuccess(); // Notify the parent component to change the state
        }
      } else {
        message.error('Face ID registration failed.');
      }
    } catch (error) {
      console.error('Error during Face ID registration:', error);
      message.error('Unable to register Face ID. Please try again.');
    }
  };

  const handleCreateWalletWithPassword = () => {
    if (!walletName) {
      message.error('Please enter a wallet name.');
      return;
    }

    if (!password) {
      message.error('Please enter a password.');
      return;
    }

    // Logic to create a wallet with password
    const newWallet = {
      publicKey: "generatedPublicKey", // Replace with actual logic to generate wallet
      name: walletName,
      password, // Store password in the wallet object if necessary
      method: 'Password',
    };

    setWallet(newWallet);

    if (onSuccess) {
      onSuccess(); // Notify the parent component to change the state
    }

    message.success('Wallet created successfully with a password!');
  };

  const handleImportWallet = () => {
    if (!importedWalletData) {
      message.error('Please enter the wallet data to import.');
      return;
    }

    // Logic to import wallet (you can add your specific implementation here)
    const importedWallet = {
      // Assuming wallet data has necessary details
      data: importedWalletData,
      method: 'Import',
    };

    setWallet(importedWallet);

    if (onSuccess) {
      onSuccess(); // Notify the parent component to change the state
    }

    message.success('Wallet imported successfully!');
  };

  return (
    <div>
      <h2>Create Wallet</h2>
      <Input
        placeholder="Wallet Name"
        value={walletName}
        onChange={(e) => setWalletName(e.target.value)}
        style={{ marginTop: 10, marginBottom: 10 }}
      />
      <Button type="primary" onClick={handleCreateWalletWithFaceID} style={{ marginBottom: 10 }}>
        Create Wallet with Face ID
      </Button>
      <Input.Password
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginTop: 10, marginBottom: 10 }}
      />
      <Button type="primary" onClick={handleCreateWalletWithPassword}>
        Create Wallet with Password
      </Button>

      {/* Section for Importing Wallet */}
      <h2 style={{ marginTop: 20 }}>Import Existing Wallet</h2>
      <Input
        placeholder="Wallet Data"
        value={importedWalletData}
        onChange={(e) => setImportedWalletData(e.target.value)}
        style={{ marginTop: 10, marginBottom: 10 }}
      />
      <Button type="primary" onClick={handleImportWallet}>
        Import Wallet
      </Button>
    </div>
  );
};

export default CreateWallet;
