const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.alerts = (req, res, next) => {
    const { alert } = req.query;
    if (alert === 'booking') 
        res.locals.alert =
         "Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up here immediatly, please come back later.";
         next();
};

