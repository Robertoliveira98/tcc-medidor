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
  // medicoes.aggregate([{ $match: filter}])
  medicoes.find(filter)
  .then(resp => {
    res.json(resp);
  });
};

function insert(req, res){
  let body = req.body;
  //TODO - parametrizar entradas
  body.risco = RiscoService.calculaRisco(body.medicao, 1, 2, 20, 25 , true, 0.5);
  body.riscoSemMascara = RiscoService.calculaRisco(body.medicao, 1, 2, 20, 25, false, 0)
  body.riscoComPff2 = RiscoService.calculaRisco(body.medicao, 1, 2, 20, 25, true, 0.95)
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