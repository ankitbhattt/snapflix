import React, { useState, useRef, useEffect } from 'react';
import './VideosPage.css';

interface VideoItem {
  id: number;
  title: string;
  category: string;
  video: string;
  image: string;
  views: string;
  timeAgo: string;
}

interface VideosPageProps {
  onVideoClick?: () => void;
}

const VideosPage: React.FC<VideosPageProps> = ({ onVideoClick }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const touchTimersRef = useRef<{ [key: number]: ReturnType<typeof setTimeout> | null }>({});

  useEffect(() => {
    // Safely detect mobile once on mount
    const checkMobile = () => {
      if (typeof window !== 'undefined' && window.innerWidth) {
        setIsMobile(window.innerWidth <= 768);
      }
    };
    checkMobile();
  }, []);

  const allVideos: VideoItem[] = [
    { id: 1, title: 'GTA 6 Trailer', category: 'trailers', video: 'https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/157_-_GTA_6_Trailer_sdhb8f.mp4', image: 'https://res.cloudinary.com/dbudqhbum/image/upload/v1761566577/samples/landscapes/girl-urban-view.jpg', views: '12.5M', timeAgo: '1 week ago' },
    { id: 2, title: 'OnePiece Edit', category: 'action', video: 'https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/127_-_Onepiece_edit_ifvaba.mp4', image: 'https://res.cloudinary.com/dbudqhbum/image/upload/v1761566597/cld-sample-4.jpg', views: '8.9M', timeAgo: '3 days ago' },
    { id: 3, title: 'Cyberpunk Edit', category: 'action', video: 'https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/134_-_Cyberpunk_Edit_kwejen.mp4', image: 'https://res.cloudinary.com/dbudqhbum/image/upload/v1761566575/samples/people/kitchen-bar.jpg', views: '6.3M', timeAgo: '2 days ago' },
    { id: 4, title: 'OnePiece Quotes', category: 'adventure', video: 'https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/153_-_The_quotes_from_onepiece_aqq6qj.mp4', image: 'https://res.cloudinary.com/dbudqhbum/image/upload/v1761566574/samples/ecommerce/analog-classic.jpg', views: '5.1M', timeAgo: '1 week ago' },
    { id: 5, title: 'Death Note Edit', category: 'thriller', video: 'https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/148_-_Death_note_edit_rf3xpx.mp4', image: 'https://res.cloudinary.com/dbudqhbum/image/upload/v1761566588/samples/balloons.jpg', views: '4.2M', timeAgo: '5 days ago' },
    { id: 6, title: 'Demon Slayer Fight', category: 'action', video: 'https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/122_-_Demon_slayer_fight_scene_fopfyr.mp4', image: 'https://res.cloudinary.com/dbudqhbum/image/upload/v1761566575/samples/people/kitchen-bar.jpg', views: '7.8M', timeAgo: '4 days ago' },
    { id: 7, title: 'Jojo Pucci Edit', category: 'action', video: 'https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/126_-_Jojo_Pucci_Edit_x8przs.mp4', image: 'https://res.cloudinary.com/dbudqhbum/image/upload/v1761566574/samples/ecommerce/analog-classic.jpg', views: '3.5M', timeAgo: '1 week ago' },
    { id: 8, title: 'Tunnel to Summer', category: 'adventure', video: 'https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/123._-_The_tunnel_to_summer_tjmhev.mp4', image: 'https://res.cloudinary.com/dbudqhbum/image/upload/v1761566588/samples/balloons.jpg', views: '2.9M', timeAgo: '6 days ago' },
    { id: 9, title: 'Naruto X Hinata', category: 'action', video: 'https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/161_-_Naruto_X_hinata_pu2g4g.mp4', image: 'https://res.cloudinary.com/dbudqhbum/image/upload/v1761566597/cld-sample-4.jpg', views: '9.2M', timeAgo: '3 days ago' },
    { id: 10, title: 'Sung Jin Woo', category: 'action', video: 'https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/169_-_Sung_jin_woo_badass_krrzu7.mp4', image: 'https://res.cloudinary.com/dbudqhbum/image/upload/v1761566575/samples/people/kitchen-bar.jpg', views: '6.7M', timeAgo: '2 days ago' },
    { id: 11, title: 'Gear 5 Awakening', category: 'action', video: 'https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/199_-_Gear_5_Awaken_moment_k1mczv.mp4', image: 'https://res.cloudinary.com/dbudqhbum/image/upload/v1761566588/samples/balloons.jpg', views: '11.3M', timeAgo: '1 day ago' },
    { id: 12, title: 'OnePiece Funny', category: 'adventure', video: 'https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/165_-_Onepiece_funny_momment_qxqmwf.mp4', image: 'https://res.cloudinary.com/dbudqhbum/image/upload/v1761566588/samples/balloons.jpg', views: '4.6M', timeAgo: '1 week ago' },
    { id: 13, title: 'Naruto vs Sasuke', category: 'action', video: 'https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/191_-_Naruto_X_Sasuke_mxmmkw.mp4', image: 'https://res.cloudinary.com/dbudqhbum/image/upload/v1761566574/samples/ecommerce/analog-classic.jpg', views: '8.4M', timeAgo: '5 days ago' },
    { id: 14, title: 'Usopp Moment', category: 'adventure', video: 'https://res.cloudinary.com/dbudqhbum/video/upload/Anime%20complete%20reels/188_-_The_usopp_moment_vqarsl.mp4', image: 'https://res.cloudinary.com/dbudqhbum/image/upload/v1761566597/cld-sample-4.jpg', views: '3.8M', timeAgo: '3 days ago' }
  ];

  const categories = [
    { id: 'all', name: 'All Videos', icon: '🎬' },
    { id: 'trailers', name: 'Trailers', icon: '🎭' },
    { id: 'action', name: 'Action', icon: '💥' },
    { id: 'adventure', name: 'Adventure', icon: '🗺️' },
    { id: 'thriller', name: 'Thriller', icon: '👻' }
  ];

  const filteredVideos = selectedCategory === 'all'
    ? allVideos
    : allVideos.filter(video => video.category === selectedCategory);

  const playVideo = (videoId: number) => {
    const video = videoRefs.current[videoId];
    if (video) {
      // Lazy load: set src only when hovered/touched
      if (!video.src && video.dataset.src) {
        video.src = video.dataset.src;
      }
      if (video.readyState >= 2) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.addEventListener('loadedmetadata', () => {
          video.currentTime = 0;
          video.play().catch(() => {});
        }, { once: true });
      }
    }
  };

  const pauseVideo = (videoId: number) => {
    const video = videoRefs.current[videoId];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const handleVideoHover = (videoId: number) => {
    setHoveredVideo(videoId);
    playVideo(videoId);
  };

  const handleVideoLeave = (videoId: number) => {
    setHoveredVideo(null);
    pauseVideo(videoId);
    
    // Clear touch timer if exists
    const timer = touchTimersRef.current[videoId];
    if (timer !== null && timer !== undefined) {
      clearTimeout(timer);
      touchTimersRef.current[videoId] = null;
    }
  };

  const handleTouchStart = (e: React.TouchEvent, videoId: number) => {
    // Don't prevent default to allow natural touch behavior
    setHoveredVideo(videoId);
    
    // Clear any existing timer for this video
    const existingTimer = touchTimersRef.current[videoId];
    if (existingTimer !== null && existingTimer !== undefined) {
      clearTimeout(existingTimer);
    }
    
    // Play video on touch - lazy load src
    const video = videoRefs.current[videoId];
    if (video) {
      // Lazy load: set src only when touched
      if (!video.src && video.dataset.src) {
        video.src = video.dataset.src;
      }
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If autoplay is blocked, will try on touch end
        });
      }
    }
    
    // Auto-pause after 5 seconds on touch devices
    touchTimersRef.current[videoId] = setTimeout(() => {
      setHoveredVideo(null);
      pauseVideo(videoId);
    }, 5000);
  };

  const handleTouchEnd = (e: React.TouchEvent, videoId: number) => {
    // Ensure video plays on touch end if it didn't on touch start
    const video = videoRefs.current[videoId];
    if (video && video.paused && hoveredVideo === videoId) {
      video.play().catch(() => {});
    }
  };

  const handleVideoLoaded = (videoId: number) => {
    const video = videoRefs.current[videoId];
    if (video && hoveredVideo !== videoId) {
      video.currentTime = 0.01;
      video.pause();
    }
  };

  const setVideoRef = (videoId: number) => (el: HTMLVideoElement | null) => {
    videoRefs.current[videoId] = el;
  };

  const handleCardClick = (videoId: number) => {
    // On mobile, ensure video plays on click as well
    if (hoveredVideo !== videoId) {
      setHoveredVideo(videoId);
      playVideo(videoId);
      
      // Auto-pause after 5 seconds on mobile
      const existingTimer = touchTimersRef.current[videoId];
      if (existingTimer !== null && existingTimer !== undefined) {
        clearTimeout(existingTimer);
      }
      touchTimersRef.current[videoId] = setTimeout(() => {
        setHoveredVideo(null);
        pauseVideo(videoId);
      }, 5000);
    }
    
    if (onVideoClick) {
      onVideoClick();
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup all timers on unmount
      Object.values(touchTimersRef.current).forEach(timer => {
        if (timer !== null && timer !== undefined) {
          clearTimeout(timer);
        }
      });
    };
  }, []);

  return (
    <div className="videos-page-new">
      <div className="videos-content">
        <div className="videos-page-header">
          <h1>Video Library</h1>
          <p>Watch the latest video game content</p>
        </div>

        <div className="category-filters">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span className="filter-icon">{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        <div className="videos-grid-new">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="video-card-new"
              onClick={() => handleCardClick(video.id)}
              onMouseEnter={() => handleVideoHover(video.id)}
              onMouseLeave={() => handleVideoLeave(video.id)}
              onTouchStart={(e) => handleTouchStart(e, video.id)}
              onTouchEnd={(e) => handleTouchEnd(e, video.id)}
            >
              <div className="video-wrapper">
                <video
                  ref={setVideoRef(video.id)}
                  data-src={video.video}
                  muted
                  playsInline
                  loop
                  preload="none"
                  poster={video.image}
                  onLoadedMetadata={() => handleVideoLoaded(video.id)}
                  className={`video-preview ${hoveredVideo === video.id ? 'playing' : ''}`}
                />
                <div className="video-badge">{video.category.toUpperCase()}</div>
              </div>
              <div className="video-details">
                <h3>{video.title}</h3>
                <div className="video-stats">
                  <span>{video.views} views</span>
                  <span>•</span>
                  <span>{video.timeAgo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideosPage;
