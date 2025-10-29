import React, { useState, useEffect } from 'react';
import './FavoritesPage.css';

interface VideoItem {
  name: string;
  video: string;
  image: string;
  category: string;
}

interface FavoritesPageProps {
  onVideoClick?: () => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ onVideoClick }) => {
  const [favoriteVideos, setFavoriteVideos] = useState<VideoItem[]>([]);

  useEffect(() => {
    const loadFavorites = () => {
      const stored = localStorage.getItem('snapflix_favorites');
      if (stored) {
        const favoriteNames = new Set(JSON.parse(stored));
        
        const allVideos: VideoItem[] = [
          { name: "Demon Slayer Fight", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/122_-_Demon_slayer_fight_scene_fopfyr.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566575/samples/people/kitchen-bar.jpg", category: "Fighting Video Games" },
          { name: "Jojo Pucci Edit", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/126_-_Jojo_Pucci_Edit_x8przs.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566574/samples/ecommerce/analog-classic.jpg", category: "Top Trending Video Games" },
          { name: "Tunnel to Summer", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/123._-_The_tunnel_to_summer_tjmhev.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566588/samples/balloons.jpg", category: "Top Trending Video Games" },
          { name: "OnePiece Edit", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/127_-_Onepiece_edit_ifvaba.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566577/samples/landscapes/girl-urban-view.jpg", category: "Top Trending Video Games" },
          { name: "Cyberpunk Edit", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/134_-_Cyberpunk_Edit_kwejen.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566574/samples/food/dessert.jpg", category: "Adventure Video Games" },
          { name: "OnePiece Quotes", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/153_-_The_quotes_from_onepiece_aqq6qj.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566575/samples/people/kitchen-bar.jpg", category: "Adventure Video Games" },
          { name: "Death Note Edit", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/148_-_Death_note_edit_rf3xpx.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566574/samples/ecommerce/analog-classic.jpg", category: "Adventure Video Games" },
          { name: "GTA 6 Trailer", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/157_-_GTA_6_Trailer_sdhb8f.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566577/samples/landscapes/girl-urban-view.jpg", category: "Action Video Games" },
          { name: "Naruto X Hinata", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/161_-_Naruto_X_hinata_pu2g4g.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566597/cld-sample-4.jpg", category: "Action Video Games" },
          { name: "Sung Jin Woo", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/169_-_Sung_jin_woo_badass_krrzu7.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566575/samples/people/kitchen-bar.jpg", category: "Action Video Games" },
          { name: "Gear 5 Awakening", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/199_-_Gear_5_Awaken_moment_k1mczv.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566588/samples/balloons.jpg", category: "Brain Tease Video Games" },
          { name: "OnePiece Funny", video: "https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/165_-_Onepiece_funny_momment_qxqmwf.mp4", image: "https://res.cloudinary.com/dbudqhbum/image/upload/v1761566588/samples/balloons.jpg", category: "Adventure Video Games" },
        ];
        
        const favorites = allVideos.filter(video => favoriteNames.has(video.name));
        setFavoriteVideos(favorites);
      }
    };
    
    loadFavorites();
    
    // Removed setInterval - was causing performance issues
    // Favorites will load on mount and when component re-renders
  }, []);

  const handleRemoveFavorite = (videoName: string) => {
    const stored = localStorage.getItem('snapflix_favorites');
    if (stored) {
      const favoriteNames = new Set(JSON.parse(stored));
      favoriteNames.delete(videoName);
      localStorage.setItem('snapflix_favorites', JSON.stringify(Array.from(favoriteNames)));
      setFavoriteVideos(prev => prev.filter(v => v.name !== videoName));
    }
  };

  if (favoriteVideos.length === 0) {
    return (
      <div className="favorites-page">
        <div className="favorites-empty">
          <div className="empty-icon">❤️</div>
          <h2>No Favorite Videos Yet</h2>
          <p>Start adding videos to your favorites by clicking the heart icon on any video!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="favorites-header-page">
        <h1 className="favorites-page-title">
          <span className="heart-icon">❤️</span>
          Your Favorite Videos
        </h1>
        <p className="favorites-page-subtitle">
          {favoriteVideos.length} {favoriteVideos.length === 1 ? 'video' : 'videos'} in your collection
        </p>
      </div>

      <div className="favorites-grid-page">
        {favoriteVideos.map((video, index) => (
          <div key={index} className="favorite-card-page" onClick={onVideoClick}>
            <div className="favorite-video-container-page">
              <video
                data-src={video.video}
                muted
                playsInline
                loop
                preload="none"
                poster={video.image}
                onMouseEnter={(e) => {
                  // Lazy load on hover
                  if (!e.currentTarget.src && e.currentTarget.dataset.src) {
                    e.currentTarget.src = e.currentTarget.dataset.src;
                  }
                }}
                onTouchStart={(e) => {
                  // Lazy load on touch
                  if (!e.currentTarget.src && e.currentTarget.dataset.src) {
                    e.currentTarget.src = e.currentTarget.dataset.src;
                  }
                }}
              />
              <button 
                className="remove-favorite-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFavorite(video.name);
                }}
                aria-label="Remove from favorites"
              >
                ❤️
              </button>
              <div className="favorite-overlay-page">
                <span className="favorite-badge-page">❤️ FAVORITE</span>
              </div>
            </div>
            <h3 className="favorite-title-page">{video.name}</h3>
            <span className="favorite-category-page">{video.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;

