const connection = require('../database/connection');

module.exports = {

    async index(request, response) {

        const ong_id = request.headers.authorization;

        //esto es una query que filtra por el id que pasan de la pagina por medio de metodo DELETE
        const profile = await connection('incidents')
            .where('ong_id', ong_id )
            .select('*')


        response.json(profile);
        

    }

    


};