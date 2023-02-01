/* eslint-disable no-unused-expressions */
import React, { useState, useRef } from 'react';
import { AiOutlineLeftSquare, AiOutlineRightSquare } from 'react-icons/ai';
import RelatedProduct from './RelatedProduct.jsx';
import './styles/relatedList.css';

export default function RelatedList({ feature, relatedList }) {
  const ref = useRef(null);
  const [posIndex, setPosIndex] = useState(0);

  const endOfRelatedList = relatedList.length ? relatedList.length - 5 : 0;

  const scrollLeft = () => {
    posIndex > 0 ? setPosIndex(posIndex - 1) : null;
    ref.current.scrollLeft -= 15 * 16;
  };

  const scrollRight = () => {
    posIndex < endOfRelatedList ? setPosIndex(posIndex + 1) : null;
    ref.current.scrollLeft += 15 * 16;
  };

  return (
    <div className="related-carousel-outside">
      <AiOutlineLeftSquare
        className="related-carousel-rel-scrollBtn"
        style={{ opacity: posIndex === 0 ? 0 : 1 }}
        onClick={scrollLeft}
      />
      <div className="related-carousel-inside" ref={ref}>
        {relatedList.map((relProd) => (
          <RelatedProduct
            key={relProd.id}
            feature={feature}
            relProd={relProd}
          />
        ))}
      </div>
      <AiOutlineRightSquare
        className="related-carousel-rel-scrollBtn"
        style={{ opacity: posIndex === endOfRelatedList ? 0 : 1 }}
        onClick={scrollRight}
      />
    </div>
  );
}
