import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './style.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {

    //creo "estados" para almacenar cada variable ingresada en el formulario
    const [name, setName] = useState(''); //nombre del estado, funcion que modifica el estado, estado inicial
    const [email, setEmail] = useState(''); 
    const [whatsapp, setWhatsapp] = useState(''); 
    const [city, setCity] = useState(''); 
    const [uf, setUf] = useState('');

    //esto es para despues de registrar ONG, redireccionar al usuario a la pagina de login
    const history = useHistory();


    //funcion que maneja la captura de datos del formulario y mediante api los manda al backend
    async function handleRegister(e){
        e.preventDefault(); //previene que se recargue la pagina al enviar formulario

        //este arreglo guardara todos los valores ingresados en formulario como un objeto
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        
        try {
            //aqui se llama al metodo post de la api para registrar la ONG y devolver su ID
            const response = await api.post('ongs', data);  //la ruta a que quiero enviar y qué quiero enviar (el objeto data con cotenido del formulario) 
        
            //retornar exito del registro
            alert(`Tu ID para acceder es: ${response.data.id}`); //ojo con apostrofe en vez de comilla, debido a que hay una variable
        
            //despues de registrar, se redirige al usuario a la pagina de login
            history.push('/');

            } catch (err) {
                alert('Error en el registro, favor intente nuevamente.');
            }
    
    }

    return (

            <div className="register-container">
                <div className="content">
                    <section>
                    <img src={logoImg} alt="Be the Hero" />

                    <h1>Cree su cuenta</h1>
                    <p>Complete sus datos, entre en la plataforma y ayude a personas a colaborar con su ONG.</p>

                    <Link to="/" className="back-link">
                        <FiArrowLeft size={16} color="#e02041"/> 
                        Volver                     
                    </Link>
                    </section>

                    
                    <form onSubmit={handleRegister}>
                        <input
                            placeholder="Nombre de la ONG"
                            value={name}
                            onChange={e => setName(e.target.value)} //funcion escrita en formato reducida: que parametro recibe -> el cuerpo de la funcion
                        />

                        <input
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <input
                            placeholder="Whatsapp"
                            value={whatsapp}
                            onChange={e => setWhatsapp(e.target.value)}    
                        />

                        <div className="input-group">
                            <input
                                placeholder="Ciudad"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                            />

                            <input
                                placeholder="Estado"
                                style={{ width:80 }}
                                value={uf}
                                onChange={e => setUf(e.target.value)}
                            />
                        </div>

                        <button className="button">Registrar</button>

                    </form>
                </div>
            </div>
         


    );

}