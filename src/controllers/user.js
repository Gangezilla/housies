const { retrieveUserProfile } = require('../models/user');

const getUserProfile = (req, res) => {
  retrieveUserProfile(req.params.username, (profile) => {
    if (profile[0]) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(profile[0]));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
        error: "That user doesn't exist in our database.",
      }));
    }
  });
};

module.exports = {
  getUserProfile,
};
