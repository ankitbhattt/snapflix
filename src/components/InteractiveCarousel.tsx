import React, { useState, useEffect, useCallback } from 'react';
import './InteractiveCarousel.css';
import { useTranslation } from '../contexts/TranslationContext';

interface CarouselItem {
  id: number;
  title: string;
  video: string;
  description: string;
  image: string;
}

interface InteractiveCarouselProps {
  onGameClick: () => void;
}

const InteractiveCarousel: React.FC<InteractiveCarouselProps> = ({ onGameClick }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const carouselItems: CarouselItem[] = [
    {
      id: 1,
      title: "FPS",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      description: "Experience intense first-person action",
      image: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Racing",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      description: "High-speed racing adventures",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Adventure",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      description: "Epic quests and exploration",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop"
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  }, [carouselItems.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  }, [carouselItems.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isAutoPlaying]);

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const currentItem = carouselItems[currentIndex];

  return (
    <div 
      className="interactive-carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="carousel-header">
        <h1 className="carousel-main-title">{t('homepage.carousel.title')}</h1>
        <p className="carousel-main-subtitle">{t('homepage.carousel.subtitle')}</p>
      </div>
      
      <div className="carousel-container">
        <div className="slide-content">
          <div className="slide-text">
            <h1 className="slide-title">{currentItem.title}</h1>
            <p className="slide-description">{currentItem.description}</p>
            <button 
              className="slide-button"
              onClick={onGameClick}
            >
              {t('homepage.action.play')}
            </button>
          </div>
          
          <div className="slide-image">
            <img 
              src={currentItem.image}
              alt={currentItem.title}
              className="slide-image-element"
            />
            <div className="image-overlay"></div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button className="carousel-arrow left" onClick={prevSlide}>
        ‹
      </button>
      <button className="carousel-arrow right" onClick={nextSlide}>
        ›
      </button>

      {/* Dots Indicator */}
      <div className="carousel-dots">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default InteractiveCarousel;
