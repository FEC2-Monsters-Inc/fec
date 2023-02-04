import React from 'react';
import { AiOutlineDoubleRight, AiOutlineExpand } from 'react-icons/ai';
import GalleryThumbnails from './GalleryThumbnails.jsx';

export default function Gallery({
  images,
  heroImage,
  setHero,
  rightBtn,
  leftBtn,
  btnRenderCheck,
}) {
  // HELPER FUNCTION //
  const toggleThumbSelect = (event) => {
    const oldSelect = document.getElementsByClassName('selected')[0];
    const newSelect = event.target.parentNode;
    oldSelect.className = 'slide';
    newSelect.className = 'selected';
    btnRenderCheck();
  };

  // EVENT HANDLERS //
  const toggleHero = (event) => {
    const index = Number(event.target.id.slice(0, 1));
    setHero({
      url: images[index].url,
      index,
    });
  };

  const toggleHeroLeft = () => {
    const index = Number(heroImage.index);
    if (index > 0) {
      setHero({
        url: images[index - 1].url,
        index: index - 1,
      });
    }
    const oldSelect = document.getElementsByClassName('selected')[0];
    const prevThumb = oldSelect.previousSibling;
    if (prevThumb) {
      oldSelect.className = 'slide';
      prevThumb.className = 'selected';
      btnRenderCheck();
    }
  };

  const toggleHeroRight = () => {
    const index = Number(heroImage.index);
    if (index < images.length - 1) {
      setHero({
        url: images[index + 1].url,
        index: index + 1,
      });
    }
    const oldSelect = document.getElementsByClassName('selected')[0];
    const nextThumb = oldSelect.nextSibling;
    if (nextThumb) {
      oldSelect.className = 'slide';
      nextThumb.className = 'selected';
      btnRenderCheck();
    }
  };

  return (
    <div id="gallery">
      <GalleryThumbnails
        images={images}
        toggleHero={toggleHero}
        toggleThumbSelect={toggleThumbSelect}
      />
      <div className="hero-image-container">
        <button
          className={`scroll-hero-left ${!leftBtn ? 'btn-hidden' : ''}`}
          type="button"
          onClick={toggleHeroLeft}
        >
          <AiOutlineDoubleRight size="2em" />
        </button>
        { heroImage.url
          ? <img className="hero-image" src={heroImage.url} alt="product hero" />
          : null }
        <button
          className="expand-hero"
          type="button"
        >
          <AiOutlineExpand size="1.5em" />
        </button>
        <button
          className={`scroll-hero-right ${!rightBtn ? 'btn-hidden' : ''}`}
          type="button"
          onClick={toggleHeroRight}
        >
          <AiOutlineDoubleRight size="2em" />
        </button>
      </div>
    </div>
  );
}
