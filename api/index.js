var ig = require('instagram-node').instagram();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var https = require('https');
var http = require('http');
var cors = require('cors');

var config = require('../srb/config');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

ig.use({
  client_id: config.instagramClientId,
  client_secret: 'a9db422f19ef47a48fb82ab34ad1ffed',
});

var port = process.env.PORT || 9000;

var router = express.Router();

var instaApi = function(path, token, query, callback) {
  if (! token) {
    callback([]);
    return;
  }
  const queryString = '';
  Object.keys(query).map(key => queryString += '&' + key + '=' + query[key]);
  console.log('https://api.instagram.com/v1'+path+'?access_token=' + token + queryString);
  https.get('https://api.instagram.com/v1'+path+'?access_token=' + token + queryString, (res) => {
    var body = '';
    res.on("data", data => {
      body += data;
    });

    res.on("end", () => {
      try {
        body = JSON.parse(body);
        callback(body.data ? body.data : []);
      } catch (error) {
        callback([]);
      }
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
}

app.get('/photos', function (request, response) {
  const token = request.get('Authorization');
  instaApi('/users/self/media/recent', token, {}, function (data) {
    if (data && data.length) {
      console.log('data: ');
      console.log(data[0]);
      instaApi('/users/self/media/recent', token, { max_id: data[0].id }, function(allMedia) {
        response.json(allMedia);
      })
    } else {
      response.json([]);
    }
  })
});

http.createServer(app).listen(port, function(){
  console.log("Express server listening on port " + port);
});
