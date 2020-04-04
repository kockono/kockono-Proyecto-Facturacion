const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/properties');
const connectLocalDB = require('./config/mongoDBLocal');

connectLocalDB();

const app = express();

app.use(cors({origin: 'http://localhost:4200'}));

app.use(express.json()); // parse application/json

app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded


app.use(require('./routes/login.routes')); //app.use('/api', require('./routes/login.routes'));1
app.use('/empresa', require('./controllers/datosEmpresa'))
app.listen(PORT, () => console.log(`Escuchando por el puerto ${PORT}`) );