import React, { useState, useEffect } from 'react';
import { AiOutlineStar, AiOutlinePlus } from 'react-icons/ai';
import Share from './Share.jsx';

export default function StyleSelect({ styles, currStyle, setCurrStyle }) {
  // STATE DATA //
  const [selectedStyle, setSelectedStyle] = useState({ name: '' });
  const [styleThumbs, setStyleThumbs] = useState([]);
  const [skus, setSkus] = useState({});
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(null);

  // HELPER FUNCTIONS //
  const thumbRenderer = () => styleThumbs.map((pic) => <img id={pic.key} className="style-thumbnail" src={pic.url} key={pic.key} alt="style thumbnail" onClick={(e) => toggleStyle(e)} />);

  const sizeOptionRenderer = () => {
    const items = Object.values(skus);
    return items.map((item) => <option value={item.size} key={item.size}>{item.size}</option>);
  };

  const quantityRenderer = () => {

  };

  // EVENT HANDLERS //
  const toggleStyle = (event) => {
    const { id } = event.target;
    styles.results.forEach((style) => {
      if (style.style_id === Number(id)) {
        setCurrStyle(style);
        setSelectedStyle(style);
      }
    });
  };

  // INITIALIZATION //
  useEffect(() => {
    if (styles) {
      const prod = styles.results;
      setSelectedStyle(prod[0]);
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
          <span className="selected-style">{selectedStyle.name}</span>
        </h3>
        <div className="thumbs-container">
          {thumbRenderer()}
        </div>
      </div>
      <div id="add-to-cart">
        <select className="cart-border size-selector">
          <option value="null">SELECT SIZE</option>
          {sizeOptionRenderer()}
        </select>
        <select className="cart-border quantity-selector">
          <option value="null">1</option>
          {quantityRenderer()}
        </select>
        <button className="cart-border add-to-cart-btn" type="submit">
          ADD TO BAG
          {' '}
          <AiOutlinePlus />
        </button>
        <button className="cart-border star-cart-btn" type="button"><AiOutlineStar size="1.5em" /></button>
        <Share />
      </div>
    </>
  );
}
