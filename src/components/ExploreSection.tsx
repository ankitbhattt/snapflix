import React from 'react';
import './ExploreSection.css';

const ExploreSection: React.FC = () => {
  const categories = [
    {
      id: 'originals',
      name: 'The Gameium Originals',
      icon: '🎮',
      color: '#dc2626'
    },
    {
      id: 'action',
      name: 'Action',
      icon: '🤖',
      color: '#fbbf24'
    },
    {
      id: 'adventure',
      name: 'Adventure',
      icon: '🎈',
      color: '#f97316'
    },
    {
      id: 'battle',
      name: 'Battle Game',
      icon: '✈️',
      color: '#fbbf24'
    },
    {
      id: 'brain',
      name: 'Brain Tease',
      icon: '🧩',
      color: '#8b5cf6'
    },
    {
      id: 'fighting',
      name: 'Fighting',
      icon: '🥋',
      color: '#f59e0b'
    }
  ];

  return (
    <div className="explore-section">
      <div className="explore-background">
        <h1 className="explore-bg-text">EXPLORE</h1>
      </div>
      <div className="explore-content">
        <h2 className="explore-title">EXPLORE</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="category-item"
              onClick={() => console.log(`Clicked ${category.name}`)}
            >
              <div 
                className="category-icon"
                style={{ backgroundColor: category.color }}
              >
                <span className="icon-emoji">{category.icon}</span>
              </div>
              <span className="category-name">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreSection;
