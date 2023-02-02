import React, { useState, useEffect } from 'react';

export default function StyleSelect({ styles, currStyle, setCurrStyle }) {
  // STATE DATA //
  const [selectedStyle, setSelectedStyle] = useState({ name: '' });
  const [styleThumbs, setStyleThumbs] = useState([]);
  console.log(selectedStyle);

  // HELPER FUNCTIONS //
  const thumbRenderer = () => styleThumbs.map((pic) => (
    <img
      id={pic.key}
      className="style-thumbnail"
      src={pic.url}
      key={pic.key}
      alt="style thumbnail"
      onClick={(e) => toggleStyle(e)}
    />
  ));

  // EVENT HANDLERS //
  const toggleStyle = (event) => {
    const { id } = event.target;
    styles.results.forEach((style) => {
      if (style.style_id === Number(id)) {
        setCurrStyle(style);
        setSelectedStyle(style);
      }
    });
  };

  // INITIALIZATION //
  useEffect(() => {
    if (styles) {
      const prod = styles.results;
      setSelectedStyle(prod[0]);
      setStyleThumbs(prod.map((style) => ({
        url: style.photos[0].thumbnail_url,
        key: style.style_id,
      })));
    }
  }, [styles]);

  return (
    <div id="style-select">
      <h3 className="style-pointer">
        STYLE &gt;
        {' '}
        <span className="selected-style">{selectedStyle.name}</span>
      </h3>
      <div className="thumbs-container">
        {thumbRenderer()}
      </div>
    </div>
  );
}
