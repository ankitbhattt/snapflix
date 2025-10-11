import React from 'react';
import './VideosSection.css';
import { useTranslation } from '../contexts/TranslationContext';

const VideosSection: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="videos-section">
      <div className="videos-container">
        <h2 className="videos-title">{t('homepage.videos.title')}</h2>
        <div className="videos-content">
          <p className="videos-description">
            {t('homepage.videos.subtitle')}
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
