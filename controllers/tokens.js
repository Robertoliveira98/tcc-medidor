const tokens = require('../models/tokens.js');

function getToken(req, res, next){
  let authorization = req.headers.authorization;
  tokens.findOne({"_id": authorization})
    .then(tokenData => {
      tokenData = tokenData.toJSON();
      if (tokenData && tokenData.valido) {
        req.tokenData = tokenData;
        next();
      } else {
        res.status(401).json({mensagem: 'Não autorizado!'});
      }
    })
    .catch(err => {
      res.status(401).json({mensagem: 'Não autorizado!'});
    })
}

module.exports = {
  getToken,
}