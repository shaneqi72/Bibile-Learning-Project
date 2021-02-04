require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const goldverseRouter = require('./routes/goldverse');

const port = 5500;

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
    console.log('connected to DB!'),
);

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRouter);

app.use('/goldverse', goldverseRouter);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
