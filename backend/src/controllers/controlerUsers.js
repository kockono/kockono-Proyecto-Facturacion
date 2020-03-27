const express = require('express');
let router = express.Router();
let ObjectId = require('mongoose').Types.ObjectId;


let  empleados  = require('../models/admins');

router.get('/', (req,res) => {
    empleados.find((err,doc) => {
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo empleados' + JSON.stringify(err, undefined, 2));}
    });
    
});

router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontro la id: ${req.params.id}`);

        empleados.findById(req.params.id, (err, doc) => {
            if(!err) {res.send(doc);}
                else { console.log(`Error en encontrar el empleado: `+ JSON.stringify(err, undefined, 2));}
        });
});


router.post('/', (req, res) => {
    let emp = new empleados ({
        nombre: req.body.nombre,
        posicion: req.body.posicion,
        office: req.body.office,
        rfc: req.body.rfc,
        direccion: req.body.direccion
    });
    emp.save((err, doc)=>{
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo empleados' + JSON.stringify(err, undefined, 2));}
    });
});

router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontro la id: ${req.params.id}`);

    let emp = ({
        nombre: req.body.nombre,
        posicion: req.body.posicion,
        office: req.body.office,
        salario: req.body.salario,
        direccion: req.body.direccion
    });
    let ID = req.params.id;
    empleados.findByIdAndUpdate(ID, {$set: emp}, {new:true},(err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el empleado: `+ JSON.stringify(err, undefined, 2));}

    })
})

router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No se encontro la id: ${req.params.id}`);

    empleados.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el empleado: `+ JSON.stringify(err, undefined, 2));}
    });
});


module.exports = router;