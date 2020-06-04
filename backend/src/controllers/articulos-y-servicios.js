const { Router } = require('express');
const router = Router();
let ObjectId = require('mongoose').Types.ObjectId;
let articulosServicios  = require('../models/articulos-y-servicios');

router.post('/', (req, res) => {

    let articuloServicio = new articulosServicios ({

        articuloServicio:req.body.articuloServicio,
        nombre:req.body.nombre,
        precio:req.body.precio,
        uMed:req.body.uMed
    });

    
    articuloServicio.save((err, doc)=>{
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo articulos y servicios' + JSON.stringify(err, undefined, 2));}
    });
});

router.put('/:id', (req, res) => {
    
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontro la id: ${req.params.id}`);

        let articuloServicio =  ({

            articuloServicio:req.body.articuloServicio,
            nombre:req.body.nombre,
            precio:req.body.precio,
            uMed:req.body.uMed
        });

    let ID = req.params.id;
    articulosServicios.findByIdAndUpdate(ID, {$set: articuloServicio}, {new:true},(err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el empleado: `+ JSON.stringify(err, undefined, 2));}

    })
})

router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No se encontro la id: ${req.params.id}`);

    articulosServicios.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el articulo o servicio: `+ JSON.stringify(err, undefined, 2));}
    });
});

router.get('/', (req,res) => {
    articulosServicios.find((err,doc) => {
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo articulos y servicios' + JSON.stringify(err, undefined, 2));}
    });
});

router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontro la id: ${req.params.id}`);

        datosMiEmpresa.findById(req.params.id, (err, doc) => {
            if(!err) {res.send(doc);}
                else { console.log(`Error en encontrar el articulo o servicio: `+ JSON.stringify(err, undefined, 2));}
        });
});

module.exports = router;