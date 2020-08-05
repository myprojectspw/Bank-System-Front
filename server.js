// server.js
const express = require('express');
var proxy = require('express-http-proxy');
const app = express();
const path = require('path');
const cors = require('cors');

// add this code
const whitelist = ['https://thawing-river-01959.herokuapp.com']; // list of allow domain

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) {
            return callback(null, true);
        }

        if (whitelist.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}

// end 
app.use(cors(corsOptions));



//dist directory creates on heroku so you would get it here
app.use(express.static(__dirname + '/dist'));

app.listen(process.env.PORT || 8080);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://pacific-island-75677.herokuapp.com/api/"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + './project/dist/index.html'));
});

console.log('Console listening!');

app.use('/proxy', proxy('https://pacific-island-75677.herokuapp.com'));