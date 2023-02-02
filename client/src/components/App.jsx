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

  const [featuredProduct, setFeaturedProduct] = useState(initProd);
  const [styles, setStyles] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [reviewMeta, setReviewMeta] = useState(null);
  const [relatedIdList, setRelatedIdList] = useState(null);

  // INITIALIZATION //
  useEffect(() => {
    axios.all([
      fetcher.getProductById(feature.id),
      fetcher.getProductStyle(feature.id),
      fetcher.getReviews(feature.id),
      fetcher.getReviewMeta(feature.id),
      fetcher.getRelatedProduct(feature.id),
    ])
      .then(axios.spread((...data) => {
        setFeature(data[0].data);
        setStyles(data[1].data);
        setReviews(data[2].data.results);
        setReviewMeta(data[3].data);
        setRelatedIdList(data[4].data);
      }))
      .catch((err) => console.error(err));
  }, [feature.id]);

  if (!feature.name) return <div />;

  return (
    <div>
      <Overview product={feature} styles={styles} />
      <Related feature={feature} relatedIdList={relatedIdList} />
      <Questions feature={feature} />
      <Ratings
        feature={feature}
        reviews={reviews}
        setReviews={setReviews}
        reviewMeta={reviewMeta}
        setReviewMeta={setReviewMeta}
      />
    </div>
  );
}
