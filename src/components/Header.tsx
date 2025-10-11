import React, { useState, useRef, useEffect } from 'react';
import './Header.css';
import SnapflixLogo from './SnapflixLogo';
import MoreDropdown from './MoreDropdown';
import { useTranslation } from '../contexts/TranslationContext';

interface HeaderProps {
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const { language, setLanguage, t } = useTranslation();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setShowLanguageDropdown(false);
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
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <span className="profile-icon">👤</span>
              <span className="dropdown-arrow">▼</span>
            </button>
            {showProfileDropdown && (
              <div className="profile-menu">
                <div className="profile-menu-item" onClick={() => handleProfileAction('login')}>
                  <span className="menu-icon">🔑</span>
                  {t('login.title')}
                </div>
                <div className="profile-menu-item" onClick={() => handleProfileAction('signup')}>
                  <span className="menu-icon">📝</span>
                  {t('login.signup')}
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
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
