var qs = require('querystring');
var sendgrid = require('./sendgrid-email');
var fs = require('fs');
var express = require('express');
var app = express();
var sanitizer = require('sanitizer');
var path = require('path');
var port = (process.env.PORT || 8000); // set port dynamically for Heroku

app.use('/', express.static(__dirname + '/'));
app.use('/marketers', express.static(__dirname + '/marketers.html'));

// app.get('/', function (req, res) {
//   res.writeHead(200, {'Content-Type': 'application/json'});
//   res.sendFile(__dirname + '/index.html');
//   res.end();
// });
//
// app.get('/marketers', function (req, res) {
//   res.writeHead(200, {'Content-Type': 'application/json'});
//   res.sendFile(__dirname + '/marketers.html');
//   res.end();
// });

app.post('/send-form', function (req, res) {
  var body = '';

  req.on('error', function(err) {
    console.error(err);
  }).on('data', function (data) {
      body += data;

      // Too much POST data, kill the connection!
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6)
          req.connection.destroy();
  }).on('end', function () {
      var post = qs.parse(body);
      // console.log('post[submitterEmail]: ', post['submitterEmail']);

      // Escapes HTML special characters in message as HTML entities
      post['message'] = sanitizer.escape(post['message']);

      sendgrid.send(post);

      res.sendStatus(200);
  });

});

app.listen(port);
