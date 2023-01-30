import React, { useState, useEffect } from 'react';

export default function StyleSelect({ styles }) {
  // STATE DATA //
  const [currStyle, setCurrStyle] = useState({ name: '' });
  const [styleThumbs, setStyleThumbs] = useState([]);
  const [skus, setSkus] = useState({});
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(null);

  // HELPER FUNCTIONS //
  const thumbRenderer = () => styleThumbs.map((pic) => <img className="style-thumbnail" src={pic.url} key={pic.key} alt="style thumbnail" />);

  const sizeOptionRenderer = () => {
    const items = Object.values(skus);
    return items.map((item) => <option value={item.size} key={item.size}>{item.size}</option>);
  };

  const quantityRenderer = () => {

  };

  // INITIALIZATION //
  useEffect(() => {
    if (styles) {
      const prod = styles.results;
      setCurrStyle(prod[0]);
      setSkus(prod[0].skus);
      setStyleThumbs(prod.map((style) => ({
        url: style.photos[0].thumbnail_url,
        key: style.style_id,
      })));
    }
  }, [styles]);

  return (
    <>
      <div id="style-select">
        <h3 className="style-pointer">
          STYLE &gt;
          {' '}
          <span className="selected-style">{currStyle.name}</span>
        </h3>
        <div className="thumbs-container">
          {thumbRenderer()}
        </div>
      </div>
      <div id="add-to-cart">
        <select className="size-selector">
          <option value="null">SELECT SIZE</option>
          {sizeOptionRenderer()}
        </select>
        <select className="quantity-selector">
          <option value="null">1</option>
          {quantityRenderer()}
        </select>
        <button className="add-to-cart-btn" type="submit">ADD TO BAG</button>
      </div>
    </>
  );
}
