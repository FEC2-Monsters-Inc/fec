/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import Overview from './overview/Overview.jsx';
import Questions from './questions/Questions.jsx';
import Ratings from './ratings/Ratings.jsx';
import Related from './related/Related.jsx';
import fetcher from '../fetchers';

export default function App() {
  // PRE-FETCH EMPTY INITIAL VALUE //
  const initProd = {
    id: 0,
    campus: '',
    name: '',
    slogan: '',
    description: '',
    category: '',
    default_price: '',
    created_at: '',
    updated_at: '',
    features: [],
  };

  // STATE DATA //
  const [featuredProduct, setFeaturedProduct] = useState(initProd);
  const [styles, setStyles] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [reviewMeta, setReviewMeta] = useState(null);

  // INITIALIZATION //
  useEffect(() => {
    fetcher.getProductById(40350)
      .then(({ data }) => setFeaturedProduct(data))
      .catch((err) => console.error('initial product fetch: ', err));

    fetcher.overview.getStylesById(40350)
      .then(({ data }) => setStyles(data))
      .catch((err) => console.error('initial style fetch: ', err));

    fetcher.ratings.getReviews(40350)
      .then(({ data }) => setReviews(data.results))
      .catch((err) => console.error('initial reviews fetch: ', err));

    fetcher.ratings.getReviewMeta(40350)
      .then(({ data }) => setReviewMeta(data))
      .catch((err) => console.error('initial review meta fetch: ', err));
  }, []);

  return (
    <div>
      <Overview product={featuredProduct} styles={styles} />
      {/* <Related feature={featuredProduct} />
      <Questions feature={featuredProduct} />
      <Ratings
        feature={featuredProduct}
        reviews={reviews}
        setReviews={setReviews}
        reviewMeta={reviewMeta}
        setReviewMeta={setReviewMeta}
      /> */}
    </div>
  );
}
