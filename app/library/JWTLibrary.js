const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig.js');

module.exports = {
    createToken: function (data) {
        return jwt.sign(data, jwtConfig.secret, { expiresIn: jwtConfig.ttl });
    },

    verifyToken: function (token) {
        return jwt.verify(token, jwtConfig.secret);
    }

}


