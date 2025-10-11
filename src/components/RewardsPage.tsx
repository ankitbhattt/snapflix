import React from 'react';
import './RewardsPage.css';

const RewardsPage: React.FC = () => {
  return (
    <div className="rewards-page">
      <div className="rewards-container">
        {/* Season Qualifier Section */}
        <div className="season-qualifier">
          <div className="qualifier-content">
            <p className="qualifier-text">You're competing in this season 1st month qualifier!</p>
            <div className="qualifier-character">
              <div className="character">😊</div>
            </div>
          </div>
        </div>

        {/* Main Rewards Section */}
        <div className="rewards-section">
          <h1 className="rewards-title">CLAIM REWARDS</h1>
          
          <div className="rewards-grid">
            {/* Reward Card 1 - Flower Aura */}
            <div className="reward-card">
              <div className="reward-logo">
                <div className="flower-logo">
                  <div className="flower-icon">🌸</div>
                  <span className="flower-text">FLOWER AURA</span>
                </div>
              </div>
              <div className="reward-content">
                <h3 className="reward-offer">Exclusive Deal: Enjoy Flat 15% OFF On All Gifting Products Sitewide!</h3>
                <p className="reward-expiry">Expires: Ends on 31 Oct 2025</p>
                <p className="reward-category">Gifts and Flowers Cake Personalized Gifts Gift</p>
              </div>
            </div>

            {/* Reward Card 2 - Masaba */}
            <div className="reward-card">
              <div className="reward-logo">
                <div className="masaba-logo">
                  <span className="masaba-text">maşaba</span>
                  <div className="masaba-dot">•</div>
                </div>
              </div>
              <div className="reward-content">
                <h3 className="reward-offer">Sitewide Offer: Up To 70% OFF On All Orders</h3>
                <p className="reward-expiry">Expires: Ongoing Offer</p>
                <p className="reward-category">Fashion</p>
              </div>
            </div>

            {/* Reward Card 3 - 82°E */}
            <div className="reward-card">
              <div className="reward-logo">
                <div className="eighty-two-logo">
                  <span className="eighty-two-text">82°E</span>
                </div>
              </div>
              <div className="reward-content">
                <h3 className="reward-offer">Hydrating Products Starts At Affordable Prices</h3>
                <p className="reward-expiry">Expires: Ongoing Offer</p>
                <p className="reward-category">Beauty</p>
              </div>
            </div>
          </div>

          {/* Gift Box Decoration */}
          <div className="gift-box-decoration">
            <div className="gift-box">🎁</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;