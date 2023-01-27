import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import RelatedProduct from './RelatedProduct.jsx';

export default function RelatedList({ relatedList }) {

  const ref = useRef();

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  return (
    <div className="carousel-outside">
      {/* <img src="" alt="left-scroll" /> */}
      <button onClick={() => scroll(-20)}>Left</button>
      <div className="carousel-inside" ref={ref}>
        {relatedList.map(product => <RelatedProduct key={product.id} product={product} />)}
      </div>
      <button>Right</button>
      {/* <img src="" alt="right-scroll" /> */}
    </div>
  );
}