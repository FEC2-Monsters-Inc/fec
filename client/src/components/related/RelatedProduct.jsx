import React, { useState, useEffect } from 'react';
import fetcher from '../../fetchers';
import CompareModal from './CompareModal.jsx';

export default function RelatedProduct({ start, last, product }) {

  const [image, setImage] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetcher.related.getProductStyle(product.id)
      .then(({ data }) => setImage(data.results[0]))
      .catch(err => console.log(err));
  }, []);

  // TODO: FIX NO IMAGE LATER
  if (!image || !image.photos[0].thumbnail_url) {
    return <div></div>;
  }
  console.log(start);
  return (
    <div>
      <div className="rel-item">
        {!showModal && <button onClick={() => setShowModal(true)}>ShowCompare</button>}
        <img id="rel-img" src={image.photos[0].thumbnail_url} alt={product.description} />
        <div className="rel-cat">{product.category}</div>
        <div className="rel-name">{product.name}</div>
        <div className="rel-slogan">{product.slogan}</div>
        {image.sale_price && <div className="rel-sale-price">{'$' + image.sale_price}</div>}
        <div className="rel-orig-price">{'$' + image.original_price}</div>
      </div>
      {showModal && <CompareModal setShowModal={setShowModal} />}
    </div>
  );
}