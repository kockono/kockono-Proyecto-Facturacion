const { Schema, model } = require('mongoose');

const FacturasSchema = new Schema({
    
    Nombre : { type: String, require: true},
    RFC : { type: String, require: true},
    Estatus : { type: Boolean, require: false},
    NumSerie : { type: Number, require: false},
    Calle : { type: String, requireString: true},
    Colonia : { type: String, require: true},
    NumInt : { type: Number, require: false},
    NumExt : { type: Number, require: false},
    CodigoPostal : {type: Number, require: true},
    Municipio : { type: String, require: true},
    Localidad : { type: String, require: true},
    Estado : { type: String, require: true},
    RazonS : { type: String, require: true}

},{
    timestamps:true
});

module.exports = model('DatosDeEmpresas', FacturasSchema);
