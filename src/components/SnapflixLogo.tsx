import React from 'react';
import './SnapflixLogo.css';

interface SnapflixLogoProps {
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
  className?: string;
}

const SnapflixLogo: React.FC<SnapflixLogoProps> = ({ 
  size = 'medium', 
  animated = true, 
  className = '' 
}) => {
  return (
    <div className={`snapflix-logo ${size} ${animated ? 'animated' : ''} ${className}`}>
      <div className="logo-container">
        {/* 3D Play Button Icon */}
        <div className="play-button-icon">
          <div className="play-triangle">
            <div className="triangle-left">
              <div className="gradient-blue"></div>
            </div>
            <div className="triangle-right">
              <div className="gradient-red-orange"></div>
            </div>
            <div className="s-curve"></div>
          </div>
          <div className="play-button-shadow"></div>
        </div>
        
        {/* Text */}
        <div className="logo-text">
          <span className="text-snap">SNAP</span>
          <span className="text-flix">FLIX</span>
        </div>
      </div>
    </div>
  );
};

export default SnapflixLogo;
