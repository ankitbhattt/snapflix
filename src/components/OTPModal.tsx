import React, { useState, useEffect } from 'react';
import './OTPModal.css';

interface OTPModalProps {
  phoneNumber: string;
  onVerify: () => void;
  onClose: () => void;
}

const OTPModal: React.FC<OTPModalProps> = ({ phoneNumber, onVerify, onClose }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [timeLeft]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.every(digit => digit !== '')) {
      onVerify();
    }
  };

  const handleResend = () => {
    setTimeLeft(120);
    setIsResendDisabled(true);
    setOtp(['', '', '', '']);
    // In a real app, you would resend the OTP here
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="otp-header">
          <div className="gamepad-character">
            <div className="gamepad-icon">🎮</div>
            <div className="speech-bubble">Hi!</div>
          </div>
          <h2 className="otp-title">Enter Your OTP</h2>
          <p className="otp-description">
            A text message was sent to {phoneNumber}
          </p>
        </div>

        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`otp-input ${digit ? 'filled' : ''}`}
              maxLength={1}
              autoComplete="off"
            />
          ))}
        </div>

        <div className="resend-section">
          {isResendDisabled ? (
            <p className="resend-timer">
              Resend Available in {formatTime(timeLeft)}
            </p>
          ) : (
            <button className="resend-button" onClick={handleResend}>
              Resend OTP
            </button>
          )}
        </div>

        <button 
          className="verify-button"
          onClick={handleVerify}
          disabled={!otp.every(digit => digit !== '')}
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default OTPModal;
