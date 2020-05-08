const { Schema, model } = require('mongoose');


const FacturasSchema = new Schema({
    
    nombreDeLaEmpresa : { type: String, require: true},
    telefono:{ type:String },
    rfc:{ type:String },
    email:{ type:String },
    calle : { type: String, requireString: true},
    colonia : { type: String, require: true},
    numExterior : { type: Number, require: false},
    numInterior : { type: Number, require: false},
    cp : {type: Number, require: true},
    municipio : { type: String, require: true},
    localidad : { type: String, require: true},
})

module.exports = model('Emisor', FacturasSchema);