const { Router } = require('express');
const router = Router();
let ObjectId = require('mongoose').Types.ObjectId;

let  datosEmisor  = require('../models/datos-emisor');

router.post('/', (req, res) => {
    console.log("LLego peticion");
    let empresa = new datosEmisor ({

        nombreDeLaEmpresa: req.body.nombreDeLaEmpresa,
        email: req.body.email,
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
        backup:req.body.backup,
    });

    empresa.save((err, doc)=>{
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo datosEmpresa' + JSON.stringify(err, undefined, 2));}
    });
});

router.put('/:id', (req, res) => {
    
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontro la id: ${req.params.id}`);

        let empresa =  ({

            nombreDeLaEmpresa: req.body.nombreDeLaEmpresa,
            email: req.body.email,
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
            backup:req.body.backup,
        });

    let ID = req.params.id;
    datosEmisor.findByIdAndUpdate(ID, {$set: empresa}, {new:true},(err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el empleado: `+ JSON.stringify(err, undefined, 2));}

    })
})

router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No se encontro la id: ${req.params.id}`);

    datosEmisor.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el empleado: `+ JSON.stringify(err, undefined, 2));}
    });
});

router.get('/', (req,res) => {
    datosEmisor.find((err,doc) => {
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo datosEmisor' + JSON.stringify(err, undefined, 2));}
    });
});

router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontro la id: ${req.params.id}`);

        datosEmisor.findById(req.params.id, (err, doc) => {
            if(!err) {res.send(doc);}
                else { console.log(`Error en encontrar el empleado: `+ JSON.stringify(err, undefined, 2));}
        });
});

module.exports = router;
