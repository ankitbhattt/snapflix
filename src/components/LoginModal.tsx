import React, { useState } from 'react';
import './LoginModal.css';

interface LoginModalProps {
  onSubmit: (phone: string) => void;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onSubmit, onClose }) => {
  const [phone, setPhone] = useState('+91');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  // Mobile number validation function
  const validateMobileNumber = (phoneNumber: string): boolean => {
    // Remove all non-digit characters except +
    const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
    
    // Check if it starts with +91
    if (!cleanNumber.startsWith('+91')) {
      return false;
    }
    
    // Check if it has exactly 10 digits after +91
    const digits = cleanNumber.substring(3);
    return digits.length === 10 && /^\d{10}$/.test(digits);
  };

  // Format phone number as user types
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Remove all non-digit characters except +
    value = value.replace(/[^\d+]/g, '');
    
    // Ensure it starts with +91
    if (!value.startsWith('+91')) {
      value = '+91';
    }
    
    // Limit to +91 followed by max 10 digits
    if (value.length > 13) {
      value = value.substring(0, 13);
    }
    
    setPhone(value);
    
    // Clear error when user starts typing
    if (phoneError) {
      setPhoneError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate mobile number
    if (!validateMobileNumber(phone)) {
      setPhoneError('Please enter a valid 10-digit mobile number');
      return;
    }
    
    if (agreeToTerms) {
      onSubmit(phone);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <div className="modal-logo">GZ</div>
          <h2 className="modal-title">Welcome to The Gameium</h2>
          <p className="modal-description">
            Join the adventure with The Gameium. So log in, gear up, and let's play!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="phone-input-container">
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              className={`phone-input ${phoneError ? 'error' : ''}`}
              placeholder="+91 9876543210"
              required
            />
            {phoneError && (
              <div className="error-message">{phoneError}</div>
            )}
          </div>

          <div className="terms-container">
            <label className="terms-checkbox">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                required
              />
              <span className="checkmark"></span>
              By proceeding you agree to our{' '}
              <a href="#" className="terms-link">Terms of Services</a>
              {' '}&{' '}
              <a href="#" className="terms-link">Privacy Policy</a>
            </label>
          </div>

          <button 
            type="submit" 
            className="send-otp-button"
            disabled={!agreeToTerms || !validateMobileNumber(phone)}
          >
            Send OTP
          </button>
        </form>

        <div className="social-login">
          <div className="divider">
            <span>or</span>
          </div>
          
          <div className="social-buttons">
            <button className="social-btn email-btn">✉</button>
            <button className="social-btn google-btn">G</button>
            <button className="social-btn discord-btn">D</button>
            <button className="social-btn apple-btn">🍎</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
