const express = require('express'); //importa el modulo express dentro de la variable express

const OngController = require('./controllers/OngController');

const IncidentsController = require('./controllers/IncidentsController');

const ProfileController = require('./controllers/ProfileController');

const SessionController = require('./controllers/SessionController');

const routes = express.Router();

/**
 * Métodos HTTP:
 * GET: Para buscar información que está en el backend
 * POST: Para crear información en el backend
 * PUT: Para modificar información en el backend
 * DELETE: Para qliminar información en el backend
 */

routes.get('/', (request, response) => {
    //return response.send('Hola a todos!!!') //esto es para enviar un texto
    return response.json({ //esto es para enviar un {objeto}
        evento: 'Semana OmniStack 11.0',
        aluno: 'Enrique Ulloa'

    });

});


/**
 * Tipos de parámetros: 
 * Query params: parámetros nombrados enviados a la ruta después del ?
 * Route params: parámetros utilizados para identificar recursos
 * Request body: cuerpo de la socilitud, utilizado para crear o alterar recursos
 * 
 */


//ejemplo query params
//para accesar a esto se usa -> http://localhost:3333/users?name=Enrique&edade=32
//app.get('/users/', (request, response) => {
//    const params = request.query;


//ejemplo route params
//para accesar a esto se usa -> ttp://localhost:3333/users/1
//app.get('/users/:id', (request, response) => {
//    const params = request.params;

//ejemplo request body
//


routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index); 
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentsController.index);
routes.post('/incidents', IncidentsController.create);
routes.delete('/incidents/:id', IncidentsController.delete);

module.exports = routes; //exporto este archivo como modulo para ser usado en el js principal