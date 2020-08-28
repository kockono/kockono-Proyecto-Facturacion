const { Router } = require('express');
const router = Router();
let catalogoCompleto = require('../models/catalogo');
let ObjectId = require('mongoose').Types.ObjectId;


router.post('/', async (req, res) => {

    let Catalogo = new catalogoCompleto ({

        tipo: req.body.tipo,
        division:req.body.division,
        grupo:req.body.grupo,
        clase:req.body.clase,
        clave:req.body.clave,

    });    
    await Catalogo.save((err, doc)=>{
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo datos catalogoCompleto' + JSON.stringify(err, undefined, 2));}
    });

    res.send(catalogoCompleto);
});

router.put('/:id', (req, res) => {
    
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontro la id: ${req.params.id}`);

    let producto =  {tipo, division, grupo, clase , clave} = req.body ;

    let ID = req.params.id;
    catalogoCompleto.findByIdAndUpdate(ID, {$set: producto}, {new:true},(err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el empleado: `+ JSON.stringify(err, undefined, 2));}

    })
})

router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No se encontro la id: ${req.params.id}`);

    catalogoCompleto.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el empleado: `+ JSON.stringify(err, undefined, 2));}
    });
});



router.get('/', (req,res) => {
    catalogoCompleto.find((err,doc) => {
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo catalogo' + JSON.stringify(err, undefined, 2));}
    });
});

module.exports = router;