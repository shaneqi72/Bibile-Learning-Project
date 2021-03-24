require('dotenv').config();

const express = require('express');
const router = express.Router();
const sequelize = require('../config/database');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

//Middleware AuthenticateToken

const authenticateToken = (req, res, next) => {
    // const { authorization } = req.headers;
    const bearerHeader = req.headers['authorization'];
    const token = bearerHeader && bearerHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    req.token = token;
    next();
};

//Getting All
router.get('/', authenticateToken, (req, res) => {
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            User.findAll()
                .then((users) => {
                    res.json(users.filter((user) => user.username === data.userName));
                })
                .catch((err) => console.log(err));
        }
    });
});

// //Getting one
// router.get('/:id', (req, res) => {
//     const found = goldVerse.some((verse) => verse.id === parseInt(req.params.id));

//     if (found) {
//         res.status(201).json(goldVerse.filter((verse) => verse.id === parseInt(req.params.id)));
//     } else {
//         res.status(400).json({ message: 'the requested verse is not available' });
//     }
// });

// //Creating one
// router.patch('/:id', (req, res) => {});

// //Updating one
// router.post('/', (req, res) => {
//     res.send('We are on login page');
// });

// //Delete one
// router.delete('/:id', (req, res) => {
//     res.send('We are on login page');
// });

module.exports = router;
