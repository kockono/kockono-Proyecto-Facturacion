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
app.use('/clientes', require('./controllers/datos-clientes'));
app.use('/provedores', require('./controllers/datos-provedor'));
app.use('/facturas', require('./controllers/datos-facturas'));
app.use('/datos-mi-empresa', require('./controllers/datos-mi-empresa'))

// Servidor
app.listen(PORT, () => console.log(`Escuchando por el puerto ${PORT}`) );