// IMPORT LIBRARY
import React, { useState, useEffect, useRef } from 'react';

// IMPORT COMPONENTS AND STYLE
import RelatedProduct from './RelatedProduct.jsx';
import { AiOutlineLeftSquare, AiOutlineRightSquare } from 'react-icons/ai';
import './styles/relatedList.css';

export default function RelatedList({ feature, end, relatedList }) {

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
      <AiOutlineLeftSquare className="carousel-rel-scrollBtn"
        style={{ opacity: posIndex === 0 ? 0 : 1 }} onClick={scrollLeft} />
      <div className="carousel-inside" ref={ref}>
        {relatedList.map((relProd, index) =>
          <RelatedProduct key={relProd.id} feature={feature} relProd={relProd} />
        )}
      </div>
      <AiOutlineRightSquare className="carousel-rel-scrollBtn"
        style={{ opacity: posIndex === end ? 0 : 1 }} onClick={scrollRight} />
    </div>
  );
}