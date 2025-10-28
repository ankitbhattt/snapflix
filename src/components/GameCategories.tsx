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
  onNavigate?: (page: string) => void;
}

interface VideoCardProps {
  video: VideoItem;
  onVideoClick: () => void;
  onFavorite?: (name: string) => void;
  isFavorite?: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onVideoClick, onFavorite, isFavorite }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  const [favorite, setFavorite] = useState(isFavorite || false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorite(!favorite);
    if (onFavorite) {
      onFavorite(video.name);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    
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
        <video
          ref={videoRef}
          src={video.video}
          className="video-element visible"
          muted
          playsInline
          loop={false}
          preload="metadata"
        />
        <div className="video-overlay video-active">
          <div className="video-preview-badge">
            <span className="preview-dot"></span>
            <span>PREVIEW</span>
          </div>
        </div>
        <button 
          className={`favorite-btn ${favorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label="Add to favorites"
        >
          ❤️
        </button>
      </div>
      <h3 className="video-title">{video.name}</h3>
    </div>
  );
};

const VideoCategories: React.FC<VideoCategoriesProps> = ({ onVideoClick, onNavigate }) => {
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  
  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem('snapflix_favorites');
    if (storedFavorites) {
      setFavorites(new Set(JSON.parse(storedFavorites)));
    }
  }, []);
  
  // Save favorites to localStorage
  const handleFavorite = (videoName: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(videoName)) {
      newFavorites.delete(videoName);
    } else {
      newFavorites.add(videoName);
    }
    setFavorites(newFavorites);
    localStorage.setItem('snapflix_favorites', JSON.stringify(Array.from(newFavorites)));
  };
  
  const handleViewAll = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('videos');
    }
  };
  const categories = [
    {
      title: "TOP TRENDING VIDEO GAMES",
      games: [
        { name: "Demon Slayer Fight", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/122_-_Demon_slayer_fight_scene_fopfyr.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566575/samples/people/kitchen-bar.jpg" },
        { name: "Jojo Pucci Edit", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/126_-_Jojo_Pucci_Edit_x8przs.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566574/samples/ecommerce/analog-classic.jpg" },
        { name: "Tunnel to Summer", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/123._-_The_tunnel_to_summer_tjmhev.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566588/samples/balloons.jpg" },
        { name: "OnePiece Edit", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/127_-_Onepiece_edit_ifvaba.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566577/samples/landscapes/girl-urban-view.jpg" }
      ]
    },
    {
      title: "ADVENTURE VIDEO GAMES",
      games: [
        { name: "Cyberpunk Edit", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/134_-_Cyberpunk_Edit_kwejen.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566574/samples/food/dessert.jpg" },
        { name: "OnePiece Quotes", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/153_-_The_quotes_from_onepiece_aqq6qj.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566575/samples/people/kitchen-bar.jpg" },
        { name: "Death Note Edit", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/148_-_Death_note_edit_rf3xpx.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566574/samples/ecommerce/analog-classic.jpg" },
        { name: "OnePiece Funny", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/165_-_Onepiece_funny_momment_qxqmwf.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566588/samples/balloons.jpg" }
      ]
    },
    {
      title: "ACTION VIDEO GAMES",
      games: [
        { name: "GTA 6 Trailer", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/157_-_GTA_6_Trailer_sdhb8f.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566577/samples/landscapes/girl-urban-view.jpg" },
        { name: "Naruto X Hinata", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/161_-_Naruto_X_hinata_pu2g4g.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566597/cld-sample-4.jpg" },
        { name: "Sung Jin Woo", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/169_-_Sung_jin_woo_badass_krrzu7.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566575/samples/people/kitchen-bar.jpg" },
        { name: "Naruto vs Sasuke", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/191_-_Naruto_X_Sasuke_mxmmkw.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566574/samples/ecommerce/analog-classic.jpg" }
      ]
    },
    {
      title: "BRAIN TEASE VIDEO GAMES",
      games: [
        { name: "Gear 5 Awakening", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/199_-_Gear_5_Awaken_moment_k1mczv.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566588/samples/balloons.jpg" },
        { name: "Dance Video", video: "https://res.cloudinary.com/dbudqhbum/video/upload/samples/dance-2.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566577/samples/landscapes/girl-urban-view.jpg" },
        { name: "Usopp Moment", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/188_-_The_usopp_moment_vqarsl.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566597/cld-sample-4.jpg" },
        { name: "OnePiece Gear 5", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/199_-_Gear_5_Awaken_moment_k1mczv.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566574/samples/food/dessert.jpg" }
      ]
    },
    {
      title: "FIGHTING VIDEO GAMES",
      games: [
        { name: "Demon Slayer Fight", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/122_-_Demon_slayer_fight_scene_fopfyr.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566575/samples/people/kitchen-bar.jpg" },
        { name: "Jojo Pucci Edit", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/126_-_Jojo_Pucci_Edit_x8przs.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566585/samples/two-ladies.jpg" },
        { name: "Cyberpunk Edit", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/134_-_Cyberpunk_Edit_kwejen.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566597/cld-sample-4.jpg" },
        { name: "Death Note Edit", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/148_-_Death_note_edit_rf3xpx.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566588/samples/balloons.jpg" }
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
            <button 
              className="view-all-btn" 
              onClick={handleViewAll}
            >
              View All →
            </button>
          </div>
          
          <div className="videos-grid">
            {category.games.map((video, videoIndex) => (
              <VideoCard 
                key={videoIndex}
                video={video}
                onVideoClick={handleVideoClick}
                onFavorite={handleFavorite}
                isFavorite={favorites.has(video.name)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default VideoCategories;
