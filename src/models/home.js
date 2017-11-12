const pg = require('pg');
const { Pool } = require('pg');
const handleError = require('../helpers/handle-error');

const checkIfHomeExists = homeId => ({
  name: 'Check if home exists',
  text: 'SELECT * FROM Homes WHERE homeid = $1;',
  values: [homeId],
});

const newReview = (reviewId, rating, title, description, homeId, memberId, tips) => ({
  name: 'Post new review of home',
  text: `
  INSERT INTO Reviews
  (reviewId, rating, title, description, homeId, memberId, tips)
  VALUES ($1, $2, $3, $4, $5, $6, $7);
  `,
  values: [reviewId, rating, title, description, homeId, memberId, tips],
});

const getAllReviews = homeId => ({
  name: 'Get all reviews of home',
  text: 'SELECT * FROM Reviews WHERE homeid = $1;',
  values: [homeId],
});

const newHome = (displayAddress, homeId, latitude, longitude) => ({
  name: 'Update Home DB with a new home when the first review is posted',
  text: `
    INSERT INTO Homes
    (displayaddress, homeid, latitude, longitude, hasreview)
    VALUES ($1, $2, $3, $4, true);
  `,
  values: [displayAddress, homeId, latitude, longitude],
});

const checkIfHomeHasReviews = (home, success) => {
  const client = new pg.Client(process.env.DATABASE_URL);
  client.connect();
  client.query(checkIfHomeExists(home.id), (err, res) => {
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

const postNewReview = (review, home, success) => {
  const { reviewId, rating, title, description, homeId, memberId } = review;
  const client = new pg.Client(process.env.DATABASE_URL);
  client.connect();
  client.query(newReview(reviewId, rating, title, description, homeId, memberId), (err, res) => {
    if (err) {
      client.end();
      handleError(err.stack);
    } else {
      client.query(newHome(
        home.displayAddress,
        home.id,
        home.latLng.lat,
        home.latLng.lng,
      ), (error, resp) => {
        if (error) {
          console.log('fucked', error.stack);
          handleError(error.stack);
        } else {
          console.log(' successsss', resp);
        }
      });
      client.end();
      success(res.rows);
    }
  });
};

const getReviews = (homeId, success) => {
  const client = new pg.Client(process.env.DATABASE_URL);
  client.connect();
  client.query(getAllReviews(homeId), (err, res) => {
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
