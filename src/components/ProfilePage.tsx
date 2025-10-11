import React, { useState, useCallback } from 'react';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const userStats = {
    gamesPlayed: 156,
    totalScore: 125430,
    level: 12,
    achievements: 23,
    rank: 'Gold'
  };

  const recentGames = [
    { name: 'Cube Ninja', score: 15420, date: '2 hours ago' },
    { name: 'Traffic Racer', score: 12890, date: '5 hours ago' },
    { name: 'Watercraft Rush', score: 18750, date: '1 day ago' },
    { name: 'WWII Air Battle', score: 22100, date: '2 days ago' }
  ];

  const achievements = [
    { name: 'First Victory', description: 'Win your first game', icon: '🏆', unlocked: true },
    { name: 'Speed Demon', description: 'Complete 10 games in under 5 minutes', icon: '⚡', unlocked: true },
    { name: 'High Scorer', description: 'Score over 20,000 points', icon: '🎯', unlocked: true },
    { name: 'Marathon Runner', description: 'Play for 5 hours straight', icon: '🏃', unlocked: false },
    { name: 'Perfectionist', description: 'Get 100% accuracy in any game', icon: '💯', unlocked: false }
  ];

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const handleEditToggle = useCallback(() => {
    setIsEditing(!isEditing);
  }, [isEditing]);

  const handleSaveProfile = useCallback(() => {
    setIsEditing(false);
    // Add save logic here
    console.log('Profile saved');
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-circle">
              <span className="avatar-text">U</span>
            </div>
            <div className="online-indicator"></div>
          </div>
          
          <div className="profile-info">
            <h1 className="profile-name">Gamer User</h1>
            <p className="profile-email">user@gameium.com</p>
            <div className="profile-badges">
              <span className="badge rank-badge">{userStats.rank}</span>
              <span className="badge level-badge">Level {userStats.level}</span>
            </div>
          </div>
          
          <button className="edit-profile-btn" onClick={handleEditToggle}>
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-icon">🎮</div>
            <div className="stat-content">
              <div className="stat-number">{userStats.gamesPlayed}</div>
              <div className="stat-label">Games Played</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <div className="stat-number">{userStats.totalScore.toLocaleString()}</div>
              <div className="stat-label">Total Score</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <div className="stat-number">{userStats.achievements}</div>
              <div className="stat-label">Achievements</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🥇</div>
            <div className="stat-content">
              <div className="stat-number">#{userStats.rank}</div>
              <div className="stat-label">Current Rank</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-section">
          <button 
            className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => handleTabChange('profile')}
          >
            Profile
          </button>
          <button 
            className={`tab-button ${activeTab === 'games' ? 'active' : ''}`}
            onClick={() => handleTabChange('games')}
          >
            Recent Games
          </button>
          <button 
            className={`tab-button ${activeTab === 'achievements' ? 'active' : ''}`}
            onClick={() => handleTabChange('achievements')}
          >
            Achievements
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'profile' && (
            <div className="profile-details">
              <div className="detail-section">
                <h3>Personal Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      defaultValue="Gamer User" 
                      disabled={!isEditing}
                      className={isEditing ? 'editable' : ''}
                    />
                  </div>
                  <div className="detail-item">
                    <label>Email</label>
                    <input 
                      type="email" 
                      defaultValue="user@gameium.com" 
                      disabled={!isEditing}
                      className={isEditing ? 'editable' : ''}
                    />
                  </div>
                  <div className="detail-item">
                    <label>Phone</label>
                    <input 
                      type="tel" 
                      defaultValue="+91 9876543210" 
                      disabled={!isEditing}
                      className={isEditing ? 'editable' : ''}
                    />
                  </div>
                  <div className="detail-item">
                    <label>Date of Birth</label>
                    <input 
                      type="date" 
                      defaultValue="1995-01-01" 
                      disabled={!isEditing}
                      className={isEditing ? 'editable' : ''}
                    />
                  </div>
                </div>
                {isEditing && (
                  <div className="save-section">
                    <button className="save-btn" onClick={handleSaveProfile}>
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
              
              <div className="detail-section">
                <h3>Gaming Preferences</h3>
                <div className="preference-tags">
                  <span className="tag">Action</span>
                  <span className="tag">Racing</span>
                  <span className="tag">Puzzle</span>
                  <span className="tag">Adventure</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'games' && (
            <div className="recent-games">
              <h3>Recent Games</h3>
              <div className="games-list">
                {recentGames.map((game, index) => (
                  <div key={index} className="game-item">
                    <div className="game-info">
                      <h4>{game.name}</h4>
                      <p>{game.date}</p>
                    </div>
                    <div className="game-score">
                      <span className="score">{game.score.toLocaleString()}</span>
                      <span className="score-label">points</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="achievements-section">
              <h3>Achievements</h3>
              <div className="achievements-grid">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}>
                    <div className="achievement-icon">{achievement.icon}</div>
                    <div className="achievement-content">
                      <h4>{achievement.name}</h4>
                      <p>{achievement.description}</p>
                    </div>
                    <div className="achievement-status">
                      {achievement.unlocked ? '✓' : '🔒'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

