import React, { useState, useEffect } from 'react';

import Overview from './overview/Overview.jsx';
import QandA from './qanda/QandA.jsx';
import RandR from './randr/RandR.jsx';
import Related from './related/Related.jsx';
import fetcher from '../fetchers';

export default function App() {

  const [featuredProduct, setFeaturedProduct] = useState({
    id: 0,
    campus: '',
    name: '',
    slogan: '',
    description: '',
    category: '',
    default_price: '',
    created_at: '',
    updated_at: '',
    features: []
  });

  useEffect(() => {
    fetcher.getProductById(40344)
      .then(result => setFeaturedProduct(result.data))
      .catch(err => console.log('error initial fetch: ', err));
  }, []);

  return (
    <div>
      Hello World!
      <Overview feature={featuredProduct} />
      <Related feature={featuredProduct} />
      <QandA feature={featuredProduct} />
      <RandR feature={featuredProduct} />
    </div>
  );
}