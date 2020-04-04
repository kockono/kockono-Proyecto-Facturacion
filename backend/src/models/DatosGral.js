const mongoose = require('mongoose')
const Schema = mongoose.Schema
var DatosSchema = new Schema({
    CFDI: {
        type: String,
        require: true
    },
    IMPORTE: {
        type: Number,
        require: true
    },
    SubTotal: {
        type: Number,
        require: true
    },
    Total: {
        type: Number,
        require: true
    },
    IVA: {
        type: Number
    }
})

module.exports = DatosGral = mongoose.model('FormGral', DatosSchema);
