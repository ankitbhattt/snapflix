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

const VideosPage: React.FC = () => {
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
    }
  ];

  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  const handleVideoSelect = (video: VideoItem) => {
    setSelectedVideo(video);
    setIsPlaying(true);
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
                <p className="video-description">{video.description}</p>
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
