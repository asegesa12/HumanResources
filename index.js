const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//Crear servidor express
const app = express();

app.use(cors());

app.use(express.json());

//Base De Datos
dbConnection();

console.log( process.env);


//Routes
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));


app.listen(3000, () => {
    console.log('Server running on port ' + 3000);
});