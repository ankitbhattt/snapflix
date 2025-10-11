import React, { useState } from 'react';
import './FloatingActionButton.css';

interface FloatingActionButtonProps {
  onQuickAction?: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onQuickAction }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMainClick = () => {
    if (onQuickAction) {
      onQuickAction();
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleSubAction = (action: string) => {
    console.log('Quick action:', action);
    setIsOpen(false);
  };

  return (
    <div className="fab-container">
      {/* Sub Actions */}
      <div className={`fab-sub-actions ${isOpen ? 'open' : ''}`}>
        <button 
          className="fab-sub-action"
          onClick={() => handleSubAction('search')}
          title="Quick Search"
        >
          🔍
        </button>
        <button 
          className="fab-sub-action"
          onClick={() => handleSubAction('favorite')}
          title="Add to Favorites"
        >
          ❤️
        </button>
        <button 
          className="fab-sub-action"
          onClick={() => handleSubAction('share')}
          title="Share"
        >
          📤
        </button>
        <button 
          className="fab-sub-action"
          onClick={() => handleSubAction('settings')}
          title="Settings"
        >
          ⚙️
        </button>
      </div>

      {/* Main FAB */}
      <button 
        className={`fab-main ${isOpen ? 'open' : ''}`}
        onClick={handleMainClick}
        title="Quick Actions"
      >
        <span className="fab-icon">⚡</span>
      </button>
    </div>
  );
};

export default FloatingActionButton;
