/**
 * Module dependencies.
 */

const express = require('express');
const controllers = require('./controllers');
const medicoes = require('./controllers/medicoes');
const tokens = require('./controllers/tokens');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');

var cors = require('cors');
var app = express();

app.use(
  cors({
    allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
    exposedHeaders: ["authorization"], // you can change the headers
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false
  }));

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

let validateToken = function (req, res, next) {
  if ('/' === req.path) {
    next()
  } else {
    tokens.getToken(req, res, next);
  }
};

app.use(validateToken);

app.get('/', controllers.index);

app.get('/medicoes', (req, res, next) => {
  medicoes.getListaMedicoes(req, res, next);
});

app.post('/medicoes', (req, res, next) => {
  medicoes.getListaMedicoesFilter(req, res, next);
});
app.post('/inserir', (req, res, next) => {
   medicoes.insert(req, res, next);
  });

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
