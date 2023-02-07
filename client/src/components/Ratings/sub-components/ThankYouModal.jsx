import React, { useState } from 'react';
import ReactDOM from 'react-dom';

export default function ThankYouModal({ showThankyou, setShowThankyou }) {
  // const [showPopup, setShowPopup] = useState(false);

  setTimeout(() => {
    setShowThankyou(false);
  }, 2000);

  return ReactDOM.createPortal((
    <div>
      {showThankyou && (
      <div className="thank-you-review-modal">
        <div className="thank-you-review-modal">
          <div className="thank-you-text">Thank you for your review!</div>
        </div>
      </div>
      )}
    </div>), document.getElementById('modal'));
}
