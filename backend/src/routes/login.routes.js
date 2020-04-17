const { Router } = require('express');
const router = Router();
const Usuarios = require('../models/admins');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

router.post('/signup', async(req, res) => {

    const { email, password, oficina, altas, lectura, modificacion, bajas } = req.body;

    const newUser = new Usuarios ({
    email,
    password: bcryptjs.hashSync(password, 10),
    oficina,
    altas,
    lectura,
    modificacion, 
    bajas
    });

    await newUser.save();

    const token = jwt.sign({_id: newUser._id}, 'secreto')
    res.status(200).json({token})
});

router.post('/signin', async(req, res) => {
    const { email, password} = req.body;

    const user = await Usuarios.findOne({email})
    if(!user) return res.status(401).send("El Email No Existe");
    
    const passCorrecto = await bcryptjs.compare(password, user.password);
   
    if(!passCorrecto) {
        return res.status(400).json({msg: 'Password Incorrecto' })
    }
    // if(password !== passCorrecto) return res.status(401).send("Contraseña Erronea");

    const token = jwt.sign({_id: user._id}, 'secreto');
    return res.status(200).json({token});
});

router.get('/profile', verifyToken, (req,res) => {
    res.send(req.userId);
})

function verifyToken(req, res, next) {
    if(!req.headers.authorization){
        return res.status(401).send('Anuthorize Request');
    }
    const token = req.headers.authorization.split(' ')[1];
    if(token === 'null') {
        return res.status(401).send('Anauthorize Request');
    }
    const payload = jwt.verify(token, 'secreto');
    req.userId = payload._id;
    next();
}

module.exports = router;