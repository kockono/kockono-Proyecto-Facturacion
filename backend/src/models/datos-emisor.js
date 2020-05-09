const { Schema, model } = require('mongoose');


const FacturasSchema = new Schema({
    
    nombreDeLaEmpresa : { type: String, require: true},
    telefono:{ type:String },
    rfc:{ type:String },
    email:{ type:String },
    estado:{ type:String },
    calle : { type: String, requireString: true},
    colonia : { type: String, require: true},
    numExterior : { type: Number, require: false},
    numInterior : { type: Number, require: false},
    cp : {type: Number, require: true},
    pais : {type: String, require: true},
    municipio : { type: String, require: true},
    localidad : { type: String, require: true},
    backup : { type: String, require: false},
})

module.exports = model('Emisor', FacturasSchema);