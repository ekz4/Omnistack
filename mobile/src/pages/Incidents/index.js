import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';


export default function Incidents() {

    //creo un estado para almacenar la lista de incidentes
    const [incidents, setIncidents] = useState([]); //se inicializa el estado con un arreglo vacio, ya que la lista de casos llegara como un arreglo
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1); //pagina inicial = 1
    const [loading, setLoading] = useState(false); //esta variable almacena el estado de busqueda, para evitar que se vayan a buscar los mismos datos sean buscados nuevamente

    const navigation = useNavigation();

    //esta funcion es la que dirige al usuario al detalle del caso
    //funcion recibe como argumento el objeto (incident) seleccionado, esto es para contar con sus parametros para utilizarlos en la ruta de destino (Detail)
    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident }); 
    }


    //funcion que carga los incidents
    async function loadIncidents(){

        //esto verifica que MIENTRAS se estan cargando datos, no se carguen mas datos (nuevamente)
        if (loading) {
            return; 
        }

        //si la variable total ya esta cargada y la cantidad de incidentes mostrados es igual al total de casos registrados, no tiene sentido cargar mas
        if (total > 0  &&  incidents.length === total) {
            return;
        }


        setLoading(true); //desde este momento, llamadas a la funcion loadIncidents no hara nada


        const response = await api.get('incidents', {
            params: { page }
        });

        //data es la respuesta de la api
        //el valor se pasa con la funcion setIncidents al estado incidents
        //que es lo que se muestra en la lista de incidentes
        //setIncidents(response.data); //<--- esto queda obsoleto, ya que iba a sobreescribir los primeros 5 incidentes con los siguientes 5 y asi sucesivamente
        setIncidents([... incidents, ... response.data]); //<---- de esta manera, traigo "TODOS LOS INCIDENTES, MÁS TODO LO QUE VAYA ANEXANDO"
        setTotal(response.headers['x-total-count']);


        setPage(page + 1); //actualiza que pagina de resultados ya cargué

        setLoading(false); //con los datos ya recuperados, se habilita nuevamente el poder solicitar mas datos
    }

    //funcion que carga los componentes que se mostraran en pantalla
    useEffect(() => {
        loadIncidents();
    });


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bienvenido!</Text>
            <Text style={styles.description}>Escoja uno de los casos de abajo y salve el día.</Text>



            <FlatList
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item:incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL' 
                                }).format(incident.value)
                            }
                         </Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText}>Ver más detalles</Text>
                            <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>
                    </View>


                )}
            />



        </View>
    );


}