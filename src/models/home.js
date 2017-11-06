const pg = require('pg');
const { Pool } = require('pg');
const handleError = require('../helpers/handle-error');

const checkIfHomeExists = homeId => ({
  name: 'Check if home exists',
  text: 'SELECT * FROM Homes WHERE homeid = $1',
  values: [homeId],
});

const newReview = (reviewId, rating, title, description, homeId, displayName) => ({
  name: 'Post new review of house',
  text: `
  INSERT INTO Reviews
  (reviewId, rating, title, description, homeId, displayName)
  VALUES ($1, $2, $3, $4, $5, $6)
  `,
  values: [reviewId, rating, title, description, homeId, displayName],
});

const checkIfHomeHasReviews = (homeId, success) => {
  const client = new pg.Client(process.env.DATABASE_URL);
  client.connect();
  client.query(checkIfHomeExists(homeId), (err, res) => {
    if (err) {
      client.end();
      handleError(err.stack);
    } else {
      client.end();
      success(res.rows);
    }
  });
};

const postNewReview = (review, success) => {
  const { reviewId, rating, title, description, homeId, displayName } = review;
  const client = new pg.Client(process.env.DATABASE_URL);
  client.connect();
  client.query(newReview(reviewId, rating, title, description, homeId, displayName), (err, res) => {
    if (err) {
      client.end();
      handleError(err.stack);
    } else {
      client.end();
      success(res.rows);
    }
  });
};

module.exports = {
  checkIfHomeHasReviews,
};

// const client = new pg.Client(process.env.DATABASE_URL);
// client.connect();
// client.query(retrieveUser(userId), (err, res) => {
//   if (err) {
//     client.end();
//     handleError(err.stack);
//   } else {
//     client.end();
//     success(res.rows);
//   }
// });
