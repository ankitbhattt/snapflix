import React, { useState, useRef, useEffect } from 'react';
import './VideosPage.css';
import { useTranslation } from '../contexts/TranslationContext';

interface VideoItem {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
  category: string;
  views: string;
  uploadDate: string;
}

interface VideosPageProps {
  onVideoClick?: () => void;
}

const VideosPage: React.FC<VideosPageProps> = ({ onVideoClick }) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoCategories = [
    { id: 'all', name: 'All Videos', icon: '🎬' },
    { id: 'gameplay', name: 'Gameplay', icon: '🎮' },
    { id: 'reviews', name: 'Reviews', icon: '⭐' },
    { id: 'trailers', name: 'Trailers', icon: '🎭' },
    { id: 'tutorials', name: 'Tutorials', icon: '📚' },
    { id: 'esports', name: 'Esports', icon: '🏆' }
  ];

  const videos: VideoItem[] = [
    {
      id: 1,
      title: 'Epic Gaming Moments 2024',
      description: 'Watch the most incredible gaming moments from this year',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&h=400&fit=crop',
      duration: '12:45',
      category: 'gameplay',
      views: '2.3M',
      uploadDate: '2 days ago'
    },
    {
      id: 2,
      title: 'Top 10 Games of 2024',
      description: 'Our comprehensive review of the best games released this year',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
      duration: '18:30',
      category: 'reviews',
      views: '1.8M',
      uploadDate: '1 week ago'
    },
    {
      id: 3,
      title: 'Snapflix Originals Trailer',
      description: 'Exclusive content coming to Snapflix platform',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop',
      duration: '3:20',
      category: 'trailers',
      views: '5.1M',
      uploadDate: '3 days ago'
    },
    {
      id: 4,
      title: 'Pro Gaming Tips & Tricks',
      description: 'Learn advanced techniques from professional gamers',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=400&fit=crop',
      duration: '15:12',
      category: 'tutorials',
      views: '892K',
      uploadDate: '5 days ago'
    },
    {
      id: 5,
      title: 'Championship Finals 2024',
      description: 'The most intense esports tournament of the year',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop',
      duration: '45:30',
      category: 'esports',
      views: '7.2M',
      uploadDate: '1 week ago'
    },
    {
      id: 6,
      title: 'Game Development Behind the Scenes',
      description: 'Exclusive look at how games are created',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
      duration: '22:15',
      category: 'tutorials',
      views: '1.4M',
      uploadDate: '2 weeks ago'
    },
    {
      id: 7,
      title: 'Best FPS Games 2024',
      description: 'Top first-person shooter games of the year',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=400&fit=crop',
      duration: '14:22',
      category: 'reviews',
      views: '3.5M',
      uploadDate: '3 days ago'
    },
    {
      id: 8,
      title: 'Minecraft Build Showcase',
      description: 'Amazing creative builds from Minecraft community',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
      duration: '20:10',
      category: 'gameplay',
      views: '4.2M',
      uploadDate: '1 day ago'
    },
    {
      id: 9,
      title: 'GTA 6 Official Trailer Breakdown',
      description: 'Detailed analysis of every detail in the trailer',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&h=400&fit=crop',
      duration: '25:45',
      category: 'trailers',
      views: '12.5M',
      uploadDate: '1 week ago'
    },
    {
      id: 10,
      title: 'Speedrun World Record',
      description: 'Watch the fastest game completion ever recorded',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop',
      duration: '48:30',
      category: 'gameplay',
      views: '8.9M',
      uploadDate: '4 days ago'
    },
    {
      id: 11,
      title: 'Stardew Valley Complete Guide',
      description: 'Everything you need to know about Stardew Valley',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=400&fit=crop',
      duration: '35:20',
      category: 'tutorials',
      views: '1.9M',
      uploadDate: '1 week ago'
    },
    {
      id: 12,
      title: 'Valorant Tournament Highlights',
      description: 'Best plays from the latest Valorant championship',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop',
      duration: '30:15',
      category: 'esports',
      views: '6.3M',
      uploadDate: '2 days ago'
    },
    {
      id: 13,
      title: 'Elden Ring Boss Guide',
      description: 'How to defeat the toughest bosses in Elden Ring',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop',
      duration: '42:50',
      category: 'tutorials',
      views: '5.7M',
      uploadDate: '3 days ago'
    },
    {
      id: 14,
      title: 'Indie Games Hidden Gems',
      description: 'Discover amazing indie games you might have missed',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
      duration: '18:35',
      category: 'reviews',
      views: '2.1M',
      uploadDate: '5 days ago'
    },
    {
      id: 15,
      title: 'Cyberpunk 2077 Gameplay',
      description: 'Full gameplay walkthrough of Cyberpunk 2077',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&h=400&fit=crop',
      duration: '50:12',
      category: 'gameplay',
      views: '9.4M',
      uploadDate: '1 week ago'
    },
    {
      id: 16,
      title: 'PlayStation 6 Rumors',
      description: 'Latest rumors and speculation about PS6',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
      duration: '10:45',
      category: 'trailers',
      views: '3.8M',
      uploadDate: '2 weeks ago'
    },
    {
      id: 17,
      title: 'League of Legends Match Analysis',
      description: 'Breaking down the best plays from pro matches',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop',
      duration: '22:30',
      category: 'esports',
      views: '4.6M',
      uploadDate: '1 day ago'
    },
    {
      id: 18,
      title: 'Building Tips for Fortnite',
      description: 'Master the art of building in Fortnite',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=400&fit=crop',
      duration: '16:55',
      category: 'tutorials',
      views: '7.1M',
      uploadDate: '4 days ago'
    },
    {
      id: 19,
      title: 'Retro Games Remastered',
      description: 'Classic games brought back to life',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop',
      duration: '28:40',
      category: 'reviews',
      views: '3.2M',
      uploadDate: '1 week ago'
    },
    {
      id: 20,
      title: 'Terraria Adventure Map',
      description: 'Explore the most challenging adventure maps',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&h=400&fit=crop',
      duration: '38:15',
      category: 'gameplay',
      views: '5.5M',
      uploadDate: '3 days ago'
    },
    {
      id: 21,
      title: 'Upcoming Game Releases 2025',
      description: 'Most anticipated games coming next year',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&h=400&fit=crop',
      duration: '19:20',
      category: 'trailers',
      views: '6.8M',
      uploadDate: '5 days ago'
    },
    {
      id: 22,
      title: 'Call of Duty Tournament Finals',
      description: 'Watch the intense final match',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop',
      duration: '52:10',
      category: 'esports',
      views: '11.2M',
      uploadDate: '6 hours ago'
    },
    {
      id: 23,
      title: 'Red Dead Redemption 2 Guide',
      description: 'Complete guide to RDR2 gameplay',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
      duration: '40:35',
      category: 'tutorials',
      views: '4.3M',
      uploadDate: '2 weeks ago'
    },
    {
      id: 24,
      title: 'Open World Game Comparison',
      description: 'Comparing the best open world games',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
      duration: '24:50',
      category: 'reviews',
      views: '8.7M',
      uploadDate: '1 week ago'
    }
  ];

  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  const handleVideoSelect = (video: VideoItem) => {
    if (onVideoClick) {
      onVideoClick();
    } else {
      setSelectedVideo(video);
      setIsPlaying(true);
    }
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const formatDuration = (duration: string) => {
    return duration;
  };

  return (
    <div className="videos-page">
      <div className="videos-container">
        {/* Header */}
        <div className="videos-header">
          <h1 className="videos-main-title">Game Videos</h1>
          <p className="videos-subtitle">Watch the latest gameplay, reviews, and exclusive content</p>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          {videoCategories.map((category) => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Videos Grid */}
        <div className="videos-grid">
          {filteredVideos.map((video) => (
            <div key={video.id} className="video-card" onClick={() => handleVideoSelect(video)}>
              <div className="video-thumbnail-container">
                <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
                <div className="video-overlay">
                  <div className="play-button">
                    <span className="play-icon">▶</span>
                  </div>
                  <div className="video-duration">{formatDuration(video.duration)}</div>
                </div>
                <div className="video-category-badge">{video.category}</div>
              </div>
              <div className="video-info">
                <h3 className="video-title">{video.title}</h3>
                <div className="video-meta">
                  <span className="video-views">{video.views} views</span>
                  <span className="video-date">{video.uploadDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Player Modal */}
        {selectedVideo && (
          <div className="video-modal-overlay" onClick={handleCloseVideo}>
            <div className="video-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-video-btn" onClick={handleCloseVideo}>
                <span>×</span>
              </button>
              <div className="video-player-container">
                <video
                  ref={videoRef}
                  src={selectedVideo.videoUrl}
                  controls
                  autoPlay
                  className="video-player"
                />
                <div className="video-player-info">
                  <h2 className="player-video-title">{selectedVideo.title}</h2>
                  <p className="player-video-description">{selectedVideo.description}</p>
                  <div className="player-video-meta">
                    <span>{selectedVideo.views} views</span>
                    <span>•</span>
                    <span>{selectedVideo.uploadDate}</span>
                    <span>•</span>
                    <span>{selectedVideo.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideosPage;
