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
    //Fetch the data
  db.list({include_docs:true}, function(err,data){
    if(!err){
      //Check if user exist
      data.rows.forEach(function(doc){
        if(doc.id === req.body.email){
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
  console.log("Pwd " + req.body.password + " Email " + req.body.email );

  //Insert new user in the DB
  db.insert({ _id: req.body.email, password: req.body.password, email: req.body.email }, function(err, data) {
    callback(err, data);
  });
}

/* GET sensor data */
var realtimedata = function(req, res, next) {
  var db = cloudant.db.use("test");
  //Fetch the data
	db.list({include_docs:true}, function(err,data){
		if(!err){
      //Send the data
			res.send(data);
		}
	});
}

/* GET sensor info */
var sensordetails = function(req, res, next) {
  var db = cloudant.db.use("mobile_app");
  //Fetch the data
	db.list({include_docs:true}, function(err,data){
		if(!err){
        //Send the data
			res.send(data);
		}
	});
}

module.exports.createUser = createUser;
module.exports.checkExistingUser = checkExistingUser;
module.exports.getUserInfo = getUserInfo;
module.exports.realtimedata = realtimedata;
module.exports.sensordetails = sensordetails;
