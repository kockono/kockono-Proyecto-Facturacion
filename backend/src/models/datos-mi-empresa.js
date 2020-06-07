const { Schema, model } = require('mongoose');


const miEmpresaSchema = new Schema({
    
    nombreDeLaEmpresa : { type: String},
    ver: {type:Boolean, default: true},
    email: { type: String, unique: true,  trim: true },
    calle : { type: String},
    numero : { type: Number},
    colonia : { type: String},
    pais : {type: String},
    estado:{ type:String },
    municipio : { type: String},
    codigoPostal : {type: Number,},
    rfc:{ type:String }
})

module.exports = model('datos-mi-empresa', miEmpresaSchema);