const express = require('express');
const router = express.Router();
const sequelize = require('../config/database');
const User = require('../models/User');

//Getting All
router.get('/', (req, res) => {
    User.findAll()
        .then((users) => {
            console.log('users: ' + users);
            res.json(users);
        })
        .catch((err) => console.log(err));
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
