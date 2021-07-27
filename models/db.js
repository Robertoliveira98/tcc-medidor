var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.connect('mongodb://0.0.0.0/medidor');
// mongoose.connect('mongodb://medidorco2:rdapdm22@0.0.0.0/medidor?authSource=admin');
// mongoose.connect('mongodb://0.0.0.0/medidor?authSource=admin');

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
