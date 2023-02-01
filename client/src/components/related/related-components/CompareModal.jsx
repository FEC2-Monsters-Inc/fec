/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import './styles/compareModal.css';

export default function CompareModal({
  setShowModal, featureMeta, relProdMeta,
}) {
  if (featureMeta && relProdMeta) {
    const feaChars = Object.keys(featureMeta.characteristics);
    const relChars = Object.keys(relProdMeta.characteristics);
    const allChars = Array.from(new Set(feaChars.concat(relChars)));

    return (
      <div className="compare-modal">
        <AiOutlineClose className="compare-close" onClick={() => setShowModal(false)} />
        <tbody id="compare-tbody">
          {allChars.map((char, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr className="compare-tr" key={index}>
              <td className="compare-th">
                {featureMeta.characteristics[char]
                  ? Math.floor(Number(featureMeta.characteristics[char].value)) : ''}
              </td>
              <td className="compare-th">{char}</td>
              <td className="compare-th">
                {relProdMeta.characteristics[char]
                  ? Math.floor(Number(relProdMeta.characteristics[char].value)) : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </div>
    );
  }
}
