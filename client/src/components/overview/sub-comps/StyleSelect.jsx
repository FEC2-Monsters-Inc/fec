import React, { useEffect } from 'react';
import StyleThumbnails from './StyleThumbnails.jsx';

export default function StyleSelect({ styles, currStyle, setCurrStyle }) {
  // HELPER FUNCTIONS //
  const toggleCheck = (newCheckId) => {
    const oldCheckWrap = document.getElementById(currStyle.style_id).parentElement;
    oldCheckWrap.className = 'check-wrapper';
    const newCheckWrap = document.getElementById(newCheckId).parentElement;
    if (newCheckWrap) {
      newCheckWrap.className = 'checked';
    }
  };

  // EVENT HANDLERS //
  const toggleStyle = (event) => {
    const { id } = event.target;
    if (currStyle.style_id === Number(id)) {
      return;
    }
    toggleCheck(id);
    styles.results.forEach((style) => {
      if (style.style_id === Number(id)) {
        setCurrStyle(style);
      }
    });
  };

  // INITIALIZATION //
  useEffect(() => {
    if (currStyle) {
      toggleCheck(currStyle.style_id);
    }
  }, [currStyle]);

  return (
    <div id="style-select">
      <h3 className="style-pointer">
        STYLE &gt;
        {' '}
        { currStyle
          ? <span className="selected-style">{currStyle.name}</span>
          : null }
      </h3>
      <StyleThumbnails styles={styles} toggleStyle={toggleStyle} />
    </div>
  );
}
