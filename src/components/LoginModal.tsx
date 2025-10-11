import React, { useState } from 'react';
import './LoginModal.css';
import SnapflixLogo from './SnapflixLogo';
import { useTranslation } from '../contexts/TranslationContext';

interface LoginModalProps {
  onSubmit: (phone: string) => void;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onSubmit, onClose }) => {
  const { t } = useTranslation();
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
        <button className="close-button" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="modal-header">
          <div className="modal-logo">
            <SnapflixLogo size="medium" animated={true} />
          </div>
          <h1 className="modal-title">{t('login.welcome')}</h1>
          <p className="modal-subtitle">{t('login.subtitle')}</p>
          
          <div className="features-preview">
            <div className="feature-item">
              <span className="feature-icon">🎮</span>
              <span>{t('login.features.gaming')}</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📱</span>
              <span>{t('login.features.mobile')}</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span>{t('login.features.streaming')}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="input-group">
            <label className="input-label">{t('login.phone.label')}</label>
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              className={`phone-input ${phoneError ? 'error' : ''}`}
              placeholder={t('login.phone.placeholder')}
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
              <span className="custom-checkbox"></span>
              <span className="terms-text">
                {t('login.terms')}{' '}
                <a href="#" className="terms-link">{t('login.terms.link')}</a>
                {' '}{t('login.and')}{' '}
                <a href="#" className="terms-link">{t('login.privacy.link')}</a>
              </span>
            </label>
          </div>

          <button 
            type="submit" 
            className="send-otp-button"
            disabled={!agreeToTerms || !validateMobileNumber(phone)}
            style={{
              background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              opacity: (!agreeToTerms || !validateMobileNumber(phone)) ? 0.6 : 1
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

        <div className="social-login">
          <div className="divider">
            <span>{t('login.continue.with')}</span>
          </div>
          
          <div className="social-buttons">
            <button className="social-btn google-btn" title="Continue with Google">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>{t('login.google')}</span>
            </button>
            <button className="social-btn apple-btn" title="Continue with Apple">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span>{t('login.apple')}</span>
            </button>
            <button className="social-btn email-btn" title="Continue with Email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span>{t('login.email')}</span>
            </button>
          </div>
        </div>

        <div className="modal-footer">
          <p className="footer-text">
            {t('login.footer.text')} <span className="highlight">{t('login.footer.highlight')}</span>
          </p>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-number">10M+</span>
              <span className="stat-label">{t('login.stats.users')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">{t('login.stats.uptime')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
