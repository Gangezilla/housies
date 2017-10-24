const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('./config/log');
const helmet = require('helmet');
const routes = require('./routes.js');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
require('dotenv-safe').load();

const app = express();
const PORT = process.env.PORT || 3000;

// Express only serves static assets in production
// if (process.env.NODE_ENV === 'production') {
app.use(express.static('build'));
// }

app.use(session({
  secret: process.env.PASSPORT_SECRET,
  resave: true,
  saveUninitialized: true,
}));

require('./src/controllers/passport')(passport);

app.use(helmet());
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json({
  limit: '5mb',
}));


app.use(passport.initialize());
app.use(passport.session());

logger.info('App has been initialised.');

app.use('/', routes);

app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`);
});
