const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: true, // Allow all origins for now, or specify frontend URL
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', require('./modules/auth/auth.routes'));
app.use('/api/users', require('./modules/users/users.routes'));
app.use('/api/investors', require('./modules/investors/investor.routes'));
app.use('/api/members', require('./modules/members/member.routes'));
app.use('/api/contact', require('./modules/contact/contact.routes'));
app.use('/api/subscriptions', require('./modules/subscriptions/subscription.routes'));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handling
app.use(errorMiddleware);

module.exports = app;
