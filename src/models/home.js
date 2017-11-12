const pg = require('pg');
const { Pool } = require('pg');
const handleError = require('../helpers/handle-error');

const checkIfHomeExists = homeId => ({
  name: 'Check if home exists',
  text: 'SELECT * FROM Homes WHERE homeid = $1',
  values: [homeId],
});

const newReview = (reviewId, rating, title, description, homeId, displayName, tips) => ({
  name: 'Post new review of home',
  text: `
  INSERT INTO Reviews
  (reviewId, rating, title, description, homeId, displayName, tips)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  `,
  values: [reviewId, rating, title, description, homeId, displayName, tips],
});

const getAllReviews = homeId => ({
  name: 'Get all reviews of home',
  text: 'SELECT * FROM Reviews WHERE homeid = $1;',
  values: [homeId],
});

const checkIfHomeHasReviews = (homeId, success) => {
  console.log('checking...');
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
  // const pool = new Pool();

  // pool.query(checkIfHomeExists(homeId))
  //   .then(res => success(res.rows))
  //   .catch(e => handleError((e.stack)));
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

const getReviews = (homeId, success) => {
  const client = new pg.Client(process.env.DATABASE_URL);
  client.connect();
  client.query(getAllReviews(homeId));
};

module.exports = {
  checkIfHomeHasReviews,
  postNewReview,
  getReviews,
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
