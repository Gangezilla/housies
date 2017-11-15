const checkIfHomeExists = 'SELECT * FROM Homes WHERE homeid = $1;';

const newReview = `
  INSERT INTO Reviews
    (reviewId, rating, title, description, homeId, memberId, tips)
  VALUES ($1, $2, $3, $4, $5, $6, $7);
  `;

const getAllReviews = `
SELECT * FROM Reviews 
  INNER JOIN Members
  ON Reviews.memberId = Members.id
WHERE homeid = $1;`;

const newHome = `
    INSERT INTO Homes
      (displayaddress, homeid, latitude, longitude, hasreview)
    VALUES ($1, $2, $3, $4, true)
    ON CONFLICT (homeid) DO NOTHING;    
  `;

module.exports = {
  checkIfHomeExists,
  newReview,
  getAllReviews,
  newHome,
};

// SELECT * FROM Reviews
// housies::DATABASE-> INNER JOIN Members
// housies::DATABASE->

// housies::DATABASE-> ON Reviews.memberId = Members.id;
