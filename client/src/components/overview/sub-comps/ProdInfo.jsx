import React, { useState, useEffect } from 'react';
import StarRating from '../../../helpers/star-rating/StarRating.jsx';

export default function ProdInfo({ product, currStyle }) {
  // STATE DATA //
  const [price, setPrice] = useState(null);

  // INITIALIZATION //
  useEffect(() => {
    if (currStyle) {
      if (currStyle.sale_price) {
        setPrice(currStyle.sale_price.slice(0, currStyle.sale_price.length - 3));
      } else {
        setPrice(currStyle.original_price.slice(0, currStyle.original_price.length - 3));
      }
    }
  }, [currStyle]);

  return (
    <div id="prod-info">
      <div className="reviews-stars">
        <h3 className="stars">
          <StarRating ratingPercentage="60%" className="star-icons" />
          {/* Star Rating will need dynamically rendered review data. Using dummy data for now. */}
        </h3>
        <a className="gray-text reviews-link" href="#reviews-widget">Read all reviews</a>
      </div>
      { product
        ? (
          <>
            <h3 className="gray-text category">{product.category}</h3>
            <h1 className="prod-title">{product.name}</h1>
          </>
        )
        : null }
      { price
        ? (
          <h3 className="gray-text prod-price">
            $
            {price}
          </h3>
        )
        : null}
    </div>
  );
}
