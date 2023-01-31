import React from 'react';
import './styles/imageModal.css';

export default function ImageModal({
  relStyle, setRelStyle, relProd, setShowImg,
}) {
  // console.log('IMAGE MODAL is RENDERING');

  const handlePhotoChange = (e, index) => {
    e.stopPropagation();
    const newStyle = {};
    Object.assign(newStyle, relStyle);
    [newStyle.photos[0], newStyle.photos[index]] = [newStyle.photos[index], newStyle.photos[0]];
    setRelStyle(newStyle);
  };

  return (
    <div className="img-modal-overlay">
      <div className="img-modal-container" onMouseLeave={() => setShowImg(false)}>
        <div className="img-carousel">
          {relStyle.photos.map((photo, index) => (
            // Set up onClick event on image
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <img
              // Avoid key Warning for dynamic rendering
              // eslint-disable-next-line react/no-array-index-key
              key={`img${index}`}
              className="img-modal"
              src={relStyle.photos[index].thumbnail_url}
              alt={relProd.description}
              onKeyDown={(e) => handlePhotoChange(e, index)}
              onClick={(e) => handlePhotoChange(e, index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
