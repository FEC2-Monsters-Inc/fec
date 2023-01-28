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

  // INITIALIZATION //
  useEffect(() => {
    fetcher.getProductById(40344)
      .then((result) => setFeaturedProduct(result.data))
      .catch((err) => console.error('initial fetch: ', err));
  }, []);

  return (
    <div>
      <Overview feature={featuredProduct} />
      <Related feature={featuredProduct} />
      <Questions feature={featuredProduct} />
      <Ratings feature={featuredProduct} />
    </div>
  );
}
