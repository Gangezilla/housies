const handleError = require('../helpers/handle-error');
const db = require('../db');
const { retrieveUser, signUpNewUser } = require('../queries/user');

const retrieveUserProfile = (userId, success) => {
  db.query(retrieveUser, [userId], (err, res) => {
    if (err) {
      handleError(err.stack);
    } else {
      success(res.rows);
    }
  });
};

const signup = (profile, success) => {
  const { id, email, locale, firstName, lastName, profilePic } = profile;
  db.query(signUpNewUser, [id, email, locale, firstName, lastName, profilePic], (err, res) => {
    if (err) {
      handleError(err.stack);
    } else {
      success(res.rows);
    }
  });
};

module.exports = {
  signup,
  retrieveUserProfile,
};
