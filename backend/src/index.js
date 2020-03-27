const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/properties');
const connectLocalDB = require('./config/mongoDBLocal');

connectLocalDB();

const app = express();

app.use(cors({origin: 'http://localhost:4200'}));

app.use(express.json()); // parse application/json

app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

// app.use('/empleados', require('./controllers/controlerUsers'));
app.use('/api', require('./routes/login.routes'));

app.listen(PORT, () => console.log(`Escuchando por el puerto ${PORT}`) );