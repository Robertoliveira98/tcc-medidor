var mongoose = require('mongoose'),
Schema = mongoose.Schema;

// mongoose.connect('mongodb://0.0.0.0/medidor');

const tokens = new Schema({
    nome: { type: String, default: '' },
    descricao: { type: String, default: '' },
    valido: { type: Boolean, default: false },
  });

 
module.exports = mongoose.model('tokens', tokens);
