import React, {useState, useEffect} from 'react';
import TrackerBar from './TrackerBar.jsx';

export function ReviewTracker({reviews, setSelectedRating, selectedRating}) {

  const [percentages, setPercentages] = useState({});
  const [numReviews, setNumReviews] = useState({});

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
    setNumReviews(ratingTotals);
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

  const toggleRating = (num) => {
    var ratingsComp = []
    for (var i = 0; i < reviews.length; i++) {
      ratingsComp.push(reviews[i].rating)
    }
    var ratingsSet = Array.from(new Set(ratingsComp))
    if (ratingsSet.includes(num)) {
      setSelectedRating({
        ...selectedRating,
        [num]: !selectedRating[num],
      });
    };
  }

  return (
    <div className ="test-test-test">{console.log(reviews)}
      <div className="review-hover">
        <div className="review-tracker-bar-container" onClick={() => toggleRating(5)}>
          <p className='rvw-txt'>5 stars</p>
          <TrackerBar progress={percentages[5]}/>
          <p className='rvw-txt'>{numReviews[5] ? numReviews[5] : null}</p>
        </div>
      </div>
      <div className="review-hover">
        <div className="review-tracker-bar-container" onClick={()=>toggleRating(4)}>
          <p className='rvw-txt'>4 stars</p>
          <TrackerBar progress={percentages[4]}/>
          <p className='rvw-txt'>{numReviews[4] ? numReviews[4] : null}</p>
        </div>
      </div>
      <div className="review-hover">
        <div className="review-tracker-bar-container" onClick={()=>toggleRating(3)}>
          <p className='rvw-txt'>3 stars</p>
          <TrackerBar progress={percentages[3]}/>
          <p className='rvw-txt'>{numReviews[3] ? numReviews[3] : null}</p>
        </div>
      </div>
      <div className="review-hover">
        <div className="review-tracker-bar-container" onClick={()=>toggleRating(2)}>
          <p className='rvw-txt'>2 stars</p>
          <TrackerBar progress={percentages[2]}/>
          <p className='rvw-txt'>{numReviews[2] ? numReviews[2] : null}</p>
        </div>
      </div>
      <div className="review-hover">
        <div className="review-tracker-bar-container" onClick={()=>toggleRating(1)}>
          <p className='rvw-txt'>1 stars</p>
          <TrackerBar progress={percentages[1]}/>
          <p className='rvw-txt'>{numReviews[1] ? numReviews[1] : null}</p>
        </div>
      </div>
    </div>
  );
}


