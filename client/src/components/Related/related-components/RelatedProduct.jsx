import React, { useState, useEffect } from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import axios from 'axios';
import fetcher from '../../../fetchers';
import CompareModal from './CompareModal.jsx';
import StarRating from '../../shared/StarRating/StarRating.jsx';
import ImageModal from './ImageModal.jsx';
import './styles/compareModal.css';

export default function RelatedProduct({ feature, featureMeta, relProd }) {
  const [relStyle, setRelStyle] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const [relProdMeta, setRelProdMeta] = useState(0);

  useEffect(() => {
    axios.all([
      fetcher.getProductStyle(relProd.id),
      fetcher.getReviewMeta(relProd.id),
    ])
      .then(axios.spread((...data) => {
        console.log(data);
        setRelStyle(data[0].data.results[0]);
        setRelProdMeta(data[1].data);
      }))
      .catch((err) => console.error(err));
  }, [feature, relProd.id]);

  if (!relStyle || !relStyle.photos[0].thumbnail_url) {
    return <div />;
  }

  let actualPts = 0;
  let totalPts = 0;
  const metaKeyArray = Object.keys(relProdMeta.ratings);
  for (let i = 0; i < metaKeyArray.length; i += 1) {
    actualPts += Number(metaKeyArray[i]) * Number(relProdMeta.ratings[metaKeyArray[i]]);
    totalPts += 5 * Number(relProdMeta.ratings[metaKeyArray[i]]);
  }
  const ratingPercentage = Math.floor((actualPts / totalPts) * 100).toString();

  return (
    <div>
      <div className="rel-item">
        <AiOutlineStar className="star-modal" onClick={() => setShowModal(true)} />
        <div id="rel-img-wrapper">
          <img
            id="rel-img"
            src={relStyle.photos[0].thumbnail_url}
            alt={relProd.description}
            onMouseEnter={() => setShowImg(true)}
          />
        </div>
        HELLO
        {showImg
          && (
            <ImageModal
              relStyle={relStyle}
              relProd={relProd}
              setRelStyle={setRelStyle}
              setShowImg={setShowImg}
            />
          )}
        <div className="rel-category">{relProd.category}</div>
        <div className="rel-name">{relProd.name}</div>
        <div className="rel-slogan">{relProd.slogan}</div>
        {relStyle.sale_price && <div className="rel-sale-price">{`${relStyle.sale_price}`}</div>}
        <div className="rel-orig-price">{`$${relStyle.original_price}`}</div>
        <StarRating ratingPercentage={`${ratingPercentage}%`} />
      </div>
      {showModal
        && (
          <div className="overlay">
            <div className="modal-container">
              <table id="compare-thead">
                <thead>
                  <tr className="compare-tr">
                    <th className="compare-th">{feature.name}</th>
                    {// Empty th for style
                      // eslint-disable-next-line jsx-a11y/control-has-associated-label
                      <th className="compare-th" />
                    }
                    <th className="compare-th">{relProd.name}</th>
                  </tr>
                </thead>
              </table>
              <CompareModal
                setShowModal={setShowModal}
                feature={feature}
                relProd={relProd}
                featureMeta={featureMeta}
                relProdMeta={relProdMeta}
              />
            </div>
          </div>
        )}
    </div>
  );
}
