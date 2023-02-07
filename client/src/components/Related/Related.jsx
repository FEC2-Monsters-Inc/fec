/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import fetcher from '../../fetchers';
import RelatedList from './related-components/RelatedList.jsx';
import OutfitList from './outfit-components/OutfitList.jsx';

export default function Related({ feature, relatedIdList, setFeatureProduct }) {
  // RELATED PRODUCT w/ API CALL
  const [relatedInfoList, setRelatedInfoList] = React.useState([]);

  useEffect(() => {
    axios.all(
      Array.from(relatedIdList).map((id) => fetcher.getProductById(id)),
    )
      .then(axios.spread((...results) => {
        setRelatedInfoList(results.map((result) => result.data));
      }))
      .catch((err) => console.error(err));
  }, [relatedIdList]);

  // OUTFIT PRODUCT w/ LOCALSTORAGE
  const [outfitIdList, setOutfitIdList] = React.useState([]);

  useEffect(() => {
    const data = window.localStorage.getItem('Outfit-List');
    if (data) { setOutfitIdList(JSON.parse(data)); }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('Outfit-List', JSON.stringify(outfitIdList));
  }, [outfitIdList]);

  return (
    <div id="related-widget">
      <h2>RELATED PRODUCTS</h2>
      <br />
      <RelatedList
        feature={feature}
        relatedInfoList={relatedInfoList}
        setFeatureProduct={setFeatureProduct}
      />
      <br />
      <br />
      <h2>OUTFIT PRODUCTS</h2>
      <br />
      <OutfitList
        feature={feature}
        setFeatureProduct={setFeatureProduct}
        outfitIdList={outfitIdList}
        setOutfitIdList={setOutfitIdList}
      />
    </div>
  );
}
