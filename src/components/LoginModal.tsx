import React, { useState } from 'react';
import './LoginModal.css';
import { useTranslation } from '../contexts/TranslationContext';

interface LoginModalProps {
  onSubmit: (phone: string) => void;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onSubmit, onClose }) => {
  const { t } = useTranslation();
  const [phone, setPhone] = useState('+27');
  const [phoneError, setPhoneError] = useState('');


  // Mobile number validation function for South Africa
  const validateMobileNumber = (phoneNumber: string): boolean => {
    // Remove all non-digit characters except +
    const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
    
    // Check if it starts with +27
    if (!cleanNumber.startsWith('+27')) {
      return false;
    }
    
    // Check if it has exactly 9 digits after +27 (South African mobile numbers)
    const digits = cleanNumber.substring(3);
    return digits.length === 9 && /^\d{9}$/.test(digits);
  };

  // Format phone number as user types
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Remove all non-digit characters except +
    value = value.replace(/[^\d+]/g, '');
    
    // Ensure it starts with +27
    if (!value.startsWith('+27')) {
      value = '+27';
    }
    
    // Limit to +27 followed by max 9 digits
    if (value.length > 12) {
      value = value.substring(0, 12);
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
      setPhoneError('Please enter a valid 9-digit South African mobile number');
      return;
    }
    
    onSubmit(phone);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="modal-header">
          <div className="modal-logo-custom">
            <div className="modal-play-icon">
              <svg viewBox="0 0 100 100" className="modal-play-svg">
                <defs>
                  <linearGradient id="modalSnapflixGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#dc2626" />
                    <stop offset="50%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#fbbf24" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="url(#modalSnapflixGradient)" className="modal-play-circle" />
                <path d="M 40 30 L 40 70 L 65 50 Z" fill="white" className="modal-play-triangle" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" className="modal-play-ring" />
              </svg>
            </div>
            <div className="modal-logo-text">
              <span className="modal-text-snap" style={{ color: '#f97316', backgroundColor: 'transparent' }}>SNAP</span>
              <span className="modal-text-flix" style={{ color: '#fbbf24', backgroundColor: 'transparent' }}>FLIX</span>
            </div>
          </div>
          <h1 className="modal-title">{t('login.welcome')}</h1>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="input-group">
            <label className="input-label">{t('login.phone.label')}</label>
            <div className="phone-input-wrapper">
              <span className="phone-prefix">+27</span>
              <input
                type="tel"
                value={phone.replace('+27', '')}
                onChange={(e) => {
                  let value = e.target.value.replace(/[^\d]/g, '');
                  if (value.length > 9) {
                    value = value.substring(0, 9);
                  }
                  setPhone('+27' + value);
                }}
                className={`phone-input ${phoneError ? 'error' : ''}`}
                placeholder="012345678"
                required
              />
            </div>
            {phoneError && (
              <div className="error-message">{phoneError}</div>
            )}
          </div>

          <button 
            type="submit" 
            className="send-otp-button"
            disabled={!validateMobileNumber(phone)}
            style={{
              background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              opacity: !validateMobileNumber(phone) ? 0.6 : 1
            }}
          >
            <span>{t('login.send.otp')}</span>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M4 10L16 10M10 4L16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>

        <div className="security-notice">
          <div className="security-icon">🔒</div>
          <span>{t('login.security')}</span>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
