const { Router } = require('express');
const Usuarios = require('../models/admins');
const jwt = require('jsonwebtoken');
const router = Router();
const bcrypt = require('bcryptjs');


router.get('/', (req,res) => {
    res.send('Hola Mundo')
});

router.post('/signup', async(req, res) => {

    const { email, password, oficina, altas, lectura, modificacion, bajas } = req.body;

    const newUser = new Usuarios ({
    email,
    password: bcrypt.hashSync(password, 10),
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
    if(user.password !== password) return res.status(401).send("Contraseña Erronea");

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