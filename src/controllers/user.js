const { retrieveUserProfile } = require('../models/user');

const getUserProfile = (req, res) => {
  retrieveUserProfile(req.params.username, (profile) => {
    res.setHeader('Content-Type', 'application/json');
    if (profile[0]) {
      res.send(JSON.stringify(profile[0]));
    } else {
      res.send(JSON.stringify({
        error: "That user doesn't exist in our database.",
      }));
    }
  });
};

module.exports = {
  getUserProfile,
};
