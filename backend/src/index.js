const express = require('express'); //importa el modulo express dentro de la variable express
const cors = require('cors');
const routes = require('./routes') //importo modulo con rutas

const app = express(); //creo mi app, la cual es una instancia de express

app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(3333);
