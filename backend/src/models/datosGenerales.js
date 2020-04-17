const mongoose = require('mongoose')
const Schema = mongoose.Schema

var DatosSchema = new Schema({
    
    cfdi: {type: String, require: true },
    importe: {type: Number, require: true},
    SubTotal: {type: Number, require: true},
    Total: {type: Number,require: true },
    IVA: {type: Number}
})

module.exports = DatosGral = mongoose.model('DatosGenerales', DatosSchema);
