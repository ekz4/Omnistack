import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './style.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {

    //se crea estado para almacenar el contenido ingresado en el campo
    const [id, setId] = useState('');

    //para mandar al usuario a otra ruta
    const history = useHistory();

    //funcion que captura contenido ingresado en formulario y llama a api
    async function handleLogin(e){
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id }); //sessions = ruta a la que se envia la informacion, id = lo que se envia 
        
            //cuando el logeo es exitoso, guardaré el ID y el nombre de la ONG en la memoria del navegador
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('profile');

            } catch (err) {
                alert('Error al autenticar, intente nuevamente.');
            }

    }



    return (

        //en react se utiliza className para asignar clases a atributos HTML (importante N mayuscula ¬¬)
        <div className="logon-container">

            <section className="form">

                <img src={logoImg} alt="Be the Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Haga su login</h1>

                    <input
                        placerholder="Ingresa tu ID"
                        value={id}
                        onChange={e => setId(e.target.value)} 
                    />
                    <button className="button" type="submit">Ingresar</button>

                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#e02041"/> 
                        Crear cuenta             
                    </Link>

                    

                </form>

            </section>

            <img src={heroesImg} alt="Heroes" />

        </div>
    );


}