var Cloudant = require('cloudant');
//Check DB error
var cloudant = Cloudant({account:"sachet", password:"Foris", function(err,cloudant){
  if(err){
    console.log('Init Failed!');
    return next(err);
  }
}
});

//Check if user exist in the DB
var checkExistingUser = function(req, res, callback) {
  var db = cloudant.db.use("usersdb");
  db.list({include_docs:true}, function(err,data){
    if(!err){
      data.rows.forEach(function(doc){
        if(doc.id === req.body.emailID){
          err = 'Email is in use';
        }
      });
      callback(err);
    }
  });
}

//Get information about the user
var getUserInfo = function(payloadID, callback) {
  var db = cloudant.db.use("usersdb");
  db.get(payloadID, function(err, data) {
    callback(err,data);
  });
}

//Create a new user
var createUser = function(req, res, callback) {
  var db = cloudant.db.use("usersdb");
  console.log("Pwd " + req.body.password + " Email " + req.body.emailID );
  db.insert({ _id: req.body.emailID, password: req.body.password, email: req.body.emailID }, function(err, data) {
    callback(err, data);
  });
}
module.exports.createUser = createUser;
module.exports.checkExistingUser = checkExistingUser;
module.exports.getUserInfo = getUserInfo;
