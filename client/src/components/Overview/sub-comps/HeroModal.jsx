import React, { useState, useEffect } from 'react';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import ReactDOM from 'react-dom';

export default function HeroModal({
  heroModal,
  setHeroModal,
  images,
  heroImage,
  leftBtn,
  rightBtn,
  toggleHeroLeft,
  toggleHeroRight,
  toggleThumbSelect,
}) {
  // STATE DATA //
  const [zoomIn, asetZoomIn] = useState(false);
  const [zoomOut, setZoomOut] = useState(true);

  // HELPER FUNCTIONS //
  const thumbMapper = (imgs) => {
    imgs.filter((image) => image.url !== heroImage);
  };

  // EVENT HANDLERS //
  const close = () => {
    setHeroModal(false);
  };

  // INITIALIZATION //
  useEffect(() => {
    if (heroModal) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'visible';
  }, [heroModal]);

  if (!heroModal) return null;
  return ReactDOM.createPortal((
    <div id="hero-modal">
      <div id="hero-modal-content">
        <button className="close-hero-modal" type="button" onClick={() => setHeroModal(false)}>X</button>
        <div className="hero-modal-thumbs" />
        <div className="hero-modal-image-container">
          <img
            className="hero-modal-image"
            src={heroImage.url}
            alt="product hero"
          />
        </div>
        <button
          className={`scroll-hero-left ${!leftBtn ? 'btn-hidden' : ''}`}
          type="button"
          onClick={toggleHeroLeft}
        >
          <AiOutlineDoubleRight size="2em" />
        </button>
        <button
          className={`scroll-hero-right ${!rightBtn ? 'btn-hidden' : ''}`}
          type="button"
          onClick={toggleHeroRight}
        >
          <AiOutlineDoubleRight size="2em" />
        </button>
      </div>
    </div>), document.getElementById('modal'));
}
