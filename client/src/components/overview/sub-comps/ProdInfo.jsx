import React from 'react';

export default function ProdInfo({ product }) {
  return (
    <div id="prod-info">
      <div className="reviews-stars">
        <h3 className="stars">STARS</h3>
        <a className="reviews-link" href="#reviews-widget">Read all reviews</a>
      </div>
      <h3 className="category">{product.category}</h3>
      <h1 className="prod-title">{product.name}</h1>
      <h3 className="prod-price">
        $
        {product.default_price}
      </h3>
    </div>
  );
}
