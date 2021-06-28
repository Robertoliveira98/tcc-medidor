/**
 * Module dependencies.
 */

const express = require('express');
const controllers = require('./controllers');
const medicoes = require('./controllers/medicoes');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

/*
var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
  app.use(express.errorHandler());
}
*/

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
