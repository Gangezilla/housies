const checkIfHomeExists = 'SELECT * FROM Homes WHERE homeid = $1;';

const newReview = `
  INSERT INTO Reviews
  (reviewId, rating, title, description, homeId, memberId, tips)
  VALUES ($1, $2, $3, $4, $5, $6, $7);
  `;

const getAllReviews = 'SELECT * FROM Reviews WHERE homeid = $1;';

const newHome = `
    INSERT INTO Homes
    (displayaddress, homeid, latitude, longitude, hasreview)
    VALUES ($1, $2, $3, $4, true);
  `;

module.exports = {
  checkIfHomeExists,
  newReview,
  getAllReviews,
  newHome,
};
