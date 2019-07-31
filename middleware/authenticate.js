const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const authenticate = (req,res,next) => {

    const tokenVerify = JWT.verify(req.headers.authorization, JWT_SECRET);
    if(tokenVerify){
        next();
    }
    else{
        next(new Error('Token is not Valid'));
    }
    
}
module.exports = authenticate;