const pg = require('pg');
const { Pool } = require('pg');
const handleError = require('../helpers/handle-error');

const retrieveUser = userID => ({
  name: 'Retrieve User',
  text: `SELECT * FROM Members
        WHERE id = $1;`,
  values: [userID],
});

const signUpNewUser = ({ id, email, locale, firstName, lastName, profilePic }) => ({
  name: 'sign up new user',
  text: `INSERT INTO Members(id, email, locale, firstName, lastName, profilePic)
    values($1, $2, $3, $4, $5, $6)`,
  values: [id, email, locale, firstName, lastName, profilePic],
});

const retrieveUserProfile = (userId, success) => {
  const client = new pg.Client(process.env.DATABASE_URL);
  client.connect();
  client.query(retrieveUser(userId), (err, res) => {
    if (err) {
      client.end();
      handleError(err.stack);
    } else {
      client.end();
      success(res.rows);
    }
  });
};

const signup = (profile, success) => {
  const client = new pg.Client(process.env.DATABASE_URL);
  client.connect();
  client.query(signUpNewUser(profile), (err, res) => {
    if (err) {
      console.log(err);
      client.end();
      handleError(err.stack);
    } else {
      client.end();
      success(res.rows);
    }
  });
};

module.exports = {
  signup,
  retrieveUserProfile,
};
