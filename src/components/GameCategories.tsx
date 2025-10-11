import React, { useCallback, useState, useRef, useEffect } from 'react';
import './GameCategories.css';
import { useTranslation } from '../contexts/TranslationContext';

interface VideoItem {
  name: string;
  video: string;
  image: string;
}

interface VideoCategoriesProps {
  onVideoClick: () => void;
}

interface VideoCardProps {
  video: VideoItem;
  onVideoClick: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onVideoClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const videoTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      if (videoTimerRef.current) clearTimeout(videoTimerRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    
    // Start video after 0.5 seconds of hover
    hoverTimerRef.current = setTimeout(() => {
      setShowVideo(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
        
        // Stop video after 5 seconds
        videoTimerRef.current = setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.pause();
            setShowVideo(false);
          }
        }, 5000);
      }
    }, 500);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowVideo(false);
    
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    if (videoTimerRef.current) {
      clearTimeout(videoTimerRef.current);
      videoTimerRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className={`video-card ${isHovered ? 'hovered' : ''}`}
      onClick={onVideoClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="video-image-container">
        <img 
          src={video.image}
          alt={video.name}
          className={`video-image ${showVideo ? 'hidden' : ''}`}
        />
        <video
          ref={videoRef}
          src={video.video}
          className={`video-element ${showVideo ? 'visible' : ''}`}
          muted
          playsInline
          loop={false}
        />
        <div className={`video-overlay ${showVideo ? 'video-active' : ''}`}>
          {!showVideo && <div className="play-icon">▶</div>}
          {showVideo && (
            <div className="video-preview-badge">
              <span className="preview-dot"></span>
              <span>PREVIEW</span>
            </div>
          )}
        </div>
      </div>
      <h3 className="video-title">{video.name}</h3>
    </div>
  );
};

const VideoCategories: React.FC<VideoCategoriesProps> = ({ onVideoClick }) => {
  const { t } = useTranslation();
  const categories = [
    {
      title: "TOP TRENDING VIDEOS",
      games: [
        { name: "Cube Ninja", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", image: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=300&h=200&fit=crop" },
        { name: "Traffic Racer", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop" },
        { name: "Watercraft Rush", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop" },
        { name: "WWII Air Battle", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=200&fit=crop" }
      ]
    },
    {
      title: "ADVENTURE",
      games: [
        { name: "Bandit Hunter", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop" },
        { name: "Ninja Action", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop" },
        { name: "Piggybank Adventure", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop" },
        { name: "Cube Ninja", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", image: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=300&h=200&fit=crop" }
      ]
    },
    {
      title: "ACTION",
      games: [
        { name: "Space Shooter", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=200&fit=crop" },
        { name: "Racing Pro", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop" },
        { name: "Combat Zone", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop" },
        { name: "Heli Defence", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=200&fit=crop" }
      ]
    },
    {
      title: "BRAIN TEASE",
      games: [
        { name: "Puzzle Master", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300&h=200&fit=crop" },
        { name: "Memory Game", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300&h=200&fit=crop" },
        { name: "Logic Challenge", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300&h=200&fit=crop" },
        { name: "Math Quest", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300&h=200&fit=crop" }
      ]
    },
    {
      title: "FIGHTING",
      games: [
        { name: "Martial Arts", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop" },
        { name: "Street Fighter", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop" },
        { name: "Combat Arena", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop" },
        { name: "Battle Royale", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop" }
      ]
    }
  ];

  const handleVideoClick = useCallback(() => {
    onVideoClick();
  }, [onVideoClick]);

  return (
    <div className="game-categories">
      <div className="categories-header">
        <h1 className="categories-main-title">{t('homepage.categories.title')}</h1>
        <p className="categories-main-subtitle">{t('homepage.categories.subtitle')}</p>
      </div>
      
      {categories.map((category, categoryIndex) => (
        <section key={categoryIndex} className="category-section">
          <div className="category-header">
            <h2 className="category-title">{category.title}</h2>
            <a href="#" className="view-all-link">View All →</a>
          </div>
          
          <div className="videos-grid">
            {category.games.map((video, videoIndex) => (
              <VideoCard 
                key={videoIndex}
                video={video}
                onVideoClick={handleVideoClick}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default VideoCategories;
