const mongoose = require("mongoose");
require("dotenv").config();
//HAY QUE PASAR ESTOS DATOS A VARIABLES DE ENTORNO
const uri =process.env.ATLAS
const options = {
    // maxPoolSize: 10,
    
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


//CONECCION CON BASE DE DATOS(sample_analytics)COLECCION(customers)
mongoose.connect(uri, options)/*, (err) => {
    err
        ? console.log("No hay conexión ")
        : console.log("Mongo DB Atlas connected");
});
*/
