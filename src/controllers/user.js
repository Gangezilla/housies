const { retrieveUserProfile } = require('../models/user');

const getUserProfile = (req, res) => {
  retrieveUserProfile(req.params.username, (profile) => {
    res.setHeader('Content-Type', 'application/json');
    if (profile[0]) {
      res.send(JSON.stringify(profile[0]));
    } else {
      res.sendStatus(404);
    }
  });
};

module.exports = {
  getUserProfile,
};
