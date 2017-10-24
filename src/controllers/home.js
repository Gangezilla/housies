const { checkIfHomeHasReviews } = require('../models/home');

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

const postReview = () => {

};

module.exports = {
  searchForHome,
  postReview,
  // getFeed,
  // getHomesInSuburb,
};

// getFeed will show a feed of houses in an area or recently posted reviews.
// getHomesInSuburb will do a map view and then plot houses on it. 

// const getFeed = () => {

// };

// const getHomesInSuburb = () => {

// };
