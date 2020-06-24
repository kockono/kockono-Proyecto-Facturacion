const { Schema, model } = require('mongoose');


const FacturasSchema = new Schema({
    nombreDeLaEmpresa : { type: String, require: true},
    estatus:{type:String},
    razon:{type:String},
    metodo:{type:String},
    forma:{type:String},
    cfdi:{type:String},
    fecha:{type:String},
    monto:{type:Number},
    folio:{type:Number},
    /* Nuevos campos agregados en base a la factura ejemplo */
    ordenDeCompra:{type:String},
    condiciones:{type:String},	
    vendedor:{type:String},
    viaDeEmbarque:{type:String},
    unidades:{type:Number},
    articulo:{type:String},	
    nombre:{type:String},
    precio:{type:Number},
    descuento:{type:Number},
    uMed:{type:String},
    importe	:{type:Number},
    subtotal:{type:Number},
    total:{type:Number},
    iva:{type:Number},
    artarr:{type:Array},

    fechaExpir:{type:String},
        dineroRest:{type:Number}
})

module.exports = model('Fact', FacturasSchema);