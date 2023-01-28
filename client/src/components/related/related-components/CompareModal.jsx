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

    const feaChars = Object.keys(featureStyle.characteristics);
    const relChars = Object.keys(relProdStyle.characteristics);
    const allChars = Array.from(new Set(feaChars.concat(relChars)));

    return (
      <div className="compare-modal">
        <AiOutlineClose className="compare-close" onClick={() => setShowModal(false)} />
        <table className="compare-table">
          <thead className="compare-thead">
            <tr className="compare-tr">
              <th className="compare-thead">{feature.name}</th>
              <th></th>
              <th>{relProd.name}</th>
            </tr>
          </thead>
          <tbody className="compare-tbody">
            {allChars.map((char, index) => (
              <tr key={index}>
                <td>{featureStyle.characteristics[char] ?
                  Math.floor(Number(featureStyle.characteristics[char].value)) : ''}</td>
                <td>{char}</td>
                <td>{relProdStyle.characteristics[char] ?
                  Math.floor(Number(relProdStyle.characteristics[char].value)) : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}