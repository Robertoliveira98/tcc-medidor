var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/medidor');

const ambiente = new Schema({
    nome: { type: String, default: '' },
    id: { type: String, default: '' },
});

const medicoes = new Schema({
    medicao: { type: String, default: '' },
    idSensor: { type: String, default: '' },
    ambiente: { type: ambiente, default: {} },
    data: { type: Date, default: Date.now }
  });

 
module.exports = mongoose.model('medicoes', medicoes);
