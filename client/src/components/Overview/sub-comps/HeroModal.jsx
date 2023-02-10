import React, { useEffect } from 'react';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import ReactDOM from 'react-dom';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

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
  toggleHero,
}) {
  // STATE DATA //
  let zoom = false;

  // HELPER FUNCTIONS //
  const selectClassHandler = () => {
    const currSelect = document.getElementsByClassName('selected')[0];
    const target = currSelect.childNodes[0].id;
    const id = target.slice(0, target.length - 1);
    return Number(id);
  };

  const imgClickHandler = (event) => {
    toggleThumbSelect(event);
    toggleHero(event);
  };

  const imageMapper = (img, index, id) => (
    <div className={index === id ? 'selected-modal-thumb' : 'modal-thumb'} key={img.key}>
      <img
        id={`${index}b`}
        src={img.url}
        alt="a thumbnail"
        onClick={(e) => imgClickHandler(e)}
      />
    </div>
  );

  // EVENT HANDLERS //
  const close = () => {
    setHeroModal(false);
  };

  const handleZoom = (event) => {
    const img = event.target;
    if (zoom) {
      img.classList = 'zoom-in';
      img.style.transformOrigin = 'center';
      img.style.transform = 'scale(1)';
      zoom = false;
      return;
    }
    img.className = 'zoomed';
    img.style.transform = 'scale(2.5)';
    zoom = true;
  };

  // INITIALIZATION //
  useEffect(() => {
    if (heroModal) {
      document.body.style.overflow = 'hidden';
      selectClassHandler();
    } else document.body.style.overflow = 'visible';
  }, [heroModal]);

  if (!heroModal) return null;
  return ReactDOM.createPortal((
    <div id="hero-modal">
      <div id="hero-modal-content">
        <button className="close-hero-modal" type="button" onClick={close}>X</button>
        <div className="hero-modal-thumbs">
          {images.map((image, index) => imageMapper(image, index, selectClassHandler()))}
        </div>
        <div className="modal-bottom">
          <div
            className="hero-modal-image-container"
          >
            <TransformWrapper
              defaultScale={1}
              defaultPositionX={100}
              defaultPositionY={200}
            >
              <TransformComponent>
                <img
                  id="hero-modal-image"
                  src={heroImage.url}
                  alt="product hero"
                  onClick={handleZoom}
                  className="zoom-in"
                />
              </TransformComponent>
            </TransformWrapper>
          </div>
          <div className="modal-btns">
            <button
              className={`modal-left scroll-hero-left ${!leftBtn ? 'btn-hidden' : ''}`}
              type="button"
              onClick={toggleHeroLeft}
            >
              <AiOutlineDoubleRight size="2em" />
            </button>
            <button
              className={`modal-right scroll-hero-right ${!rightBtn ? 'btn-hidden' : ''}`}
              type="button"
              onClick={toggleHeroRight}
            >
              <AiOutlineDoubleRight size="2em" />
            </button>
          </div>
        </div>
      </div>
    </div>), document.getElementById('modal'));
}
