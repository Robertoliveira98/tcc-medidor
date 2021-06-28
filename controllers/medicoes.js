const medicoes = require('../models/db.js');
const Service = require('../services/medicoes.js');

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