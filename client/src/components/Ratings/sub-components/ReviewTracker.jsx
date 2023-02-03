import React, { useState, useEffect } from 'react';
import TrackerBar from './TrackerBar.jsx';

export default function ReviewTracker({
  reviews,
  setSelectedRating,
  filter,
  setFilter,
}) {
  // STATE DATA //
  const [percentages, setPercentages] = useState({});
  const [numReviews, setNumReviews] = useState({});

  // HELPER FUNCTIONS //
  const getRatingPercentages = () => {
    const ratingTotals = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    for (let i = 0; i < reviews.length; i += 1) {
      ratingTotals[reviews[i].rating] += 1;
    }
    const total = reviews.length;
    setNumReviews(ratingTotals);
    setPercentages({
      1: (ratingTotals[1] / total) * 100,
      2: (ratingTotals[2] / total) * 100,
      3: (ratingTotals[3] / total) * 100,
      4: (ratingTotals[4] / total) * 100,
      5: (ratingTotals[5] / total) * 100,
    });
  };

  // EVENT HANDLERS //
  const toggleRating = (num) => {
    let newSelect = {};
    newSelect = Object.assign(newSelect, filter);
    if (!newSelect[num]) {
      newSelect[num] = true;
      setFilter(newSelect);
      setSelectedRating(newSelect);
    } else {
      delete newSelect[num];
      if (!Object.keys(newSelect).length) {
        setFilter({});
        setSelectedRating(null);
      } else {
        setFilter(newSelect);
        setSelectedRating(newSelect);
      }
    }
  };

  // INITIALIZATION //
  useEffect(() => {
    if (reviews) {
      getRatingPercentages();
    }
  }, [reviews]);

  return (
    <div className="review-tracker-main">
      <div className="hover review-tracker-bar-container" onClick={() => toggleRating(5)}>
        <p className="rvw-txt">5 star</p>
        <TrackerBar progress={percentages[5]} />
        <p className="rvw-txt">{numReviews[5] ? numReviews[5] : null}</p>
      </div>
      <div className="hover review-tracker-bar-container" onClick={() => toggleRating(4)}>
        <p className="rvw-txt">4 star</p>
        <TrackerBar progress={percentages[4]} />
        <p className="rvw-txt">{numReviews[4] ? numReviews[4] : null}</p>
      </div>
      <div className="hover review-tracker-bar-container" onClick={() => toggleRating(3)}>
        <p className="rvw-txt">3 star</p>
        <TrackerBar progress={percentages[3]} />
        <p className="rvw-txt">{numReviews[3] ? numReviews[3] : null}</p>
      </div>
      <div className="hover review-tracker-bar-container" onClick={() => toggleRating(2)}>
        <p className="rvw-txt">2 star</p>
        <TrackerBar progress={percentages[2]} />
        <p className="rvw-txt">{numReviews[2] ? numReviews[2] : null}</p>
      </div>
      <div className="hover review-tracker-bar-container" onClick={() => toggleRating(1)}>
        <p className="rvw-txt">1 star</p>
        <TrackerBar progress={percentages[1]} />
        <p className="rvw-txt">{numReviews[1] ? numReviews[1] : null}</p>
      </div>
    </div>
  );
}
