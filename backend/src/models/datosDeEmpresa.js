const { Schema, model } = require('mongoose');

const userSchema = new Schema ({

    email: { type: String, unique: true, trim: true, required: true },
    nombreDeLaEmpresa: { type:String, required: true},
    calle:{ type:String },
    colonia:{ type:String },
    estado:{ type:String },
    numExterior:{ type:String },
    cp:{ type:Number },
    rfc:{ type:String },
    pais:{ type:String },
    telefono:{ type:String },
    municipio:{ type:String },
    localidad:{ type:String },
    backup:{ type:Boolean, default:true}

},{
    timestamps:true
});

module.exports = model('DatosDeEmpresas', userSchema);