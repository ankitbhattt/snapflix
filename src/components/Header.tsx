import React, { useState, useRef, useEffect } from 'react';
import './Header.css';
import SnapflixLogo from './SnapflixLogo';
import MoreDropdown from './MoreDropdown';

interface HeaderProps {
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileAction = (action: string) => {
    setShowProfileDropdown(false);
    if (action === 'login' && onNavigate) {
      onNavigate('login');
    } else if (action === 'signup' && onNavigate) {
      onNavigate('signup');
    } else if (action === 'help' && onNavigate) {
      onNavigate('help');
    } else if (action === 'about' && onNavigate) {
      onNavigate('about');
    }
    console.log('Profile action:', action);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => onNavigate && onNavigate('home')}>
          <SnapflixLogo size="large" animated={true} />
        </div>
        
        <nav className="navigation">
          <button 
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate && onNavigate('home')}
          >
            HOME
          </button>
          <button className="nav-link">VIDEOS</button>
          <button 
            className={`nav-link ${currentPage === 'news' ? 'active' : ''}`}
            onClick={() => onNavigate && onNavigate('news')}
          >
            NEWS
          </button>
          <button className="nav-link">LIVE</button>
          <button 
            className={`nav-link ${currentPage === 'rewards' ? 'active' : ''}`}
            onClick={() => onNavigate && onNavigate('rewards')}
          >
            REWARDS
          </button>
          <MoreDropdown />
        </nav>
        
        <div className="header-actions">
          <button className="action-btn search-btn">🔍</button>
          <button className="action-btn language-btn">A文</button>
          <button 
            className="subscribe-btn"
            onClick={() => onNavigate && onNavigate('subscription')}
          >
            Subscribe
          </button>
          
          <div className="profile-dropdown" ref={profileRef}>
            <button 
              className={`action-btn profile-btn ${showProfileDropdown ? 'active' : ''}`}
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <span className="profile-icon">👤</span>
              <span className="dropdown-arrow">▼</span>
            </button>
            {showProfileDropdown && (
              <div className="profile-menu">
                <div className="profile-menu-item" onClick={() => handleProfileAction('login')}>
                  <span className="menu-icon">🔑</span>
                  LOGIN
                </div>
                <div className="profile-menu-item" onClick={() => handleProfileAction('signup')}>
                  <span className="menu-icon">📝</span>
                  SIGN UP
                </div>
                <div className="profile-menu-item" onClick={() => handleProfileAction('help')}>
                  <span className="menu-icon">ℹ️</span>
                  HELP
                </div>
                <div className="profile-menu-item" onClick={() => handleProfileAction('about')}>
                  <span className="menu-icon">⚙️</span>
                  ABOUT US
                </div>
                <div className="profile-menu-item" onClick={() => handleProfileAction('faq')}>
                  <span className="menu-icon">❓</span>
                  FAQ
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
