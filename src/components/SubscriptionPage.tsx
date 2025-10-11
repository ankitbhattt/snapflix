import React, { useState } from 'react';
import './SubscriptionPage.css';

const SubscriptionPage: React.FC = () => {
  const [couponCode, setCouponCode] = useState('');

  return (
    <div className="subscription-page">
      {/* Background Game Covers */}
      <div className="game-covers-background">
        <div className="game-cover">SATISFACTORY</div>
        <div className="game-cover">FORTNITE</div>
        <div className="game-cover">CALL OF DUTY</div>
        <div className="game-cover">VALORANT</div>
        <div className="game-cover">MINECRAFT</div>
        <div className="game-cover">GTA V</div>
        <div className="game-cover">CS:GO</div>
        <div className="game-cover">APEX LEGENDS</div>
        <div className="game-cover">OVERWATCH</div>
        <div className="game-cover">DOTA 2</div>
        <div className="game-cover">LEAGUE OF LEGENDS</div>
        <div className="game-cover">WORLD OF WARCRAFT</div>
      </div>

      {/* Main Content */}
      <div className="subscription-content">
        <div className="hero-section">
          <h1 className="hero-title">UNLIMITED VIDEOS AND MORE!</h1>
          <div className="hero-buttons">
            <button className="hero-btn primary">Buy Subscription</button>
            <button className="hero-btn secondary">Go Pro!</button>
          </div>
        </div>

        {/* Subscription Card */}
        <div className="subscription-card">
          <div className="popular-tag">Popular</div>
          <div className="card-content">
            <div className="subscription-description">
              <span className="checkmark">✓</span>
              <span>Purchase 1 Month THE GAMEIUM Subscription by clicking on the button below.</span>
            </div>
            <div className="subscription-description">
              <span className="checkmark">✓</span>
              <span>By Clicking on Buy Now button, You are agreed with subscription terms and conditions.</span>
            </div>
            
            {/* Coupon Section */}
            <div className="coupon-section">
              <input 
                type="text" 
                placeholder="Enter Coupon / Gift Card"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="coupon-input"
              />
              <button className="apply-btn">Apply</button>
            </div>

            {/* Payment Options */}
            <div className="payment-options">
              <button className="payment-btn primary">Buy Now ₹ 249</button>
              <button className="payment-btn secondary">Buy Using SuperCoins</button>
              <button className="payment-btn tertiary">Buy using UPI @ ₹ 10</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
