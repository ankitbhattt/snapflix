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
  const [showVideo, setShowVideo] = useState(true);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
  const [videoTimer, setVideoTimer] = useState<NodeJS.Timeout | null>(null);
  const [touchTimer, setTouchTimer] = useState<NodeJS.Timeout | null>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const moreInfoRef = React.useRef<HTMLDivElement>(null);

  const carouselItems: CarouselItem[] = [
    {
      id: 1,
      title: "GTA 6 Trailer",
      video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/157_-_GTA_6_Trailer_sdhb8f.mp4",
      description: "The most anticipated game trailer",
      image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566577/samples/landscapes/girl-urban-view.jpg"
    },
    {
      id: 2,
      title: "OnePiece Edit",
      video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/127_-_Onepiece_edit_ifvaba.mp4",
      description: "Epic OnePiece moments compilation",
      image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566597/cld-sample-4.jpg"
    },
    {
      id: 3,
      title: "Cyberpunk Edit",
      video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/134_-_Cyberpunk_Edit_kwejen.mp4",
      description: "Futuristic cyberpunk action",
      image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566575/samples/people/kitchen-bar.jpg"
    },
    {
      id: 4,
      title: "OnePiece Quotes",
      video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/153_-_The_quotes_from_onepiece_aqq6qj.mp4",
      description: "Inspirational quotes from OnePiece",
      image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566574/samples/ecommerce/analog-classic.jpg"
    },
    {
      id: 5,
      title: "Death Note Edit",
      video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/148_-_Death_note_edit_rf3xpx.mp4",
      description: "Mind games and psychological thriller",
      image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566588/samples/balloons.jpg"
    }
  ];


  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  }, [carouselItems.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  }, [carouselItems.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide, isAutoPlaying]);

  // Start video when slide changes (only on hover)
  useEffect(() => {
    if (videoRef.current && isHovered) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((err) => {
        console.log('Video play failed:', err);
      });
    }
  }, [currentIndex, isHovered]);

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
      if (touchTimer) clearTimeout(touchTimer);
    };
  }, [hoverTimer, videoTimer, touchTimer]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsAutoPlaying(false);
    
    // Start video immediately on hover
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((err) => {
        console.log('Video play failed:', err);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsAutoPlaying(true);
    
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

  const handleTouchStart = () => {
    setIsHovered(true);
    setIsAutoPlaying(false);
    
    // Start video immediately on touch
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log('Video play failed:', err);
        });
      }
    }
    
    // Auto-pause after 5 seconds on touch devices
    if (touchTimer) {
      clearTimeout(touchTimer);
    }
    const timer = setTimeout(() => {
      setIsHovered(false);
      setIsAutoPlaying(true);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }, 5000);
    setTouchTimer(timer);
  };

  const handleTouchEnd = () => {
    // Ensure video plays on touch end if it didn't on touch start
    const video = videoRef.current;
    if (video && video.paused && isHovered) {
      video.play().catch(() => {});
    }
  };

  const handleCarouselClick = () => {
    // Call onGameClick to open login modal or navigate
    onGameClick();
    
    // On mobile, ensure video plays on click as well
    if (!isHovered) {
      setIsHovered(true);
      setIsAutoPlaying(false);
      
      const video = videoRef.current;
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
      
      // Auto-pause after 5 seconds on mobile
      if (touchTimer) {
        clearTimeout(touchTimer);
      }
      const timer = setTimeout(() => {
        setIsHovered(false);
        setIsAutoPlaying(true);
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }, 5000);
      setTouchTimer(timer);
    }
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering carousel click
    onGameClick();
  };

  const handleMoreInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering carousel click
    setShowMoreInfo(!showMoreInfo);
  };

  const currentItem = carouselItems[currentIndex];

  return (
    <div 
      className="interactive-carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleCarouselClick}
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
                  onClick={(e) => handlePlayClick(e)}
                >
                  <span className="btn-icon">▶</span>
                  {t('homepage.action.play')}
                </button>
                <button 
                  className="slide-button secondary hide-on-mobile"
                  onClick={(e) => handleMoreInfoClick(e)}
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
            <video
              key={`video-${currentIndex}`}
              ref={videoRef}
              src={currentItem.video}
              className="slide-video-element visible"
              muted
              playsInline
              loop={false}
              preload="metadata"
              onError={(e) => console.log('Video error:', e)}
              onLoadStart={() => console.log('Video loading started')}
              onCanPlay={() => console.log('Video can play')}
            />
            <div className="media-overlay video-active">
              <div className="video-preview-badge">
                <span className="preview-dot"></span>
                <span>PREVIEW</span>
              </div>
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
