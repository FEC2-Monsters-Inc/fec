import React, { useState, useEffect } from 'react';
import fetcher from '../../../fetchers';
import axios from 'axios';
import CompareModal from './CompareModal.jsx';
import { AiOutlineStar, AiTwotoneStar } from 'react-icons/ai';
import StarRating from './StarRating.jsx';

export default function RelatedProduct({ start, last, feature, relProd }) {

  const [image, setImage] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const [featureMeta, setFeatureMeta] = useState(0);
  const [relProdMeta, setRelProdMeta] = useState(0);

  useEffect(() => {
    axios.all([
      fetcher.related.getProductStyle(relProd.id),
      fetcher.related.getReviewMeta(feature.id),
      fetcher.related.getReviewMeta(relProd.id)
    ])
      .then(axios.spread((...data) => {
        setImage(data[0].data.results[0]);
        setFeatureMeta(data[1].data);
        setRelProdMeta(data[2].data);
      }))
      .catch(err => console.error(err));
  }, [feature]);

  // TODO: FIX NO IMAGE LATER
  if (!image || !image.photos[0].thumbnail_url) {
    return <div></div>;
  }

  let actualPts = 0;
  let totalPts = 0;
  for (var key in relProdMeta.ratings) {
    actualPts += Number(key) * Number(relProdMeta.ratings[key]);
    totalPts += 5 * Number(relProdMeta.ratings[key]);
  }
  const ratingPercentage = Math.floor(actualPts / totalPts * 100).toString();

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
        <StarRating ratingPercentage={`${ratingPercentage}%`}></StarRating>
      </div>
      {showModal &&
        (<div className="overlay">
          <div className="modal-container">
            <CompareModal setShowModal={setShowModal}
              feature={feature} relProd={relProd}
              featureMeta={featureMeta} relProdMeta={relProdMeta} />
          </div>
        </div>)
      }
    </div>
  );
}