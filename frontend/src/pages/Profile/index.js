import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './style.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {

    //aqui guardare los casos retornados por el backend al usar el la funcion profile de la API
    const [incidents, setIncidents] = useState([]); //al contrario de otras que se incializan vacias '', este se inicializa como arreglo

    //rescata nombre de la ong desde el localStorage, se guardó ahí al hacer login
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    //para mandar al usuario a otra ruta
    const history = useHistory();

    //llama a la api sin accion del usuario, esto es par mostrar los casos al abrir el profile de la ong
    //useEffect recibe 2 parametros, primero la {funcion} que se va a ejecutar y el [trigger].
    //Cada vez que trigger cambie de valor, funcion se ejecutara. Si trigger se deja vacio, se ejecuta solo una vez

    useEffect(() => {
        api.get('profile',{ //este metodo get recibe 2 argumentos, la ruta y el ID de la ONG logeada
            headers:{
                Authorization: ongId,
            } //leo el localStorage para extraer ID de la ong, con eso traigo todos sus casos
            
        }).then( response => { //grabo los datos de esa respuesta en algun lugar, sí, dentro de un estado
                    setIncidents(response.data);
        })
    },[ongId]); //para asegurar de volver a consultar los casos si llegase a cambiar la ong logeada


    //para borrar un caso, recibe id del caso como argumento
    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, { //ojo lleva apostrofe pk hay una variable //metodo delete recibe 2 argumentos: ruta y id ong logeada
                headers:{
                    Authorization: ongId,
                    }
                })

                //luego de quitar el caso en el backend, lo quita en el frontend actualizando el estado incidents (el cual contiene un arreglo con todos los casos) 
                setIncidents(incidents.filter(incident => incident.id !== id));

            } catch (err) {
                alert('Error al eliminar caso, intente nuevamente.');
            }

    }


    function handleLogout(){
        localStorage.clear(); //vacia la memoria del local storage

        history.push('/');

    }


    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Bienvenida, {ongName} </span>

                <Link className="button" to="/incidents/new">Ingresar nuevo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos Registrados</h1>

            <ul>
                {incidents.map( incident => (

                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIPCION:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="a8a8b3" />
                        </button>
                    </li>



                ))}
            </ul>

        </div>


    );

}
