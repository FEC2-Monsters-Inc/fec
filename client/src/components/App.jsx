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

  // // STATE DATA //
  // const [featuredProduct, setFeaturedProduct] = useState(initProd);

  // // INITIALIZATION //
  // useEffect(() => {
  //   fetcher.getProductById(40350)
  //     .then((result) => setFeaturedProduct(result.data))
  //     .catch((err) => console.error('initial fetch: ', err));
  // }, []);

  const [featuredProduct, setFeaturedProduct] = useState(initProd);
  const [styles, setStyles] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [reviewMeta, setReviewMeta] = useState(null);

  // INITIALIZATION //
  useEffect(() => {
    axios.all([
      fetcher.getProductById(40350),
      fetcher.overview.getStylesById(40350),
      fetcher.ratings.getReviews(40350),
      fetcher.ratings.getReviewMeta(40350),
    ])
      .then(axios.spread((...data) => {
        setFeaturedProduct(data[0].data);
        setStyles(data[1].data);
        setReviews(data[2].data.results);
        setReviewMeta(data[3].data);
      }))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      HELLO
      {/* <Overview feature={featuredProduct} /> */}
      <Related feature={featuredProduct} />
      {/* <Questions feature={featuredProduct} /> */}
      {/* <Ratings feature={featuredProduct} /> */}
    </div>
  );
}
