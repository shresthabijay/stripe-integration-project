const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const { developmentErrors, productionErrors, notFound, mongoseErrors } = require('./helpers/errorHandler')

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
}));

app.use('/stripe', require('./routes/stripe'));
app.use('/user', require('./routes/user'));
app.use('/hirer', require('./routes/hirer'));

app.use(mongoseErrors);
app.use(process.env.ENV === 'DEV' ? developmentErrors : productionErrors);
app.use(notFound);

module.exports = app;