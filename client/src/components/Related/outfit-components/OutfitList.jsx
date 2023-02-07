/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef } from 'react';
import { AiOutlineLeftSquare, AiOutlineRightSquare } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import OutfitProduct from './OutfitProduct.jsx';
import './styles/outfitList.css';

export default function OutfitList({
  feature, setFeatureProduct, outfitIdList, setOutfitIdList,
}) {
  // CAROUSEL COMPONENT
  const ref = useRef(null);
  const [posIndex, setPosIndex] = useState(0);

  // CHECK HOW MANY CLICKS NEED TO REACH END OF THE LAST RELATED IMAGE
  const endOfOutfit = outfitIdList.length !== undefined ? outfitIdList.length - 4 : 0;

  const scrollLeft = () => {
    if (posIndex > 0) {
      setPosIndex(posIndex - 1);
    }
    ref.current.scrollLeft -= 15 * 16;
  };

  const scrollRight = () => {
    if (posIndex < endOfOutfit) {
      setPosIndex(posIndex + 1);
    }
    ref.current.scrollLeft += 15 * 16;
  };

  // ADD FEATURE PRODUCT TO OUTFIT LIST
  const addOutfit = () => {
    if (!outfitIdList.includes(feature.id)) {
      setOutfitIdList([...outfitIdList, feature.id]);
    }
  };

  // SET UP DRAG DROP FUNCTION
  const handleOnDragEnd = (result) => {
    // IF DROPPED OUTSIDE THE LIST
    if (!result.destination) {
      return;
    }

    const newList = [...outfitIdList];

    [
      newList[result.source.index],
      newList[result.destination.index],
    ] = [newList[result.destination.index], newList[result.source.index]];

    setOutfitIdList(newList);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="outfit-carousel-outside">
        <AiOutlineLeftSquare
          className="outfit-carousel-rel-scrollBtn"
          style={{ opacity: posIndex === 0 ? 0 : 1 }}
          onClick={scrollLeft}
        />
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <div className="outfit-carousel-inside" ref={ref}>
                {outfitIdList.length !== 0
                  ? outfitIdList.map((outfitId, index) => (
                    <Draggable key={outfitId} draggableId={outfitId.toString()} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <OutfitProduct
                            key={outfitId}
                            outfitId={outfitId}
                            outfitIdList={outfitIdList}
                            setOutfitIdList={setOutfitIdList}
                            setFeatureProduct={setFeatureProduct}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                  : null}
                <GrAdd className="outfit-add" onClick={addOutfit} title="outfit-add-icon" />
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <AiOutlineRightSquare
          className="outfit-carousel-rel-scrollBtn"
          style={{ opacity: posIndex === endOfOutfit || 0 ? 0 : 1 }}
          onClick={scrollRight}
        />
      </div>
    </DragDropContext>
  );
}
