const express = require('express');
let router = express.Router();
let ObjectId = require('mongoose').Types.ObjectId;

let  datosEmpresa  = require('../models/datosDeEmpresa');

router.get('/', (req,res) => {
    datosEmpresa.find((err,doc) => {
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo datosEmpresa' + JSON.stringify(err, undefined, 2));}
    });
});

router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontro la id: ${req.params.id}`);

        datosEmpresa.findById(req.params.id, (err, doc) => {
            if(!err) {res.send(doc);}
                else { console.log(`Error en encontrar el empleado: `+ JSON.stringify(err, undefined, 2));}
        });
});


router.post('/', (req, res) => {
    let empresa = new datosEmpresa ({
        email: req.body.email,
        nombreDeLaEmpresa: req.body.nombreDeLaEmpresa,
        calle: req.body.calle,
        colonia: req.body.colonia,
        estado: req.body.estado,
        lugarExpedicion: req.body.lugarExpedicion,
        descripcion:req.body.descripcion,
        valorUnitario:req.body.valorUnitario,
        importe:req.body.importe,
        folio:req.body.folio,
        numExterior:req.body.numExterior,
        cp:req.body.cp,
        rfc:req.body.rfc,
        municipio:req.body.municipio,
        fechaEmision:req.body.fechaEmision,
        cantidad:req.body.cantidad,
        importeConLetra:req.body.importeConLetra,
        metodoPago:req.body.metodoPago,
        pais:req.body.pais,
        telefono:req.body.telefono,
        unidad:req.body.unidad,
    });
    empresa.save((err, doc)=>{
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo datosEmpresa' + JSON.stringify(err, undefined, 2));}
    });
});

router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontro la id: ${req.params.id}`);

    let empresa = ({
        email: req.body.email,
        nombreDeLaEmpresa: req.body.nombreDeLaEmpresa,
        calle: req.body.calle,
        colonia: req.body.colonia,
        estado: req.body.estado,
        lugarExpedicion: req.body.lugarExpedicion,
        descripcion:req.body.descripcion,
        valorUnitario:req.body.valorUnitario,
        importe:req.body.importe,
        folio:req.body.folio,
        numExterior:req.body.numExterior,
        cp:req.body.cp,
        rfc:req.body.rfc,
        municipio:req.body.municipio,
        fechaEmision:req.body.fechaEmision,
        cantidad:req.body.cantidad,
        importeConLetra:req.body.importeConLetra,
        metodoPago:req.body.metodoPago,
        pais:req.body.pais,
        telefono:req.body.telefono,
        unidad:req.body.unidad,
        backup:req.body.backup
    });
    let ID = req.params.id;
    datosEmpresa.findByIdAndUpdate(ID, {$set: empresa}, {new:true},(err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el empleado: `+ JSON.stringify(err, undefined, 2));}

    })
})

router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No se encontro la id: ${req.params.id}`);

    datosEmpresa.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el empleado: `+ JSON.stringify(err, undefined, 2));}
    });
});


module.exports = router;