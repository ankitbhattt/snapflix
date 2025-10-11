import React, { useState, useEffect, useRef } from 'react';
import './PostLoginHeader.css';
import SnapflixLogo from './SnapflixLogo';
import MoreDropdown from './MoreDropdown';
import { useTranslation } from '../contexts/TranslationContext';

interface PostLoginHeaderProps {
  onLogout: () => void;
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

const PostLoginHeader: React.FC<PostLoginHeaderProps> = ({ onLogout, onNavigate, currentPage }) => {
  const { language, setLanguage, t } = useTranslation();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: '中文 (Chinese)', flag: '🇨🇳' },
    { code: 'fr', name: 'Français (French)', flag: '🇫🇷' }
  ];

  const handleLanguageSelect = (languageCode: string) => {
    setLanguage(languageCode as 'en' | 'zh' | 'fr');
    setShowLanguageDropdown(false);
    console.log('Language changed to:', languageCode);
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
    } else if (action === 'help' && onNavigate) {
      onNavigate('unsubscribe');
    } else if (action === 'subscriptions' && onNavigate) {
      onNavigate('subscription-management');
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
          <SnapflixLogo size="medium" animated={true} />
        </div>
        
            <nav className="navigation">
              <button 
                className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => onNavigate && onNavigate('home')}
              >
                {t('header.home')}
              </button>
              <button className="nav-link">VIDEOS</button>
              <button 
                className={`nav-link ${currentPage === 'rewards' ? 'active' : ''}`}
                onClick={() => onNavigate && onNavigate('rewards')}
              >
                {t('header.rewards')}
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
              <span className="language-icon">
                {languages.find(lang => lang.code === language)?.flag || '🌐'}
              </span>
            </button>
            {showLanguageDropdown && (
              <div className="language-dropdown">
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    className={`language-option ${language === lang.code ? 'selected' : ''}`}
                    onClick={() => handleLanguageSelect(lang.code)}
                  >
                    <span className="radio-indicator">
                      {language === lang.code && <div className="radio-dot"></div>}
                    </span>
                    <span className="language-flag">{lang.flag}</span>
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
            {t('header.subscribe')}
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
                  {t('profile.menu.profile')}
                </div>
                <div className="profile-menu-item" onClick={() => handleProfileAction('subscriptions')}>
                  <span className="menu-icon">💳</span>
                  {t('profile.menu.subscriptions')}
                </div>
                <div className="profile-menu-item" onClick={() => handleProfileAction('help')}>
                  <span className="menu-icon">ℹ️</span>
                  {t('profile.menu.help')}
                </div>
                <div className="profile-menu-item" onClick={() => handleProfileAction('about')}>
                  <span className="menu-icon">⚙️</span>
                  {t('profile.menu.about')}
                </div>
                <div className="profile-menu-item" onClick={() => handleProfileAction('faq')}>
                  <span className="menu-icon">❓</span>
                  {t('profile.menu.faq')}
                </div>
                <div className="profile-menu-item logout" onClick={() => handleProfileAction('logout')}>
                  <span className="menu-icon">↪️</span>
                  {t('profile.menu.logout')}
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
