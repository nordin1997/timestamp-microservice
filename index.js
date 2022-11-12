// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({
    optionsSuccessStatus: 200
})); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function(req, res) {
  console.log(typeof req.params.date, req.params.date)
 const date_string = req.params.date === undefined ?
new Date(): req.params.date.length === 13 ? new Date(Number(req.params.date))   : new Date(req.params.date);
  console.log(date_string)
  if (!date_string.getTime()){
    res.json({
        error : "Invalid Date" 
    });
  }
   res.json({
        "unix": Number(date_string.getTime()),
        "utc": date_string.toUTCString()
    });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});