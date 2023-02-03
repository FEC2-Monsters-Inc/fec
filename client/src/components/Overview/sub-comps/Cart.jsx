import React, { useState, useEffect } from 'react';
import { AiOutlineStar, AiOutlinePlus } from 'react-icons/ai';
import Share from './Share.jsx';

export default function Cart({ currStyle }) {
  // STATE DATA //
  const [quantity, setQuantity] = useState(1);

  // HELPER FUNCTIONS //

  // EVENT HANDLERS //
  const handleSizeSelect = (event) => {
    console.log(event.target.value);
  };

  return (
    <div id="add-to-cart">
      <select className="cart-border size-selector" onChange={(e) => handleSizeSelect(e)}>
        <option value="null">SELECT SIZE</option>
        { currStyle
          ? Object.keys(currStyle.skus)
            .filter((sku) => currStyle.skus[sku].quantity > 0)
            .map((sku) => (
              <option
                value={currStyle.skus[sku].size}
                key={currStyle.skus[sku].size}
              >
                {currStyle.skus[sku].size}
              </option>
            ))
          : null }
      </select>
      <select className="cart-border quantity-selector" />
      <button className="cart-border add-to-cart-btn" type="submit">
        ADD TO BAG
        {' '}
        <AiOutlinePlus />
      </button>
      <button className="cart-border star-cart-btn" type="button"><AiOutlineStar size="1.5em" /></button>
      <Share />
    </div>
  );
}
