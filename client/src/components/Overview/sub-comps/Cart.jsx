import React, { useState, useEffect } from 'react';
import { AiOutlineStar, AiOutlinePlus } from 'react-icons/ai';
import axios from 'axios';
import Share from './Share.jsx';
import fetcher from '../../../fetchers';

export default function Cart({
  showSku, setShowSku, currStyle, quantity, setQuantity,
}) {
  // STATE DATA //

  // EVENT HANDLERS //
  const handleSizeSelect = (event) => {
    setShowSku(event.target.value);
  };

  const handleClick = () => {
    if (showSku) {
      [...Array(Number(quantity)).keys()].forEach(() => {
        fetcher.addToCart(showSku)
          .then(() => { })
          .catch((err) => console.error(err));
      });
    }
  };

  return (
    <div id="add-to-cart">
      <select
        className="cart-border size-selector"
        value={showSku}
        onChange={(e) => handleSizeSelect(e)}
      >
        <option value="" key="nullSize">SELECT SIZE</option>
        {currStyle
          ? Object.keys(currStyle.skus)
            .filter((sku) => currStyle.skus[sku].quantity > 0)
            .map((sku) => (
              <option
                value={sku}
                key={`${currStyle.skus[sku].size}${sku}`}
              >
                {currStyle.skus[sku].size}
              </option>
            ))
          : null}
      </select>
      <select
        className="cart-border quantity-selector"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      >
        <option value="" key="nullQuantity">-</option>
        {currStyle && Object.keys(currStyle.skus).includes(showSku)
          ? [...Array(currStyle.skus[showSku].quantity > 15
            ? 15 : currStyle.skus[showSku].quantity).keys()]
            .map((num) => (
              <option value={num + 1} key={`${showSku}${num}`}>
                {`${num + 1}`}
              </option>
            ))
          : null}
      </select>
      <button
        className="cart-border add-to-cart-btn"
        type="button"
        onClick={handleClick}
      >
        ADD TO BAG
        {' '}
        <AiOutlinePlus />
      </button>
      <button
        className="cart-border star-cart-btn"
        type="button"
      >
        <AiOutlineStar size="1.5em" />
      </button>
      <Share />
    </div>
  );
}
