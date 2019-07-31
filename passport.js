const passport = require('passport');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { JWT_SECRET } = require('./config');

const User = require('./api/models/user');

passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: '759916410484-q2m7kcn0rti27v44srvmjllg72trcing.apps.googleusercontent.com',
    clientSecret: 'Yl69cBEv9Bmfo1rmUBHC_ZxS'
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            const existinguser = await User.findOne({ 'googleId': profile.id });
            if (existinguser) {
                done(null, existinguser, { message: 'Already Exist' });
            }
            else {
                let Admin = false;
                if (profile.emails[0].value === 'myyaks0786@gmail.com') {
                    Admin = true;
                }
                const newUser = new User({
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id,
                    isAdmin: Admin
                });
                await newUser.save();
                done(null, newUser, { message: 'Successfully Loggedin' });
            }
        } catch (error) {
            done(error, false, error.message);
        }
    }));

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        const isExist = await User.findOne({ _id: payload.sub });
        if (isExist) {
            done(null, isExist);
        }
        else {
            done(null, false);
        }
    }
    catch (error) {
        done(error, false, { message: 'user not authenticated' });
    }
})
);