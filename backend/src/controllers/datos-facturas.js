const { Router } = require('express');
const router = Router();
let ObjectId = require('mongoose').Types.ObjectId;
let facturas  = require('../models/datos-facturas');

router.post('/', (req, res) => {

    let empresa = new facturas ({

        nombreDeLaEmpresa: req.body.nombreDeLaEmpresa,
        metodo:req.body.metodo,
        forma:req.body.forma,
        cfdi:req.body.cfdi,
        razon:req.body.razon,
        estatus:req.body.estatus,
        fecha:req.body.fecha,
        monto:req.body.monto,
        folio:req.body.folio,
        /* Nuevos campos agregados en base a la factura ejemplo */
        ordenDeCompra:req.body.ordenDeCompra,
        condiciones:req.body.condiciones,	
        vendedor:req.body.vendedor,
        viaDeEmbarque:req.body.viaDeEmbarque,
        unidades:req.body.unidades,
        articulo:req.body.articulo,	
        nombre:req.body.nombre,
        precio:req.body.precio,
        descuento:req.body.descuento,
        uMed:req.body.uMed,
        importe:req.body.importe,	
        subtotal:req.body.subtotal,
        total:req.body.total,
        iva:req.body.iva,
        /*Nuevo*/
        artarr:req.body.artarr,

        fechaExpir:req.body.fechaExpir,
        dineroRest:req.body.dineroRest,

        abono:req.body.abono
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
            metodo:req.body.metodo,
            forma:req.body.forma,
            cfdi:req.body.cfdi,
            razon:req.body.razon,
            estatus:req.body.estatus,
            fecha:req.body.fecha,
            monto:req.body.monto,
            folio:req.body.folio,
            /* Nuevos campos agregados en base a la factura ejemplo */
            ordenDeCompra:req.body.ordenDeCompra,
            condiciones:req.body.condiciones,	
            vendedor:req.body.vendedor,
            viaDeEmbarque:req.body.viaDeEmbarque,
            unidades:req.body.unidades,
            articulo:req.body.articulo,	
            nombre:req.body.nombre,
            precio:req.body.precio,
            descuento:req.body.descuento,
            uMed:req.body.uMed,
            importe:req.body.importe,	
            subtotal:req.body.subtotal,
            total:req.body.total,
            iva:req.body.iva,
            /*Nuevo*/
            artarr:req.body.artarr,

            fechaExpir:req.body.fechaExpir,
            dineroRest:req.body.dineroRest,

            abono:req.body.abono

        });

    let ID = req.params.id;
    facturas.findByIdAndUpdate(ID, {$set: empresa}, {new:true},(err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el empleado: `+ JSON.stringify(err, undefined, 2));}

    })
})

router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No se encontro la id: ${req.params.id}`);

    facturas.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el empleado: `+ JSON.stringify(err, undefined, 2));}
    });
});

router.get('/', (req,res) => {
    facturas.find((err,doc) => {
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo facturas' + JSON.stringify(err, undefined, 2));}
    });
});

router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontro la id: ${req.params.id}`);

       facturas.findById(req.params.id, (err, doc) => {
            if(!err) {res.send(doc);}
                else { console.log(`Error en encontrar el empleado: `+ JSON.stringify(err, undefined, 2));}
        });
});

module.exports = router;
