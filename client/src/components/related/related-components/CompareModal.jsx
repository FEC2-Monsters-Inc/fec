import React, { useState, useEffect } from 'react';
import fetcher from '../../../fetchers';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';
import './styles/compareModal.css';

export default function CompareModal({ setShowModal, feature, featureMeta, relProd, relProdMeta }) {

  if (featureMeta && relProdMeta) {

    const feaChars = Object.keys(featureMeta.characteristics);
    const relChars = Object.keys(relProdMeta.characteristics);
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
                <td>{featureMeta.characteristics[char] ?
                  Math.floor(Number(featureMeta.characteristics[char].value)) : ''}</td>
                <td>{char}</td>
                <td>{relProdMeta.characteristics[char] ?
                  Math.floor(Number(relProdMeta.characteristics[char].value)) : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}