const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const User = require('../api/models/user');

const authenticate = async (req, res, next) => {

    const tokenVerify = JWT.verify(req.headers.authorization, JWT_SECRET);
    if (tokenVerify) {
        try {
            const user = await User.findById(tokenVerify.sub);
            req.user = user;
            next();
        }
        catch (error) {
            next(error);
        }

    }
    else {
        next(new Error('Token is not Valid'));
    }

}
module.exports = authenticate;