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
  const [heroImage, setHero] = useState({ url: null, index: 0 });
  const [images, setImages] = useState([]);
  const [rightBtn, setRightBtn] = useState(true);
  const [leftBtn, setLeftBtn] = useState(false);

  // HELPER FUNCTIONS //
  const btnRenderCheck = () => {
    const selected = document.getElementsByClassName('selected')[0];
    const prevSib = selected.previousSibling;
    const nextSib = selected.nextSibling;
    if (!prevSib) {
      setLeftBtn(false);
    } else {
      setLeftBtn(true);
    }
    if (!nextSib) {
      setRightBtn(false);
    } else {
      setRightBtn(true);
    }
  };

  // STATE CHANGE WATCHER //
  useEffect(() => {
    if (currStyle) {
      setImages(currStyle.photos.map((photo, index) => ({
        url: photo.url,
        key: index,
      })));
      if ((!rightBtn && !leftBtn) && currStyle.photos.length > 1) {
        setRightBtn(true);
      }
    }
  }, [currStyle]);

  // INITIALIZATION //
  useEffect(() => {
    if (styles) {
      const target = styles.results[0];
      setCurrStyle(target);
      setHero({
        url: target.photos[0].url,
        index: 0,
      });
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
          <Gallery
            product={product}
            heroImage={heroImage}
            setHero={setHero}
            images={images}
            rightBtn={rightBtn}
            leftBtn={leftBtn}
            currStyle={currStyle}
            btnRenderCheck={btnRenderCheck}
          />
        </div>
        <div className="right-main">
          <ProdInfo
            product={product}
            currStyle={currStyle}
            reviews={reviews}
          />
          <StyleSelect
            styles={styles}
            currStyle={currStyle}
            setCurrStyle={setCurrStyle}
            setHero={setHero}
            btnRenderCheck={btnRenderCheck}
            setLeftBtn={setLeftBtn}
            setRightBtn={setRightBtn}
          />
          <Cart
            currStyle={currStyle}
          />
        </div>
        <div className="bottom-main">
          <Description
            product={product}
          />
        </div>
      </div>
    </>
  );
}
