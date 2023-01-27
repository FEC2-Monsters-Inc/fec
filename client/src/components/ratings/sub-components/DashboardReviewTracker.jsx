import React, {useState, useEffect} from 'react';
import TrackerBar from './TrackerBar.jsx';

export default function ReviewTracker({reviews}) {

  const [percentages, setPercentages] = useState({});

  const getRatingPercentages = function () {
    let ratingTotals = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    };
    for (let review of reviews) {
      ratingTotals[review.rating]++;
    }
    let total = reviews.length;
    setPercentages({
      1: ratingTotals[1] / total * 100,
      2: ratingTotals[2] / total * 100,
      3: ratingTotals[3] / total * 100,
      4: ratingTotals[4] / total * 100,
      5: ratingTotals[5] / total * 100
    });
  };

  useEffect(() => {
    getRatingPercentages();
  }, [reviews]);

  return (
    <div>
      <div className="review-tracker-bar-container">
        <p className='rvw-txt'>5 stars</p><TrackerBar progress={percentages[5]}/>
      </div>
      <div className="review-tracker-bar-container">
        <p className='rvw-txt'>4 stars</p><TrackerBar progress={percentages[4]}/>
      </div>
      <div className="review-tracker-bar-container">
        <p className='rvw-txt'>3 stars</p><TrackerBar progress={percentages[3]}/>
      </div>
      <div className="review-tracker-bar-container">
        <p className='rvw-txt'>2 stars</p><TrackerBar progress={percentages[2]}/>
      </div>
      <div className="review-tracker-bar-container">
        <p className='rvw-txt'>1 stars</p><TrackerBar progress={percentages[1]}/>
      </div>
    </div>
  );
}


