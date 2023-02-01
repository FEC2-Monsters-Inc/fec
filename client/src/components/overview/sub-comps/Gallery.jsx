import React, { useState, useEffect } from 'react';

export default function Gallery({ style }) {
  // STATE DATA //
  const [images, setImages] = useState([]);
  const [heroImage, setHero] = useState('');

  // INITIALIZATION //
  useEffect(() => {
    if (style) {
      setHero(style.photos[0].url);
      setImages(style.photos.map((photo, index) => ({
        url: photo.url,
        key: index,
      }
      )));
    }
  }, [style]);

  return (
    <div id="gallery">
      <div className="side-thumb-images">
        { images.map((img) => <img className="side-thumb" src={img.url} key={img.key} alt="More product thumbs" />)}
        <button className="scroll-images" type="button">Scroll</button>
      </div>
      <div className="hero-image-container">
        <button className="scroll-hero left" type="button">Left</button>
        <img className="hero-image" src={heroImage} alt="product hero" />
        <button className="expand-hero" type="button">Expand</button>
        <button className="scroll-hero right" type="button">Right</button>
      </div>

    </div>
  );
}
