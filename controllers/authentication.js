
var Users = require('./database');
var config = require('../config');
var jwt = require('jwt-simple');

// Create a token
function tokenForUser(userID){
  var timeStamp = new Date().getTime();
  return jwt.encode({ sub:userID, iat:timeStamp }, config.secret);
}

//Signup
exports.signup = function(req,res,next) {
  //If email ID doesnt already exist, then create a new user.
  Users.checkExistingUser(req,res,function(err){
    if(err){
      console.log("Caller" + err);
      res.send(err);
    }
    else {
      Users.createUser(req, res, function(err, results) {
        if (err) {
          // throw err;
          console.log("Error message: " + err.description + ". Reason: " + err.reason);
          res.send({
            "status" : err.statusCode
          });
        } else {
          //Send back the token for further usage
          res.json({token : tokenForUser(results.id)});
        }
      });
    }
  });
}

//Signin
exports.signin = function(req,res,next){
  console.log('email id token' + req.user.email);
  //Send back the token for further usage
  res.send({ token: tokenForUser(req.user.email)});
}
