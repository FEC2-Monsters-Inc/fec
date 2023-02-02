/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Overview from './overview/Overview.jsx';
import Questions from './questions/Questions.jsx';
import Ratings from './ratings/Ratings.jsx';
import Related from './related/Related.jsx';
import fetcher from '../fetchers';

export default function App() {
  // PRE-FETCH EMPTY INITIAL VALUE //
  const initFeature = { id: 40350, name: null };

  // STATE
  const [featureProduct, setFeatureProduct] = useState(initFeature);
  const [styles, setStyles] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [reviewMeta, setReviewMeta] = useState(null);
  const [relatedIdList, setRelatedIdList] = useState(null);

  // INITIALIZATION //
  useEffect(() => {
    axios.all([
      fetcher.getProductById(featureProduct.id),
      fetcher.getProductStyle(featureProduct.id),
      fetcher.getReviews(featureProduct.id),
      fetcher.getReviewMeta(featureProduct.id),
      fetcher.getRelatedProduct(featureProduct.id),
    ])
      .then(axios.spread((...data) => {
        setFeatureProduct(data[0].data);
        setStyles(data[1].data);
        setReviews(data[2].data.results);
        setReviewMeta(data[3].data);
        setRelatedIdList(data[4].data);
      }))
      .catch((err) => console.error(err));
  }, [featureProduct.id]);

  if (!featureProduct.name) return <div />;

  return (
    <div>
      <Overview product={featureProduct} styles={styles} reviews={reviews} />
      <Related feature={featureProduct} relatedIdList={relatedIdList} />
      <Questions feature={featureProduct} />
      <Ratings
        feature={featureProduct}
        reviews={reviews}
        setReviews={setReviews}
        reviewMeta={reviewMeta}
        setReviewMeta={setReviewMeta}
      />
    </div>
  );
}
