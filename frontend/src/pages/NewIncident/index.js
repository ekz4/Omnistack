import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './style.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {


    //creo "estados" para almacenar cada variable ingresada en el formulario
    const [title, setTitle] = useState(''); //nombre del estado, funcion que modifica el estado, estado inicial
    const [description, setDescription] = useState(''); 
    const [value, setValue] = useState('');
    
    //el ID de la ong lo rescato desde local storage, ya que no esta en el formulario
    const ongId = localStorage.getItem('ongId');

    //esto es para despues de registrar un caso, redireccionar al usuario a la pagina de su profile
    const history = useHistory();


    //funcion que maneja la captura de datos del formulario y mediante api los manda al backend
    async function handleNewIncident(e){
        e.preventDefault(); //previene que se recargue la pagina al enviar formulario

        //este arreglo guardara todos los valores ingresados en formulario como un objeto
        const data = {
            title,
            description,
            value,
        };

        
        try {
            //aqui se llama al metodo post de la api para registrar el caso, junto con el contenido del formulario, junto con el ID de la ONG
            await api.post('incidents', data, {
                headers:{
                    Authorization: ongId,
                    }
                })
        
            //retornar exito del registro
            alert('Caso ingresado con éxito.');
        
            //despues de registrar, se redirige al usuario a la pagina de login
            history.push('/profile');

            } catch (err) {
                alert('Error registrando el caso, favor intente nuevamente.');
            }
    
    }





    return (
        <div className="new-incident-container">
                <div className="content">
                    <section>
                    <img src={logoImg} alt="Be the Hero" />

                    <h1>Ingresar nuevo caso</h1>
                    <p>Complete sus datos, entre en la plataforma y ayude a personas a colaborar con su ONG.</p>

                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#e02041"/> 
                        Volver                   
                    </Link>

                    </section>

                    <form onSubmit={handleNewIncident}>
                        <input
                            placeholder="Nombre del caso"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <textarea
                            placeholder="Descripción"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <input
                            placeholder="Valor en Reales"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />

                        <button className="button" >Ingresar</button>

                    </form>
                </div>
            </div>
    );
}