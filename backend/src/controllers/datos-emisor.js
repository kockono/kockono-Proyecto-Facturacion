const { Router } = require('express');
const router = Router();
// let ObjectId = require('mongoose').Types.ObjectId;

let  datosEmisor  = require('../models/datos-emisor');

router.post('/', (req, res) => {

    let empresa = new datosEmisor ({
        email: req.body.email,
        nombreDeLaEmpresa: req.body.nombreDeLaEmpresa,
        calle: req.body.calle,
        colonia: req.body.colonia,
        estado: req.body.estado,
        numExterior:req.body.numExterior,
        numInterior:req.body.numInterior,
        cp:req.body.cp,
        rfc:req.body.rfc,
        pais:req.body.pais,
        telefono:req.body.telefono,
        municipio:req.body.municipio,
        localidad:req.body.localidad,
    });

    empresa.save((err, doc)=>{
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo datosEmpresa' + JSON.stringify(err, undefined, 2));}
    });
});

module.exports = router;
