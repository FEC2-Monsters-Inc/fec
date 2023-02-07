/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Overview from './Overview/Overview.jsx';
import Questions from './Questions/Questions.jsx';
import Ratings from './Ratings/Ratings.jsx';
import Related from './Related/Related.jsx';
import fetcher from '../fetchers';

export default function App() {
  // PRE-FETCH EMPTY INITIAL VALUE //
  const initFeature = { id: 40355, name: null };

  // STATE DATA //
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
        setRelatedIdList(new Set(data[4].data));
      }))
      .catch((err) => console.error(err));
  }, [featureProduct.id]);

  const recordClick = (e, widget) => {
    let { target } = e;
    let className = target.classList.value;
    while (!className.length) {
      target = e.target.closest('div');
      className = target.classList.value;
    }
    const interaction = {
      element: className,
      widget,
      time: new Date(Date.now()).toUTCString(),
    };
    console.log(interaction);
    fetcher.postInteraction(interaction);
  };

  // const recordClick = createContext(handleClick);

  if (!featureProduct.name) return <div />;
  return (
    <div>
      {/* <Overview
        product={featureProduct}
        styles={styles}
        reviews={reviews}
        recordClick={recordClick}
      /> */}
      {/* <Related
        feature={featureProduct}
        relatedIdList={relatedIdList}
        setFeatureProduct={setFeatureProduct}
        recordClick={recordClick}
      /> */}
      {/* <Questions
        featureProduct={featureProduct}
        recordClick={recordClick}
      /> */}
      <Ratings
        feature={featureProduct}
        reviews={reviews}
        setReviews={setReviews}
        reviewMeta={reviewMeta}
        setReviewMeta={setReviewMeta}
        recordClick={recordClick}
      />
    </div>
  );
}
