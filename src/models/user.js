const pg = require('pg');
const handleError = require('../helpers/handle-error');

const retrieveUser = username => ({
  name: 'Retrieve User',
  text: `SELECT * FROM Members
        WHERE LOWER(username) = LOWER($1);`,
  values: [username],
});

const signUpNewUser = ({ username, name, email, id }) => ({
  name: 'sign up new user',
  text: `INSERT INTO Members(username, name, email, id)
    values($1, $2, $3, $4)`,
  values: [username, name, email, id],
});

const retrieveUserProfile = (username, success) => {
  const client = new pg.Client(process.env.DATABASE_URL);
  client.connect();
  client.query(retrieveUser(username), (err, res) => {
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
