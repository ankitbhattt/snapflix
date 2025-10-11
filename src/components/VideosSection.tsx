import React from 'react';
import './VideosSection.css';

const VideosSection: React.FC = () => {
  return (
    <div className="videos-section">
      <div className="videos-container">
        <h2 className="videos-title">VIDEOS</h2>
        <div className="videos-content">
          <p className="videos-description">
            Discover the latest gaming content, tutorials, and highlights from The Gameium community.
          </p>
          <div className="videos-grid">
            {/* Placeholder for video content */}
            <div className="video-placeholder">
              <div className="play-button">▶</div>
              <h3>Coming Soon</h3>
              <p>Video content will be available here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideosSection;
