const connection = require('../database/connection');

module.exports = {


    async index(request, response) {

        //esto es para paginar los resultados
        const { page = 1 } = request.query; //si no se le pasa argumento a page, considera valor = 1

        //esto es para saber cuantos registros hay en total
        //se escribe en corchetes pk devuelve un arreglo
        const [count] = await connection('incidents').count();
        console.log(count);

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //esto es JOIN con tabla ongs, donde el id de las ongs sea = al ong_id de los incidents
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        //esto enviará en el header de la respuesta el numero de casos
        //el count se escribe tan feo pk accede a la propiedad 'count(*)' del arreglo count
        response.header('X-Total-Count', count['count(*)']);
    
        return response.json(incidents);

    },

    async create(request, response) {

        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,

        });

        return response.json({ id });


    },


    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        //esto es una query que filtra por el id que pasan de la pagina por medio de metodo DELETE
        const incident = await connection('incidents')
        .where('id', id )
        .select('ong_id')
        .first(); //retorna el 1er resultado, solo pk estoy seguro de que devolvera una sola fila


        //se verifica que la ong asociada al incident que se quiera borrar
        //sea la misma ong que se encuentra logeada 
        if (incident.ong_id != ong_id) {
            return response.status(401).json({error:'Operacion no permitida!'});
        }


        //pendiente: verificar que el incident existe siquiera antes de borrar!!
        //if incident.



        await connection('incidents').where('id', id).delete();

        return response.status(204).send(); //exito pero ninguna respuesta para devolver

    }



};