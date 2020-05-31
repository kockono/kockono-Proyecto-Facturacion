const { Router } = require('express');
const router = Router();
let ObjectId = require('mongoose').Types.ObjectId;
let provedorBackup = require('../backup/datos-provedor')
let datosProvedor  = require('../models/datos-provedor');

router.post('/', (req, res) => {

    let empresa = new datosProvedor ({

        nombreDeLaEmpresa: req.body.nombreDeLaEmpresa,
        email: req.body.email,
        metodo:req.body.metodo,
        razon:req.body.razon,
        dias:req.body.dias,
        estatus:req.body.estatus,
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

    let empresaBackup = new provedorBackup ({

        nombreDeLaEmpresa: req.body.nombreDeLaEmpresa,
        email: req.body.email,
        calle: req.body.calle,
        metodo:req.body.metodo,
        razon:req.body.razon,
        dias:req.body.dias,
        estatus:req.body.estatus,
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
    empresaBackup.save();
    
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
            metodo:req.body.metodo,
        razon:req.body.razon,
        dias:req.body.dias,
        estatus:req.body.estatus,
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
    datosProvedor.findByIdAndUpdate(ID, {$set: empresa}, {new:true},(err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el empleado: `+ JSON.stringify(err, undefined, 2));}

    })
})

router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No se encontro la id: ${req.params.id}`);

    datosProvedor.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el empleado: `+ JSON.stringify(err, undefined, 2));}
    });
});

router.get('/', (req,res) => {
    datosProvedor.find((err,doc) => {
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo datosProvedor' + JSON.stringify(err, undefined, 2));}
    });
});

router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontro la id: ${req.params.id}`);

        datosProvedor.findById(req.params.id, (err, doc) => {
            if(!err) {res.send(doc);}
                else { console.log(`Error en encontrar el empleado: `+ JSON.stringify(err, undefined, 2));}
        });
});

module.exports = router;
