const mongoose = require('mongoose');
require('dotenv').config();
const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.CNN_DB)

        console.log('Online');
        console.log(process.env.CNN_DB)

    } catch (err) {
        console.log(err);
        throw new err('Error al Iniciar la base de datos');
    }

    
}

module.exports = {
    dbConnection
}