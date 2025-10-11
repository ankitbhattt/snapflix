import React, { useState, useCallback } from 'react';
import './App.css';
import Header from './components/Header';
import PostLoginHeader from './components/PostLoginHeader';
import HeroSection from './components/HeroSection';
import InteractiveCarousel from './components/InteractiveCarousel';
import VideoCategories from './components/GameCategories';
import ExploreSection from './components/ExploreSection';
import VideosSection from './components/VideosSection';
import LoginModal from './components/LoginModal';
import OTPModal from './components/OTPModal';
import RewardsPage from './components/RewardsPage';
import ProfilePage from './components/ProfilePage';
import SubscriptionPage from './components/SubscriptionPage';
import NewsPage from './components/NewsPage';
import Notification from './components/Notification';
import ThemeToggle from './components/ThemeToggle';
import ParticleBackground from './components/ParticleBackground';
import SimpleParticleBackground from './components/SimpleParticleBackground';
import FloatingActionButton from './components/FloatingActionButton';
import Footer from './components/Footer';

type Page = 'home' | 'rewards' | 'profile' | 'subscription' | 'news';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark');

  const handleVideoClick = useCallback(() => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    }
  }, [isLoggedIn]);

  const handleLoginSubmit = useCallback((phone: string) => {
    setPhoneNumber(phone);
    setShowLoginModal(false);
    setShowOTPModal(true);
  }, []);

  const handleOTPVerify = useCallback(() => {
    setShowOTPModal(false);
    setIsLoggedIn(true);
    setNotification({
      message: 'Login successful! Welcome to The Gameium!',
      type: 'success'
    });
  }, []);

  const handleCloseModals = useCallback(() => {
    setShowLoginModal(false);
    setShowOTPModal(false);
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setCurrentPage('home');
  }, []);

  const handleNavigate = useCallback((page: string) => {
    if (page === 'login') {
      setShowLoginModal(true);
    } else {
      setCurrentPage(page as Page);
    }
  }, []);

  const handleCloseNotification = useCallback(() => {
    setNotification(null);
  }, []);

  const handleThemeChange = useCallback((theme: 'light' | 'dark') => {
    setCurrentTheme(theme);
  }, []);

  const handleQuickAction = useCallback(() => {
    setNotification({
      message: 'Quick action activated! ⚡',
      type: 'info'
    });
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'rewards':
        return <RewardsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'subscription':
        return <SubscriptionPage />;
      case 'news':
        return <NewsPage />;
      default:
        return (
          <>
            <InteractiveCarousel onGameClick={handleVideoClick} />
            <VideoCategories onVideoClick={handleVideoClick} />
            <ExploreSection />
            <VideosSection />
          </>
        );
    }
  };

  return (
    <div className="App" data-theme={currentTheme}>
      <SimpleParticleBackground />
      
      {isLoggedIn ? (
        <PostLoginHeader 
          onLogout={handleLogout} 
          onNavigate={handleNavigate}
          currentPage={currentPage}
        />
      ) : (
        <Header 
          onNavigate={handleNavigate}
          currentPage={currentPage}
        />
      )}
      
      
      {renderPage()}
      
      <Footer />
      
      {showLoginModal && (
        <LoginModal 
          onSubmit={handleLoginSubmit}
          onClose={handleCloseModals}
        />
      )}
      
      {showOTPModal && (
        <OTPModal 
          phoneNumber={phoneNumber}
          onVerify={handleOTPVerify}
          onClose={handleCloseModals}
        />
      )}
      
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}
      
      <ThemeToggle onThemeChange={handleThemeChange} />
      <FloatingActionButton onQuickAction={handleQuickAction} />
    </div>
  );
}

export default App;