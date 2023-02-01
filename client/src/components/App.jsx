/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { actions } from '../reduxStore/index';
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

  // // REDUX
  // const feature = useSelector((state) => state.feature);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   fetcher.getProductById(40350)
  //     .then((result) => dispatch(actions.setFeature(result.data)))
  //     .catch((err) => console.error('initial fetch: ', err));
  // }, []);

  // // STATE DATA //
  // const [featuredProduct, setFeaturedProduct] = useState(initProd);

  // // INITIALIZATION //
  // useEffect(() => {
  //   fetcher.getProductById(40350)
  //     .then((result) => setFeaturedProduct(result.data))
  //     .catch((err) => console.error('initial fetch: ', err));
  // }, []);

  // console.log(feature);
  // if (!feature) {
  //   return (
  //     <div>
  //       HELLO
  //     </div>
  //   );
  // }
  const [featuredProduct, setFeaturedProduct] = useState(initProd);
  const [styles, setStyles] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [reviewMeta, setReviewMeta] = useState(null);
  console.time();
  // INITIALIZATION //
  useEffect(() => {
    // fetcher.getProductById(40350)
    //   .then(({ data }) => {
    //     setFeaturedProduct(data);
    //   })
    //   .catch((err) => console.error('initial product fetch: ', err));

    // fetcher.overview.getStylesById(40350)
    //   .then(({ data }) => {
    //     setStyles(data);
    //   })
    //   .catch((err) => console.error('initial style fetch: ', err));

    // fetcher.ratings.getReviews(40350)
    //   .then(({ data }) => {
    //     setReviews(data.results);
    //   })
    //   .catch((err) => console.error('initial reviews fetch: ', err));

    // fetcher.ratings.getReviewMeta(40350)
    //   .then(({ data }) => {
    //     setReviewMeta(data);
    //   })
    //   .then(() => console.timeEnd())
    //   .catch((err) => console.error('initial review meta fetch: ', err));

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
      .then(() => console.timeEnd())
      .catch((err) => console.error(err));

    console.log('USEEFFECT IS CALLED');
  }, []);
  console.log(featuredProduct, styles, reviews, reviewMeta);
  console.log('5');
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
