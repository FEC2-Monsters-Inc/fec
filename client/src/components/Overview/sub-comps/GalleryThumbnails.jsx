import React from 'react';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';

export default function GalleryThumbnails({
  images,
  toggleHero,
  toggleThumbSelect,
}) {
  // HELPER FUNCTIONS //
  const slideSorter = (imgs) => imgs.map((img, index) => (
    <div className={!index ? 'selected' : 'slide'} key={img.key} onClick={toggleHero}>
      <img
        id={`${index}a`}
        src={img.url}
        alt="a thumbnail"
        className="side-thumb"
        onClick={(e) => toggleThumbSelect(e)}
      />
    </div>
  ));

  return (
    <div className="side-thumb-container">
      <button className="scroll-images pre-btn" type="button"><AiOutlineUp size="2em" /></button>
      <div id="slider">
        {images.length
          ? slideSorter(images).map((slide) => slide)
          : null}
      </div>
      <button className="scroll-images nxt-btn" type="button"><AiOutlineDown size="2em" /></button>
    </div>
  );
}
