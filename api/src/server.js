require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5500;
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
    console.log('connected to DB!'),
);

app.use(bodyParser.json());
app.use(cors());

const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

const goldVerseRouter = require('./routes/goldverse');
app.use('/goldVerse', goldVerseRouter);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
