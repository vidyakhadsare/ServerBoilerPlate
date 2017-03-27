const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
const SensorData = require('./controllers/database');

//Pasport Strategies
const requireAuth = passport.authenticate('jwt', {session:false});
const requireSignIn = passport.authenticate('local', {session:false});

//Route handling
module.exports = function(app){
  app.get('/',requireAuth, function(req,res,next){
    res.send('Authorised');
  });
  app.post('/signup', Authentication.signup);
  app.post('/signin', requireSignIn, Authentication.signin);
  app.get('/realtimedata', SensorData.realtimedata);
  app.get('/sensordetails', SensorData.sensordetails);
}
