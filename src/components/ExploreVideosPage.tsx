import React, { useState } from 'react';
import './ExploreVideosPage.css';

interface VideoCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  count: number;
  thumbnail: string;
}

const ExploreVideosPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories: VideoCategory[] = [
    {
      id: 'action',
      name: 'Action Video Games',
      icon: '💥',
      description: 'Intense combat and thrilling action',
      count: 245,
      thumbnail: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=400&h=300&fit=crop'
    },
    {
      id: 'adventure',
      name: 'Adventure Video Games',
      icon: '🗺️',
      description: 'Epic journeys and discoveries',
      count: 189,
      thumbnail: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=300&fit=crop'
    },
    {
      id: 'strategy',
      name: 'Strategy Video Games',
      icon: '♟️',
      description: 'Tactical gameplay and planning',
      count: 156,
      thumbnail: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop'
    },
    {
      id: 'racing',
      name: 'Racing Video Games',
      icon: '🏎️',
      description: 'High-speed thrills',
      count: 98,
      thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    },
    {
      id: 'sports',
      name: 'Sports Video Games',
      icon: '⚽',
      description: 'Virtual sports action',
      count: 124,
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop'
    },
    {
      id: 'puzzle',
      name: 'Puzzle Video Games',
      icon: '🧩',
      description: 'Brain-teasing challenges',
      count: 142,
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop'
    },
    {
      id: 'horror',
      name: 'Horror Video Games',
      icon: '👻',
      description: 'Scary and suspenseful',
      count: 87,
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
    },
    {
      id: 'indie',
      name: 'Indie Video Games',
      icon: '🎨',
      description: 'Creative and unique',
      count: 203,
      thumbnail: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop'
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="explore-videos-page">
      <div className="explore-header-section">
        <h1 className="explore-main-title">
          <span className="title-icon">🚀</span>
          Explore Video Games
        </h1>
        <p className="explore-subtitle">
          Discover thousands of amazing video games across all genres
        </p>
      </div>

      <div className="categories-grid">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`category-card ${selectedCategory === category.id ? 'selected' : ''}`}
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="category-thumbnail" style={{ backgroundImage: `url(${category.thumbnail})` }}>
              <div className="category-overlay">
                <span className="category-icon">{category.icon}</span>
              </div>
              <div className="video-count-badge">
                {category.count} Videos
              </div>
            </div>
            <div className="category-info">
              <h3 className="category-name">{category.name}</h3>
              <p className="category-description">{category.description}</p>
              <button className="explore-btn">
                Explore <span>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div className="category-videos-preview">
          <h2 className="preview-title">Popular in {categories.find(c => c.id === selectedCategory)?.name}</h2>
          <div className="preview-grid">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="preview-video-card">
                <div className="preview-thumbnail"></div>
                <div className="preview-info">
                  <div className="preview-play-btn">▶</div>
                  <span className="preview-duration">5:32</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreVideosPage;

