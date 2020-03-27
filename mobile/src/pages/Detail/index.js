import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';


export default function Detail() {

    const navigation = useNavigation();

    //esto se usa para llevar contenido de una ruta a otra, se llevaran los detalles del caso seleccionado en pantalla incidents
    const route = useRoute();

    //params = todos los parametros que la ruta recibio desde la ruta anterior mediante la funcion navigateToDetail !!
    //ahora los tengo disponibles para utilizar en esta ruta
    const incident = route.params.incident;

    const message = `Hola ${incident.name}, estoy contactándolos ya que me gustaría ayudar en el caso "${incident.title}" con un valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}.`;

    //esta funcion es la que dirige al usuario al detalle del caso
    function navigateBack() {
        //navigation.navigate('Incidents'); 
        navigation.goBack();
    }


    //funciones para entrar en contacto 
    function sendMail(){
        MailComposer.composeAsync({
            subject: `Héroe del caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }


    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=+5521989416833&text=${message}`); //va con ` pk lleva variable dentro
    }





    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
            </View>

            <View style= {styles.incident}>
                <Text style={[ styles.incidentProperty, { marginTop:0 } ]}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

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

            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve el día!</Text>
                <Text style={styles.heroTitle}>Sea el héroe de este caso.</Text>

                <Text style={styles.heroDescription}>Entre en contacto:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>



        </View>
    );


}