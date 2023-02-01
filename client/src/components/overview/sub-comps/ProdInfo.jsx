import React, { useState, useEffect } from 'react';
import StarRating from '../../../helpers/star-rating/StarRating.jsx';

export default function ProdInfo({ product, currStyle, reviews }) {
  // STATE DATA //
  const [price, setPrice] = useState(null);

  // HELPER FUNCTIONS //
  const starAverager = (reviewData) => {
    let total = 0;
    reviewData.forEach((review) => {
      total += review.rating;
    });
    total = (total / reviews.length).toFixed(1);
    return `${total * 20}%`;
  };

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
          { reviews
            ? <StarRating ratingPercentage={starAverager(reviews)} className="star-icons" />
            : null }
          {/* Star Rating will need dynamically rendered review data. Using dummy data for now. */}
        </h3>
        <a className="gray-text reviews-link" href="#ratings-widget">Read all reviews</a>
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
