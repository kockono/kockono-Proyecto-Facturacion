const mongoose = require('mongoose');

let catalogoSchema = mongoose.model('Catalogo', {
        tipo: {
            type: String,
        },
        division: {
            type:String,
        },
        grupo:{
            type:String,
        },
        clase:{
            type:String,
        },
        clave:{
            type:Number,
        }
    
})

module.exports = catalogoSchema;