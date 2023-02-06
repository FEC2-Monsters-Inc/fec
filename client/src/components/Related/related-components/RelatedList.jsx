import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineLeftSquare, AiOutlineRightSquare } from 'react-icons/ai';
import RelatedProduct from './RelatedProduct.jsx';
import fetcher from '../../../fetchers';
import './styles/relatedList.css';

export default function RelatedList({ feature, relatedInfoList, setFeatureProduct }) {
  const ref = useRef(null);
  const [posIndex, setPosIndex] = useState(0);
  const [featureMeta, setFeatureMeta] = useState(0);

  const endOfRelatedList = relatedInfoList.length ? relatedInfoList.length - 4 : 0;

  const scrollLeft = () => {
    if (posIndex > 0) {
      setPosIndex(posIndex - 1);
    }
    ref.current.scrollLeft -= 15 * 16;
  };

  const scrollRight = () => {
    if (posIndex < endOfRelatedList) {
      setPosIndex(posIndex + 1);
    }
    ref.current.scrollLeft += 15 * 16;
  };

  useEffect(() => {
    fetcher.getReviewMeta(feature.id)
      .then(({ data }) => setFeatureMeta(data))
      .catch((err) => console.error(err));
  }, [feature.id]);

  return (
    <div className="related-carousel-outside">
      <AiOutlineLeftSquare
        className="related-carousel-rel-scrollBtn"
        style={{ opacity: posIndex === 0 ? 0 : 1 }}
        onClick={scrollLeft}
        title="related-left-arrow" // For testing
      />
      <div className="related-carousel-inside" ref={ref}>
        {relatedInfoList.map((relProd) => (
          <RelatedProduct
            key={relProd.id}
            feature={feature}
            featureMeta={featureMeta}
            setFeatureProduct={setFeatureProduct}
            relProd={relProd}
          />
        ))}
      </div>
      <AiOutlineRightSquare
        className="related-carousel-rel-scrollBtn"
        style={{ opacity: posIndex === endOfRelatedList ? 0 : 1 }}
        onClick={scrollRight}
        title="related-right-arrow" // For testing
      />
    </div>
  );
}
