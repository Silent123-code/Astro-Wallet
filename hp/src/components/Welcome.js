import React, { useEffect } from 'react';
import { Typography, Button } from 'antd';
import { WalletOutlined } from '@ant-design/icons';
import earthImage from '../assets/earth-image.png'; // Ensure this path is correct
import './Welcome.css'; // You can create this file for additional styles

const Welcome = ({ onCreateAccount }) => {

  // Adding a zoom effect to the title on load
  useEffect(() => {
    const title = document.querySelector('.welcome-title');
    title.classList.add('zoom-in');
  }, []);

  return (
    <div className="welcome-container" style={{
      background: 'linear-gradient(to bottom, #000033, #000066)',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      textAlign: 'center',
      padding: '20px',
      overflow: 'hidden',  // Prevents scroll overflow due to animations
    }}>
      
      {/* Animated Earth Image */}
      <div className="earth-image" style={{
        width: '200px',  // Keeping original dimensions
        height: '200px', // Keeping original dimensions
        borderRadius: '50%',
        background: `url(${earthImage}) center/cover no-repeat`,
        marginBottom: '20px',
        boxShadow: '0 0 30px rgba(0, 0, 255, 0.5)',  // Glowing effect
        animation: 'rotateEarth 10s infinite linear'   // Rotate animation
      }} />
      
      {/* Title with zoom-in effect */}
      <Typography.Title className="welcome-title" level={1} style={{
        color: 'white',
        marginBottom: '10px',
        fontSize: '2.5rem',
        transition: 'transform 0.6s',
      }}>
       
      </Typography.Title>
      
      {/* Subtitle */}
      <Typography.Text style={{ fontSize: '18px', marginBottom: '30px', color: '#b0c4de' }}>
        Future of Web3 Wallet
      </Typography.Text>
      
      {/* Create Account Button with Hover Effect */}
      <Button 
        type="primary" 
        size="large"
        icon={<WalletOutlined />}
        onClick={onCreateAccount}
        style={{
          background: 'linear-gradient(45deg, #007bff, #00c3ff)',
          borderColor: 'transparent',
          borderRadius: '25px',
          padding: '0 40px',
          fontWeight: 'bold',
          boxShadow: '0 4px 10px rgba(0, 123, 255, 0.6)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          margin: 0 // Ensuring no margin is applied
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = '0 6px 12px rgba(0, 123, 255, 0.9)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 4px 10px rgba(0, 123, 255, 0.6)';
        }}
      >
      Launch into ASTRO Wallet
      </Button>

    </div>
  );
};

export default Welcome;
