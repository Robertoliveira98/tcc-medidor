Node v14.16.0

# Instalação
### npm install

# Execução
### npm start

# Endpoints

Necessário incluir token (que deve ser cadastrado préviamente na collection "tokens" do banco de dados) no parâmetro Authorization do Header da requisição.

## GET http://localhost:3000/medicoes/:idSensor
Retorna todas as medições de um sensor.


## POST http://localhost:3000/medicoes/
Retorna as medições de acordo com o filtro.
Body: {
"idSensor": "1234
"ambienteId": "1234",
"from":"2021-06-28T01:37:00.000-03:00",
"to": "2021-06-28T01:47:00.000-03:00"
}

## POST http://localhost:3000/inserir
Insere uma medição no banco.
Body: {
"idSensor": "1234",
"medicao": "850",
"ambiente": {
"nome": "sala 1",
"id": "1234"
}
}
