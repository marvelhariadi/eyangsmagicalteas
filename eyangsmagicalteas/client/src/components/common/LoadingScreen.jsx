import React from 'react';

const LoadingScreen = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#fff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      <div style={{
        textAlign: 'center'
      }}>
        <h2>Loading Eyang's Magical Teas...</h2>
        <div className="loading-spinner" style={{
          width: '50px',
          height: '50px',
          border: '5px solid rgba(0, 0, 0, 0.1)',
          borderRadius: '50%',
          borderTop: '5px solid #F88B7E',
          margin: '20px auto',
          animation: 'spin 1s linear infinite'
        }}></div>
      </div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
