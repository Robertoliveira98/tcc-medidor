const medicoes = require('../models/db.js');
const Service = require('../services/medicoes.js');
const RiscoService = require('../services/risco.js');

function getListaMedicoes(req, res){
  medicoes.find()
  .then(resp => {    
    res.send(resp);
  });
};

function getListaMedicoesFilter(req, res, next){
  let filter = Service.getFilter(req.body);
  medicoes.find(filter)
  .then(resp => {
    res.json(resp);
  });
};

function insert(req, res){
  let body = req.body;
  body.risco = RiscoService.calculaRisco(body.medicao, 1, 2, 20);
  medicoes.create(req.body)
  .then(resp => {
    res.send(resp);
  });
};

module.exports = {
  getListaMedicoes,
  getListaMedicoesFilter,
  insert
}