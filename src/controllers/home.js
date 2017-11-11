const { checkIfHomeHasReviews, postNewReview } = require('../models/home');
const shortid = require('shortid');

const searchForHome = (req, res) => {
  // so we have an id, we poll our database, and return reviews if it exists, otherwise nothing.
  checkIfHomeHasReviews(req.body.id, (home) => {

    if (home.rows > 0) {
      // we know someone has reviewed the home, so we can now grab the reviews.
    } else {
      res.send({
        reviewCount: 0,
        reviews: [],
      });
      // nobody has reviewed, invite user to be the first.
    }
  });
};

const handleReviewSubmission = (req, res) => {
  if (!req.user) { // eslint-disable-line no-negated-condition
    res.status(401).send();
  } else {
    const { rating, title, description, homeId, tips } = req.body;
    if (rating || title || description) {
      const reviewId = shortid.generate();
      const review = {
        reviewId,
        rating,
        title,
        description,
        homeId,
        tips,
        displayName: req.user.displayName,
      };
      postNewReview(review, () => {
        res.status(200).send({
          success: true,
        });
      });
    // check that we have SOMETHING to post in the review.
    }
  }
};

const retrieveHomeReviews = (req, res) => {

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
