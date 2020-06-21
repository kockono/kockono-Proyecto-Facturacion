const { Schema, model } = require('mongoose');


const articulosYServiciosSchema = new Schema({
    
    articuloServicio : { type: String},
    nombre : { type: String},
    precio : { type: Number},
    uMed : { type: String},
    unidadTipo : { type: String},
    unidadSubtipo : { type: String},
    unidadCodigo : { type: String},
    unidad : {type: String},
    productoTipo : { type: String},
    productoDivision : { type: String},
    productoGrupo : { type: String},
    productoClase : { type: String},
})

module.exports = model('articulos-y-servicios', articulosYServiciosSchema);