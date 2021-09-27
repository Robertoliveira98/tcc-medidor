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

function getMedicao(req, res){
  let dataAtual = new Date();
  let dataAnterior = new Date(dataAtual.getTime() - 60000);
  
  let filter = Service.getFilter({ 
    "idSensor": req.params.idSensor,
    "from": dataAnterior,
    "to": dataAtual 
  });

  // medicoes.aggregate([{ $match: filter}])
  medicoes.find(filter)
  .then(medicoes => {
    let resp = {}

    if (medicoes.length > 0) {
      resp = medicoes[0];
      let medicaoAux = 0;

      medicoes.forEach(medicoes => {
        medicaoAux += parseInt(medicoes.medicao);
      });

      medicaoAux = parseInt(medicaoAux/medicoes.length);

      resp.medicao = medicaoAux;
      resp.risco = RiscoService.calculaRisco(medicaoAux, 1, 2, 20, 25 , true, 0.5);
      resp.riscoSemMascara = RiscoService.calculaRisco(medicaoAux, 1, 2, 20, 25, false, 0)
      resp.riscoComPff2 = RiscoService.calculaRisco(medicaoAux, 1, 2, 20, 25, true, 0.95)
    }
    
    res.json(resp);
  });
}

module.exports = {
  getMedicao,
  getListaMedicoes,
  getListaMedicoesFilter,
  insert
}