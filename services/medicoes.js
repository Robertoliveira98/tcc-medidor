const moment = require('moment');
const momentTz = require('moment-timezone');

function getFilter(body) {
    let filter = {};

    if(body && body.ambienteId)
        filter["ambiente.id"] = body.ambienteId

    if(body && body.idSensor)
        filter.idSensor = body.idSensor

    if(body && body.from && body.to){
        filter.data = {$gte: body.from, $lte: body.to};
    } else if (body && body.from) {
        filter.data = {$gte: body.from};
    } else if (body && body.to) {
        filter.data = {$lte: body.to};
    }
    return filter;
}


module.exports = {
    getFilter
}