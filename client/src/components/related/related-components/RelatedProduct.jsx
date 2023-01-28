import React, { useState, useEffect } from 'react';
import fetcher from '../../../fetchers';
import CompareModal from './CompareModal.jsx';
import { AiOutlineStar } from 'react-icons/ai';

export default function RelatedProduct({ start, last, feature, relProd }) {

  const [image, setImage] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showImg, setShowImg] = useState(false);

  useEffect(() => {
    fetcher.related.getProductStyle(relProd.id)
      .then(({ data }) => setImage(data.results[0]))
      .catch(err => console.log(err));
  }, [feature]);

  // TODO: FIX NO IMAGE LATER
  if (!image || !image.photos[0].thumbnail_url) {
    return <div></div>;
  }

  return (
    <div>
      <div className="rel-item">
        <AiOutlineStar className="star-modal" onClick={() => setShowModal(true)} />
        <img id="rel-img" src={image.photos[0].thumbnail_url} alt={relProd.description}
          onMouseEnter={() => setShowImg(true)} onMouseLeave={() => setShowImg(false)} />
        {showImg && <img id="rel-ori-img" src={image.photos[0].url} alt={relProd.description} />}
        <div className="rel-cat">{relProd.category}</div>
        <div className="rel-name">{relProd.name}</div>
        <div className="rel-slogan">{relProd.slogan}</div>
        {image.sale_price && <div className="rel-sale-price">{'$' + image.sale_price}</div>}
        <div className="rel-orig-price">{'$' + image.original_price}</div>
      </div>
      {showModal &&
        (<div className="overlay">
          <div className="modal-container">
            <CompareModal setShowModal={setShowModal} feature={feature} relProd={relProd} />
          </div>
        </div>)
      }
    </div>
  );
}