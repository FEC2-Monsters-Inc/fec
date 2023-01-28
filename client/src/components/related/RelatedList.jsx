import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import RelatedProduct from './RelatedProduct.jsx';

export default function RelatedList({ end, relatedList }) {

  const ref = useRef(null);
  const [posIndex, setPosIndex] = useState(0);

  const scrollLeft = () => {
    posIndex > 0 ? setPosIndex(posIndex - 1) : null;
    ref.current.scrollLeft -= 15 * 16;
  };

  const scrollRight = () => {
    posIndex < end ? setPosIndex(posIndex + 1) : null;
    ref.current.scrollLeft += 15 * 16;
  };

  return (
    <div className="carousel-outside">
      {/* <img src="" alt="left-scroll" /> */}
      {posIndex === 0 ? null : <button onClick={scrollLeft}>Left</button>}
      <div className="carousel-inside" ref={ref}>
        {relatedList.map((product, index) =>
          <RelatedProduct key={product.id} product={product} />
        )}
      </div>
      {posIndex === end ? null : <button onClick={scrollRight}>Right</button>}
      {/* <img src="" alt="right-scroll" /> */}
    </div>
  );
}