import React, { useState, useEffect } from 'react';
import fetcher from '../../fetchers';
import './overview.css';

///// SUB-COMPONENETS /////
import Search from './sub-comps/Search.jsx';
import Gallery from './sub-comps/Gallery.jsx';
import ProdInfo from './sub-comps/ProdInfo.jsx';
import StyleSelect from './sub-comps/StyleSelect.jsx';
import AddCart from './sub-comps/AddCart.jsx';
import Description from './sub-comps/Description.jsx';


export default function Overview({
  feature,
  setFeature
}) {

  ///// STATE DATA /////
  const [prodStyle, setStyle] = useState({});
  const [description, setDisplay] = useState(true);


  ///// INITIALIZATION /////
  useEffect(() => {
    fetcher.overview.getStylesById(40344)
      .then(result => setStyle(result.data))
      .catch(err => console.log('err initial styles fetch: ', err));
  }, []);

  return (
    <>
      <div id="header">
        <h1 className="temp-logo">FEC Project</h1>
        <Search />
      </div>
      <div id="overview">
        <Gallery />
        <ProdInfo />
        <StyleSelect />
        <AddCart />
        { description
          ? <Description />
          : null}
      </div>
    </>
  );
}