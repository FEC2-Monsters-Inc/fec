/* eslint-disable no-unused-expressions */
import React, { useState, useRef } from 'react';
import { AiOutlineLeftSquare, AiOutlineRightSquare } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';
import OutfitProduct from './OutfitProduct.jsx';
import './styles/outfitList.css';

export default function OutfitList({
  feature, setFeatureProduct, outfitIdList, setOutfitIdList,
}) {
  const ref = useRef(null);
  const [posIndex, setPosIndex] = useState(0);

  const endOfOutfit = outfitIdList.length !== undefined ? outfitIdList.length - 4 : 0;

  const scrollLeft = () => {
    posIndex > 0 ? setPosIndex(posIndex - 1) : null;
    ref.current.scrollLeft -= 15 * 16;
  };

  const scrollRight = () => {
    posIndex < endOfOutfit ? setPosIndex(posIndex + 1) : null;
    ref.current.scrollLeft += 15 * 16;
  };

  const addOutfit = () => {
    if (!outfitIdList.includes(feature.id)) {
      setOutfitIdList([...outfitIdList, feature.id]);
    }
  };

  return (
    <div className="outfit-carousel-outside">
      <AiOutlineLeftSquare
        className="outfit-carousel-rel-scrollBtn"
        style={{ opacity: posIndex === 0 ? 0 : 1 }}
        onClick={scrollLeft}
      />
      <div className="outfit-carousel-inside" ref={ref}>
        {outfitIdList.length !== 0
          ? outfitIdList.map((outfitId) => (
            <OutfitProduct
              key={outfitId}
              outfitId={outfitId}
              outfitIdList={outfitIdList}
              setOutfitIdList={setOutfitIdList}
              setFeatureProduct={setFeatureProduct}
            />
          ))
          : null}
        <GrAdd className="outfit-add" onClick={addOutfit} title="outfit-add-icon" />
      </div>
      <AiOutlineRightSquare
        className="outfit-carousel-rel-scrollBtn"
        style={{ opacity: posIndex === endOfOutfit || 0 ? 0 : 1 }}
        onClick={scrollRight}
      />
    </div>
  );
}
