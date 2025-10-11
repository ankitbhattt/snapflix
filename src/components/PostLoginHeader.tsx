import React, { useState, useEffect, useRef } from 'react';
import './PostLoginHeader.css';
import SnapflixLogo from './SnapflixLogo';
import MoreDropdown from './MoreDropdown';

interface PostLoginHeaderProps {
  onLogout: () => void;
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

const PostLoginHeader: React.FC<PostLoginHeaderProps> = ({ onLogout, onNavigate, currentPage }) => {
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const languageRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी (Hindi)' },
    { code: 'bn', name: 'বাঙালি (Bengali)' },
    { code: 'ar', name: 'عربی (Arabic)' },
    { code: 'fr', name: 'Français (French)' },
    { code: 'pl', name: 'Polski (Polish)' }
  ];

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setShowLanguageDropdown(false);
    // You can add language change logic here
    console.log('Language changed to:', language);
  };

  const handleProfileAction = (action: string) => {
    setShowProfileDropdown(false);
    if (action === 'profile' && onNavigate) {
      onNavigate('profile');
    } else if (action === 'logout') {
      onLogout();
    } else if (action === 'rewards' && onNavigate) {
      onNavigate('rewards');
    } else if (action === 'home' && onNavigate) {
      onNavigate('home');
    }
    // Handle other actions as needed
    console.log('Profile action:', action);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log('Click outside detected');
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        console.log('Closing language dropdown');
        setShowLanguageDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        console.log('Closing profile dropdown');
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="post-login-header">
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
          
          <div className="language-selector" ref={languageRef}>
            <button 
              className="action-btn language-btn"
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            >
              <span className="language-icon">A文</span>
            </button>
            {showLanguageDropdown && (
              <div className="language-dropdown">
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    className={`language-option ${selectedLanguage === lang.name ? 'selected' : ''}`}
                    onClick={() => handleLanguageSelect(lang.name)}
                  >
                    <span className="radio-indicator">
                      {selectedLanguage === lang.name && <div className="radio-dot"></div>}
                    </span>
                    {lang.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <button 
            className="subscribe-btn"
            onClick={() => onNavigate && onNavigate('subscription')}
          >
            Subscribe
          </button>
          
              <div className="profile-dropdown" ref={profileRef}>
                <button 
                  className={`action-btn profile-btn ${showProfileDropdown ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Profile button clicked, current state:', showProfileDropdown);
                    setShowProfileDropdown(!showProfileDropdown);
                    console.log('Profile button clicked, new state:', !showProfileDropdown);
                  }}
                >
                  <span className="profile-icon">👤</span>
                  <span className="dropdown-arrow">▼</span>
                </button>
            {showProfileDropdown && (
              <div className="profile-menu" style={{ display: 'block' }}>
                <div className="profile-menu-item" onClick={() => handleProfileAction('profile')}>
                  <span className="menu-icon">👤</span>
                  PROFILE
                </div>
                <div className="profile-menu-item" onClick={() => handleProfileAction('subscriptions')}>
                  <span className="menu-icon">💳</span>
                  SUBSCRIPTIONS
                </div>
                <div className="profile-menu-item" onClick={() => handleProfileAction('blogs')}>
                  <span className="menu-icon">✏️</span>
                  BLOGS
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
                <div className="profile-menu-item logout" onClick={() => handleProfileAction('logout')}>
                  <span className="menu-icon">↪️</span>
                  LOGOUT
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default PostLoginHeader;
