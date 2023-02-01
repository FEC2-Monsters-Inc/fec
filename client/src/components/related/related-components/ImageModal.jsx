import React from 'react';
import './styles/imageModal.css';

export default function ImageModal({
  relStyle, setRelStyle, relProd, setShowImg,
}) {
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
            /* eslint-disable
               react/no-array-index-key,
               jsx-a11y/no-noninteractive-tabindex,
               jsx-a11y/no-noninteractive-element-interactions */
            <img
              key={`img${index}`}
              className="img-modal"
              src={relStyle.photos[index].thumbnail_url}
              alt={relProd.description}
              tabIndex={0}
              onKeyDown={(e) => handlePhotoChange(e, index)}
              onClick={(e) => handlePhotoChange(e, index)}
            />
            /* eslint-enable */
          ))}
        </div>
      </div>
    </div>
  );
}
