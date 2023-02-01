import React, { useState, useEffect } from 'react';
import axios from 'axios';
import fetcher from '../../fetchers';
import RelatedList from './related-components/RelatedList.jsx';

export default function Related({ feature, getRelatedList }) {
  const [relatedList, setRelatedList] = useState([]);

  useEffect(() => {
    if (feature.id) {
      fetcher.related.getRelatedProduct(feature.id)
        .then(({ data }) => {
          if (!data.length) {
            throw new Error('No Related Product!');
          }
          return Promise.all(data.map((id) => fetcher.getProductById(id)));
        })
        .then((results) => setRelatedList(results.map((result) => result.data)))
        .catch((err) => console.log(err));
    }
  }, [feature]);

  return (
    <div id="related-widget">
      <RelatedList feature={feature} end={relatedList.length - 5} relatedList={relatedList} />
    </div>
  );
}
