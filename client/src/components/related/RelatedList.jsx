import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import RelatedProduct from './RelatedProduct.jsx';

export default function RelatedList({ end, relatedList }) {

  const ref = useRef(null);

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  return (
    <div className="carousel-outside">
      {/* <img src="" alt="left-scroll" /> */}
      <button onClick={() => scroll(-15 * 16)}>Left</button>
      <div className="carousel-inside" ref={ref}>
        {relatedList.map((product, index) =>
          <RelatedProduct key={product.id} product={product} />
        )}
      </div>
      <button onClick={() => scroll(15 * 16)}>Right</button>
      {/* <img src="" alt="right-scroll" /> */}
    </div>
  );
}