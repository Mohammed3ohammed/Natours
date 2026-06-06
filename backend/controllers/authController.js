const jwt = require('jsonwebtoken');

const signToken = id => {
    return jwt.sign({ id }, procces.env.JWT_SECRET, {
        expiresIn: procces.env.JWT_EXPIRES_IN
    });
};