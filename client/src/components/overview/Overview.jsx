import React, { useState, useEffect } from 'react';
import './overview.css';

/// // SUB-COMPONENETS /////
import Search from './sub-comps/Search.jsx';
import Gallery from './sub-comps/Gallery.jsx';
import ProdInfo from './sub-comps/ProdInfo.jsx';
import StyleSelect from './sub-comps/StyleSelect.jsx';
import Cart from './sub-comps/Cart.jsx';
import Description from './sub-comps/Description.jsx';

export default function Overview({ product, styles, reviews }) {
  // STATE DATA //
  const [currStyle, setCurrStyle] = useState(null);

  // INITIALIZATION //
  useEffect(() => {
    if (styles) {
      setCurrStyle(styles.results[0]);
    }
  }, [styles]);

  return (
    <>
      <div id="header">
        <h1 className="temp-logo">FEC Project</h1>
        <Search />
      </div>
      <div id="overview">
        <div className="left-main">
          <Gallery product={product} currStyle={currStyle} />
        </div>
        <div className="right-main">
          <ProdInfo product={product} currStyle={currStyle} reviews={reviews} />
          <StyleSelect styles={styles} currStyle={currStyle} setCurrStyle={setCurrStyle} />
          <Cart currStyle={currStyle} />
        </div>
        <div className="bottom-main">
          <Description product={product} />
        </div>
      </div>
    </>
  );
}
