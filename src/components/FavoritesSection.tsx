import React, { useEffect, useState } from 'react';
import './FavoritesSection.css';

interface VideoItem {
  name: string;
  video: string;
  image: string;
  category: string;
}

interface FavoritesSectionProps {
  onVideoClick: () => void;
  onNavigate?: (page: string) => void;
}

const FavoritesSection: React.FC<FavoritesSectionProps> = ({ onVideoClick, onNavigate }) => {
  const [favoriteVideos, setFavoriteVideos] = useState<VideoItem[]>([]);
  
  useEffect(() => {
    const loadFavorites = () => {
      const stored = localStorage.getItem('snapflix_favorites');
      if (stored) {
        const favoriteNames = new Set(JSON.parse(stored));
        
        // All available videos from all categories
        const allVideos: VideoItem[] = [
          { name: "Demon Slayer Fight", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/122_-_Demon_slayer_fight_scene_fopfyr.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566575/samples/people/kitchen-bar.jpg", category: "Fighting" },
          { name: "Jojo Pucci Edit", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/126_-_Jojo_Pucci_Edit_x8przs.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566574/samples/ecommerce/analog-classic.jpg", category: "Top Trending" },
          { name: "Tunnel to Summer", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/123._-_The_tunnel_to_summer_tjmhev.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566588/samples/balloons.jpg", category: "Top Trending" },
          { name: "OnePiece Edit", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/127_-_Onepiece_edit_ifvaba.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566577/samples/landscapes/girl-urban-view.jpg", category: "Top Trending" },
          { name: "Cyberpunk Edit", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/134_-_Cyberpunk_Edit_kwejen.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566574/samples/food/dessert.jpg", category: "Adventure" },
          { name: "OnePiece Quotes", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/153_-_The_quotes_from_onepiece_aqq6qj.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566575/samples/people/kitchen-bar.jpg", category: "Adventure" },
          { name: "Death Note Edit", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/148_-_Death_note_edit_rf3xpx.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566574/samples/ecommerce/analog-classic.jpg", category: "Adventure" },
          { name: "GTA 6 Trailer", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/157_-_GTA_6_Trailer_sdhb8f.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566577/samples/landscapes/girl-urban-view.jpg", category: "Action" },
          { name: "Naruto X Hinata", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/161_-_Naruto_X_hinata_pu2g4g.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566597/cld-sample-4.jpg", category: "Action" },
          { name: "Sung Jin Woo", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/169_-_Sung_jin_woo_badass_krrzu7.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566575/samples/people/kitchen-bar.jpg", category: "Action" },
          { name: "Gear 5 Awakening", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/199_-_Gear_5_Awaken_moment_k1mczv.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566588/samples/balloons.jpg", category: "Brain Tease" },
          { name: "OnePiece Funny", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/165_-_Onepiece_funny_momment_qxqmwf.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566588/samples/balloons.jpg", category: "Adventure" },
        ];
        
        const favorites = allVideos.filter(video => favoriteNames.has(video.name));
        setFavoriteVideos(favorites);
      }
    };
    
    loadFavorites();
    
    // Listen for storage changes (when favorites are updated)
    const handleStorageChange = () => {
      loadFavorites();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', loadFavorites);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', loadFavorites);
    };
  }, []);
  
  if (favoriteVideos.length === 0) {
    return null;
  }
  
  return (
    <div className="favorites-section">
      <div className="favorites-header">
        <h2 className="favorites-title">
          ❤️ Your Favorite Videos
        </h2>
        {onNavigate && (
          <button 
            className="view-all-btn"
            onClick={() => onNavigate('videos')}
          >
            View All →
          </button>
        )}
      </div>
      
      <div className="favorites-grid">
        {favoriteVideos.slice(0, 4).map((video, index) => (
          <div 
            key={index}
            className="favorite-card"
            onClick={onVideoClick}
          >
            <div className="favorite-video-container">
              <video
                src={video.video}
                muted
                playsInline
                loop
                preload={window.innerWidth <= 768 ? "none" : "metadata"}
              />
              <div className="favorite-overlay">
                <span className="favorite-badge">❤️ FAVORITE</span>
              </div>
            </div>
            <h3 className="favorite-title">{video.name}</h3>
            <span className="favorite-category">{video.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesSection;

