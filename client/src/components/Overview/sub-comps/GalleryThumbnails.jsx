import React, { useState, useEffect } from 'react';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';

export default function GalleryThumbnails({
  images,
  toggleHero,
  toggleThumbSelect,
}) {
  // HELPER FUNCTIONS //
  const imageMapper = (img, index) => (
    <div className={!index ? 'selected' : 'slide'} key={img.key} onClick={toggleHero}>
      <img
        id={`${index}a`}
        src={img.url}
        alt="a thumbnail"
        className="side-thumb"
        onClick={(e) => toggleThumbSelect(e)}
      />
    </div>
  );

  return (
    <div className="side-thumb-container">
      {/* <button className="scroll-images pre-btn" type="button">
            <AiOutlineUp className="scroll-arrow" size="2em" />
          </button> */}
      <div className="scroll-placeholder" />
      <div id="slider">
        {images
          ? images.map((image, index) => imageMapper(image, index))
          : null}
      </div>
      {/* <button className="scroll-images nxt-btn" type="button">
            <AiOutlineDown className="scroll-arrow" size="2em" />
          </button> */}
      <div className="scroll-placeholder" />
    </div>
  );
}
