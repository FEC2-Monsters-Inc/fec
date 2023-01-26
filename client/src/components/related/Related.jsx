import React, { useState, useEffect } from 'react';
import fetcher from '../../fetchers';
import axios from 'axios';
import RelatedList from './RelatedList.jsx';

export default function Related({ feature, getRelatedList }) {
  const [relatedList, setRelatedList] = useState([]);

  useEffect(() => {
    fetcher.related.getRelatedProduct(`${feature.id}`)
      .then(({ data }) => {
        if (!data.length) {
          throw new Error('No Related Product!');
        }
        return Promise.all(data.map(id => fetcher.getProductById(id)));
      })
      .then(results => setRelatedList(results.map(result => result.data)))
      .catch(err => console.log(err));
  }, [feature]);

  return (
    <div>
      <RelatedList relatedList={relatedList} />
    </div>
  );
}