const { Schema, model } = require('mongoose');


const articulosYServiciosSchema = new Schema({
    
    articuloServicio : { type: String},
    nombre : { type: String},
    precio : { type: Number},
    uMed : { type: String}
})

module.exports = model('articulos-y-servicios', articulosYServiciosSchema);