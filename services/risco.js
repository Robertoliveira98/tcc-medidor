//formula da probabilidade derivada de Wells–Riley (RUDNICK; MILTON, 2003),
function calculaRisco(taxaCoIn, numeroInfectados, tempo, ocupantes) {
    //passar pra configuração 
    const quanta = 25;
    const taxaCoEx = 380;
    const coExalada = 15000;
    const porcOcupantesMask = 1; //todos
    const porcEficienciaMask = 0.5; //mascara de pano

    let quantaExaComMask = getQuantaExaComMask(quanta, porcOcupantesMask, porcEficienciaMask);
    
    let arExaladoAmbiente = (taxaCoIn - taxaCoEx)/coExalada;
    let probabilidade = 1 - Math.exp((-arExaladoAmbiente * numeroInfectados * quantaExaComMask * tempo)/ocupantes);
    // let probabilidade = 1 - Math.exp((-arExaladoAmbiente * numeroInfectados * quanta * tempo)/ocupantes);
    
    return probabilidade*100;
}

//taxa de quantaapós vedação e filtração pela máscara (PENG; JIMENEZ, 2020),
function getQuantaExaComMask(quanta, porcOcupantesMask, porcEficienciaMask){
    return quanta * (1 - porcOcupantesMask * porcEficienciaMask);
}
    

module.exports = {
    calculaRisco,
    getQuantaExaComMask
}