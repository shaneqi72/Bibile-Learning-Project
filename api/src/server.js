const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/auth');
const goldverseRouter = require('./routes/goldverse');
const port = 5500;

//Database
const sequelize = require('./config/database');

app.get('/', (req, res) => res.send('This is homepage'));

app.use(bodyParser.json());
app.use(cors());
app.use('/', authRouter);
app.use('/goldverse', goldverseRouter);

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
