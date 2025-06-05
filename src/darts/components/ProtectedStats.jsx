import React, { useState, useEffect } from 'react';
import DartsStats from './DartsStats';
import './ProtectedStats.css';

const ProtectedStats = () => {
  const [password, setPassword] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [isDirectAccess, setIsDirectAccess] = useState(false);

  // Check if user accessed via URL
  useEffect(() => {
    // If URL contains '/stats', it's direct access
    if (window.location.pathname.includes('/stats')) {
      setIsDirectAccess(true);
    }
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Replace this with your actual password
    const correctPassword = 'darts123';
    if (password === correctPassword) {
      setIsDirectAccess(false);
      setShowPasswordForm(false);
    } else {
      alert('Incorrect password!');
      setPassword('');
    }
  };

  if (isDirectAccess && !showPasswordForm) {
    setShowPasswordForm(true);
    return null; // Don't render anything while waiting for password
  }

  if (showPasswordForm) {
    return (
      <div className="password-modal">
        <div className="password-form">
          <h2>Enter Password</h2>
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoFocus
            />
            <button type="submit">Submit</button>
          </form>
          <button 
            className="cancel-button"
            onClick={() => {
              setShowPasswordForm(false);
              window.history.back(); // Go back when canceling
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return <DartsStats />;
};

export default ProtectedStats;
