
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const cors = require('cors');


const port = process.env.PORT || 3000;

//App setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type : '*/*'}));
app.use(cors());
router(app);

//Server setup
app.listen(port, function(){
console.log("Server up on 3000!");
});
