import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdRemoveCircleOutline } from 'react-icons/md';
import fetcher from '../../../fetchers';
import StarRating from '../../shared/StarRating/StarRating.jsx';
import imgUnavailable from '../assets/imgUnavailable.png';

export default function OutfitProduct({
  outfitId, outfitIdList, setOutfitIdList, setFeatureProduct, index,
}) {
  const [outfitProd, setOutfitProd] = useState();
  const [outfitStyle, setOutfitStyle] = useState();
  const [outfitMeta, setOutfitMeta] = useState();

  const handleDelete = () => {
    setOutfitIdList([...outfitIdList].filter((id) => id !== outfitId));
  };

  useEffect(() => {
    axios.all([
      fetcher.getProductStyle(outfitId),
      fetcher.getProductById(outfitId),
      fetcher.getReviewMeta(outfitId),
    ])
      .then(axios.spread((...data) => {
        setOutfitStyle(data[0].data.results[0]);
        setOutfitProd(data[1].data);
        setOutfitMeta(data[2].data);
      }))
      .catch((err) => console.error(err));
  }, [outfitId]);

  if (!outfitStyle) {
    return <div />;
  }

  let actualPts = 0;
  let totalPts = 0;
  const metaKeyArray = Object.keys(outfitMeta.ratings);
  for (let i = 0; i < metaKeyArray.length; i += 1) {
    actualPts += Number(metaKeyArray[i]) * Number(outfitMeta.ratings[metaKeyArray[i]]);
    totalPts += 5 * Number(outfitMeta.ratings[metaKeyArray[i]]);
  }
  const ratingPercentage = Math.floor((actualPts / totalPts) * 100).toString();

  return (
    <div id={`outfitProduct${index}`}>
      <div className="outfit-item">
        <div id="outfit-img-wrapper">
          <MdRemoveCircleOutline
            className="outfit-delete-icon"
            onClick={handleDelete}
            title="outfit-delete-icon"
          />
          {// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <img
              id="outfit-img"
              src={outfitStyle.photos[0].thumbnail_url || imgUnavailable}
              alt={outfitProd.description}
              onKeyDown={() => setFeatureProduct(outfitProd)}
              onClick={() => setFeatureProduct(outfitProd)}
            />
          }
        </div>
        <div className="outfit-category rel-text">{outfitProd.category}</div>
        <div className="outfit-name rel-text">{outfitProd.name}</div>
        <div className="outfit-slogan rel-text">{outfitProd.slogan}</div>
        {outfitStyle.sale_price && <div className="outfit-sale-price rel-text">{`$${outfitStyle.sale_price}`}</div>}
        <div className="outfit-orig-price rel-text">{`$${outfitStyle.original_price}`}</div>
        <StarRating ratingPercentage={`${ratingPercentage}%`} />
      </div>
    </div>
  );
}
