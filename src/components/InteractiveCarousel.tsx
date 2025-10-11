import React, { useState, useEffect, useCallback } from 'react';
import './InteractiveCarousel.css';
import { useTranslation } from '../contexts/TranslationContext';

interface CarouselItem {
  id: number;
  title: string;
  video: string;
  description: string;
  image: string;
}

interface InteractiveCarouselProps {
  onGameClick: () => void;
}

const InteractiveCarousel: React.FC<InteractiveCarouselProps> = ({ onGameClick }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
  const [videoTimer, setVideoTimer] = useState<NodeJS.Timeout | null>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const moreInfoRef = React.useRef<HTMLDivElement>(null);

  const carouselItems: CarouselItem[] = [
    {
      id: 1,
      title: "FPS",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      description: "Experience intense first-person action",
      image: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Racing",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      description: "High-speed racing adventures",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Adventure",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      description: "Epic quests and exploration",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop"
    }
  ];


  const nextSlide = useCallback(() => {
    setShowVideo(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  }, [carouselItems.length]);

  const prevSlide = useCallback(() => {
    setShowVideo(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  }, [carouselItems.length]);

  const goToSlide = useCallback((index: number) => {
    setShowVideo(false);
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isAutoPlaying]);

  // Reset video state when slide changes
  useEffect(() => {
    setShowVideo(false);
  }, [currentIndex]);

  // Handle click outside More Info
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreInfoRef.current && !moreInfoRef.current.contains(event.target as Node)) {
        setShowMoreInfo(false);
      }
    };

    if (showMoreInfo) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMoreInfo]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hoverTimer) clearTimeout(hoverTimer);
      if (videoTimer) clearTimeout(videoTimer);
    };
  }, [hoverTimer, videoTimer]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsAutoPlaying(false);
    
    // Start video after 0.5 seconds of hover (exactly like game cards)
    setHoverTimer(setTimeout(() => {
      setShowVideo(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
        
        // Stop video after 5 seconds
        setVideoTimer(setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.pause();
            setShowVideo(false);
          }
        }, 5000));
      }
    }, 500));
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsAutoPlaying(true);
    setShowVideo(false);
    
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
    if (videoTimer) {
      clearTimeout(videoTimer);
      setVideoTimer(null);
    }
    
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handlePlayClick = () => {
    onGameClick();
  };

  const handleMoreInfoClick = () => {
    setShowMoreInfo(!showMoreInfo);
  };

  const currentItem = carouselItems[currentIndex];

  return (
    <div 
      className="interactive-carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="carousel-container">
        <div className="slide-content">
          <div className="slide-text-overlay">
            <div className="slide-info">
              <h1 className="slide-title">{currentItem.title}</h1>
              <p className="slide-description">{currentItem.description}</p>
              <div className="slide-actions">
                <button 
                  className="slide-button primary"
                  onClick={handlePlayClick}
                >
                  <span className="btn-icon">▶</span>
                  {t('homepage.action.play')}
                </button>
                <button 
                  className="slide-button secondary hide-on-mobile"
                  onClick={handleMoreInfoClick}
                >
                  <span className="btn-icon">ℹ</span>
                  {t('homepage.action.moreInfo')}
                </button>
              </div>
            </div>
            
            {showMoreInfo && (
              <div className="more-info-content" ref={moreInfoRef}>
                <div className="info-section">
                  <h3>Game Details</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">Genre:</span>
                      <span className="info-value">{currentItem.title}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Rating:</span>
                      <span className="info-value">★★★★★ (4.8/5)</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Players:</span>
                      <span className="info-value">1-4 Players</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Platform:</span>
                      <span className="info-value">PC, Mobile, Console</span>
                    </div>
                  </div>
                  <div className="info-description">
                    <p>Immerse yourself in the ultimate gaming experience with stunning graphics, 
                    smooth gameplay, and endless entertainment. Perfect for both casual and hardcore gamers.</p>
                  </div>
                  <div className="info-features">
                    <h4>Key Features:</h4>
                    <ul>
                      <li>🎮 Intuitive controls and smooth gameplay</li>
                      <li>🎨 Stunning visual effects and graphics</li>
                      <li>🏆 Multiple difficulty levels and achievements</li>
                      <li>🌐 Online multiplayer support</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="slide-media">
            <img 
              src={currentItem.image}
              alt={currentItem.title}
              className={`slide-image-element ${showVideo ? 'hidden' : ''}`}
            />
            <video
              key={`video-${currentIndex}`}
              ref={videoRef}
              src={currentItem.video}
              className={`slide-video-element ${showVideo ? 'visible' : ''}`}
              muted
              playsInline
              loop={false}
              preload="auto"
            />
            <div className={`media-overlay ${showVideo ? 'video-active' : ''}`}>
              {!showVideo && <div className="play-icon">▶</div>}
              {showVideo && (
                <div className="video-preview-badge">
                  <span className="preview-dot"></span>
                  <span>PREVIEW</span>
                </div>
              )}
            </div>
            
            
            
            {/* Progress indicator for current slide */}
            <div className="slide-progress">
              <div className="progress-dots">
                {carouselItems.map((_, index) => (
                  <div 
                    key={index}
                    className={`progress-dot ${index === currentIndex ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button className="carousel-arrow left" onClick={prevSlide}>
        ‹
      </button>
      <button className="carousel-arrow right" onClick={nextSlide}>
        ›
      </button>

      {/* Dots Indicator */}
      <div className="carousel-dots">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default InteractiveCarousel;
