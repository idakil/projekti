const GoogleStrategy = require('passport-google-oauth2').Strategy;
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });    passport.deserializeUser((user, done) => {
        done(null, user);
    });    passport.use(new GoogleStrategy({
            clientID: '1023100294613-1eudk5g4dnrnsfc5tsfmvhcmgee25du5.apps.googleusercontent.com',
            clientSecret: 'BpDkRaS43trPOs3bAzS0QsFJ' ,
            callbackURL: 'http://localhost:3000/auth/google/callback'
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};