const mongoose = require('mongoose');

let administradorSchema = mongoose.model('Administradores', {
        email: {
            type: String,
            unique: true,
            trim: true,
            required: true
        },
        password: {
            type:String,
            required: true,
            
        },
        oficina:{
            type:String,
            default:true
        },
        altas:{
            type:Boolean,
            default:true
        },
        lectura:{
            type:Boolean,
            default: true
        },
        bajas:{
            type:Boolean,
            default: true
        },
        modificacion:{
            type:Boolean,
            default: true
        }
        
    
})

module.exports = administradorSchema;