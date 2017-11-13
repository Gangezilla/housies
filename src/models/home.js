const handleError = require('../helpers/handle-error');
const db = require('../db');
const { checkIfHomeExists, newReview, getAllReviews, newHome } = require('../queries/home');

const checkIfHomeHasReviews = (home, success) => {
  db.query(checkIfHomeExists, [home.id], (err, res) => {
    if (err) {
      handleError(err.stack);
    } else {
      success(res.rows);
    }
  });
};

const postNewReview = (review, home, success) => {
  const { reviewId, rating, title, description, memberId, tips } = review;
  const homeId = home.id;
  db.query(newReview, [reviewId, rating, title, description, homeId, memberId, tips], (err, res) => {
    if (err) {
      handleError(err.stack);
    } else {
      const { displayAddress, id, latLng } = home;
      const { lat, lng } = latLng;
      db.query(newHome, [displayAddress, id, lat, lng], (error) => {
        if (error) {
          handleError(error.stack);
        }
      });
      success(res.rows);
    }
  });
};

const getReviews = (homeId, success) => {
  db.query(getAllReviews, [homeId], (err, res) => {
    if (err) {
      handleError(err.stack);
    } else {
      success(res.rows);
    }
  });
};

module.exports = {
  checkIfHomeHasReviews,
  postNewReview,
  getReviews,
};
