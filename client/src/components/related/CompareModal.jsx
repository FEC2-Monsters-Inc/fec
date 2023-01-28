import React, { useState, useEffect } from 'react';
import fetcher from '../../../fetchers';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';
import './styles/compareModal.css';

export default function CompareModal({ setShowModal, feature, relProd }) {
  const [featureStyle, setFeatureStyle] = useState(0);
  const [relProdStyle, setRelProdStyle] = useState(0);

  useEffect(() => {
    axios.all([
      fetcher.related.getReviewMeta(feature.id),
      fetcher.related.getReviewMeta(relProd.id)
    ])
      .then(axios.spread((...data) => {
        setFeatureStyle(data[0].data);
        setRelProdStyle(data[1].data);
      }))
      .catch(err => console.log(err));
  }, []);

  if (featureStyle && relProdStyle) {
    console.log(featureStyle, relProdStyle);
    console.log(feature, relProd);
    const feaChars = Object.keys(featureStyle.characteristics);
    const relChars = Object.keys(relProdStyle.characteristics);
    const allChars = new Set(feaChars.concat(relChars));

    return (
      <div>
        <AiOutlineClose onClick={() => setShowModal(false)} />
        <table>
          <tbody>
            <tr>
              <th>{feature.name}</th>
              <th></th>
              <th>{relProd.name}</th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}