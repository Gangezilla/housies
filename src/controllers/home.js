// const getFeed = () => {

// };

// const getHomesInSuburb = () => {

// };

const getAllReviews = id => ({
  name: 'Get all reviews of a home.',
  text: '',
  values: [id],
});


const postNewReview = () => ({
  name: 'Post new review of house',
  text: '',
  values: [],
});

const getHome = () => {

};

const postReview = () => {

};

module.exports = {
  getHome,
  postReview,
  // getFeed,
  // getHomesInSuburb,
};

// getFeed will show a feed of houses in an area or recently posted reviews.
// getHomesInSuburb will do a map view and then plot houses on it. 
