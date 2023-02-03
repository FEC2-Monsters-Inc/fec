import React, { useState, useEffect } from 'react';
import {
  AiOutlineDoubleRight, AiOutlineDown, AiOutlineExpand, AiOutlineUp,
} from 'react-icons/ai';
import GalleryThumbnails from './GalleryThumbnails.jsx';

export default function Gallery({ currStyle, setCurrStyle }) {
  // STATE DATA //
  const [images, setImages] = useState([]);
  const [heroImage, setHero] = useState('');

  // EVENT HANDLERS //
  const toggleHero = (event) => {
    setHero(event.target.src);
  };

  // INITIALIZATION //
  useEffect(() => {
    if (currStyle) {
      setHero(currStyle.photos[0].url);
      setImages(currStyle.photos.map((photo, index) => ({
        url: photo.url,
        key: index,
      }
      )));
    }
  }, [currStyle]);

  return (
    <div id="gallery">
      <div className="side-thumb-container">
        <button className="scroll-images" type="button"><AiOutlineUp size="2em" /></button>
        <div className="side-thumb-images">
          { images.map((img) => <img className="side-thumb" src={img.url} key={img.key} alt="More product thumbs" onClick={(e) => toggleHero(e)} />)}
        </div>
        <button className="scroll-images" type="button"><AiOutlineDown size="2em" /></button>
      </div>
      <div className="hero-image-container">
        <button className="scroll-hero-left" type="button"><AiOutlineDoubleRight size="2em" /></button>
        <img className="hero-image" src={heroImage} alt="product hero" />
        <button className="expand-hero" type="button"><AiOutlineExpand size="1.5em" /></button>
        <button className="scroll-hero-right" type="button"><AiOutlineDoubleRight size="2em" /></button>
      </div>
    </div>
  );
}
