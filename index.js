const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//Crear servidor express
const app = express();

app.use(cors());

//Base De Datos
dbConnection();

console.log( process.env);


//Routes

app.get('/', (req, res)=>{

    res.json({
        ok: true,
        msg: 'Hola'
    })

});

app.listen(3000, () => {
    console.log('Server running on port ' + 3000);
});