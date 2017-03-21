
var passport = require('passport');
var config = require('../config');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var Users = require('../controllers/database');
var LocalStrategy = require('passport-local');

//Options for Strategies
var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey:config.secret
};

var localOptions = { usernameField: 'email'};

//Strategy to verify email ID and password while signin
var localLogin = new LocalStrategy(localOptions, function(email, password, done){
  console.log('inside local Strategy');

//Check if user's email ID and password are matching
  Users.getUserInfo(email,function(err,user){
    if(err){
      return done(err);
    }
    else {
      if(user){
        if(user.password == password)
          return done(null,user);
        else
         return done(null,false);
      }else{
        return done(null,false);
      }
    }
  });
});

//Strategy to verify authorization
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  //Get user information to create a token and check if he is authorized
   Users.getUserInfo(payload.sub,function(err,user){
    if(err){
      return done(null,false);
    }
    else {
      if(user){
        return done(null,user);
      }else{
        return done(null,false);
      }
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
