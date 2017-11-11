const express = require('express');
const logger = require('./config/log');
const passport = require('passport');
const { getHome, handleReviewSubmission, searchForHome } = require('./src/controllers/home');

const router = express.Router();

router.get('/ping', (req, res) => {
  logger.debug('Server is responding.');
  logger.info(req.user);
  res.send('pong');
});

router.get('/auth/check/', (req, res) => {
  logger.info('user', req.user);
  if (req.user) {
    res.status(200).send(req.user);
  } else {
    res.sendStatus(204);
  }
});

router.get('/auth/facebook/', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    session: true,
    failureRedirect: '/auth/failure',
    successRedirect: '/auth/success',
    scope: ['email'],
  }),
);

router.get('/auth/success/', (req, res) => {
  logger.info(' auth scuess', req.user);
  res.status(200);
  res.send(req.user);
});

router.get('/auth/failure/', (req, res) => {
  logger.info('auth failure', req.user);
  res.status(401).send();
});

// individual page for a house.
// router.get('/home', getHome);
// // user searches for a house
router.post('/home/search', searchForHome);
// // route to post a new review.
router.post('/home/review', handleReviewSubmission);

// router for main home page, has feed of most recent reviews.
// router.get('/feed', getFeed);

// // route to get all homes in a suburb to show on a map.
// router.get('/area/:suburb', getHomesInSuburb);


module.exports = router;
