const { Router } = require('express');
const router = Router();
let ObjectId = require('mongoose').Types.ObjectId;
let datosMiEmpresa  = require('../models/datos-mi-empresa');

router.post('/', (req, res) => {

    let empresa = new datosMiEmpresa ({

        nombreDeLaEmpresa: req.body.nombreDeLaEmpresa,
        calle: req.body.calle,
        numero:req.body.numero,
        colonia: req.body.colonia,
        pais:req.body.pais,
        estado: req.body.estado,
        municipio:req.body.municipio,
        codigoPostal:req.body.codigoPostal,
        rfc:req.body.rfc
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
            calle: req.body.calle,
            numero:req.body.numero,
            colonia: req.body.colonia,
            pais:req.body.pais,
            estado: req.body.estado,
            municipio:req.body.municipio,
            codigoPostal:req.body.codigoPostal,
            rfc:req.body.rfc
        });

    let ID = req.params.id;
    datosMiEmpresa.findByIdAndUpdate(ID, {$set: empresa}, {new:true},(err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el empleado: `+ JSON.stringify(err, undefined, 2));}

    })
})

router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No se encontro la id: ${req.params.id}`);

    datosMiEmpresa.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el empleado: `+ JSON.stringify(err, undefined, 2));}
    });
});

router.get('/', (req,res) => {
    datosMiEmpresa.find((err,doc) => {
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo datosMiEmpresa' + JSON.stringify(err, undefined, 2));}
    });
});

router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontro la id: ${req.params.id}`);

        datosMiEmpresa.findById(req.params.id, (err, doc) => {
            if(!err) {res.send(doc);}
                else { console.log(`Error en encontrar el empleado: `+ JSON.stringify(err, undefined, 2));}
        });
});

module.exports = router;
