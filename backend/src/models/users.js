const mongoose = require('mongoose');

let usuariosSchema = mongoose.model('Usuarios', {
        nombre: {
            type:String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            required: true
        },
        password: {
            type:String,
            required: true
        },
        oficina:{
            type:String,
            required: true
        },
        altas:{
            type:Boolean,
            default:false
        },
        lectura:{
            type:Boolean,
            default:true
        },
        bajas:{
            type:Boolean,
            default:false
        },
        modificacion:{
            type:Boolean,
            default:false
        }
        
    
})

module.exports = usuariosSchema;