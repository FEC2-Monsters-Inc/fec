/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import fetcher from '../../fetchers';
import RelatedList from './related-components/RelatedList.jsx';
import OutfitList from './outfit-components/OutfitList.jsx';

export default function Related({ feature }) {
  const [relatedList, setRelatedList] = useState([]);
  const [outfitIdList, setOutfitIdList] = useState([]);

  useEffect(() => {
    const data = window.localStorage.getItem('Outfit-List');
    if (data) { setOutfitIdList(JSON.parse(data)); }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('Outfit-List', JSON.stringify(outfitIdList));
  }, [outfitIdList]);

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
