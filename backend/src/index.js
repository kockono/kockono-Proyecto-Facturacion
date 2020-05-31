const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/properties');
const connectLocalDB = require('./config/mongoDBLocal');
const app = express();
connectLocalDB(); // Conexion con la base de datos


app.use(cors({origin: 'http://localhost:4200'}));

app.use(express.json()); // parse application/json

app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

// Rutas
app.use('/api', require('./routes/login.routes'));
app.use('/recover', require('./controllers/email'));
app.use('/emisor', require('./controllers/datos-emisor'));
app.use('/emisor-prov', require('./controllers/datos-emisor-Prov'));
app.use('/emisor-fact', require('./controllers/datos-fact'));

// Servidor
app.listen(PORT, () => console.log(`Escuchando por el puerto ${PORT}`) );