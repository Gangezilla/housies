const { checkIfHomeHasReviews, postNewReview, getReviews } = require('../models/home');
const shortid = require('shortid');

const searchForHome = (req, res) => {
  // so we have an id, we poll our database, and return reviews if it exists, otherwise nothing.
  checkIfHomeHasReviews(req.body, (home) => {
    if (home.length > 0) {
      getReviews(req.body.id, (reviews) => {
        res.status(200).send({
          reviewCount: reviews.length,
          reviews,
        });
      });
    } else {
      res.send({
        reviewCount: 0,
        reviews: [],
      });
    }
  });
};

const handleReviewSubmission = (req, res) => {
  if (!req.user) { // eslint-disable-line no-negated-condition
    res.status(401).send();
  } else {
    const { rating, title, description, homeId, tips } = req.body.values;
    const home = req.body.home;
    if (rating || title || description) {
      const reviewId = shortid.generate();
      const review = {
        reviewId,
        rating,
        title,
        description,
        homeId,
        tips,
        memberId: req.user.id,
      };
      postNewReview(review, home, () => {
        res.sendStatus(200);
      });
    } else {
      res.sendStatus(500);
    }
  }
};

module.exports = {
  searchForHome,
  handleReviewSubmission,
  // getFeed,
  // getHomesInSuburb,
};

// getFeed will show a feed of houses in an area or recently posted reviews.
// getHomesInSuburb will do a map view and then plot houses on it. 

// const getFeed = () => {

// };

// const getHomesInSuburb = () => {

// };
