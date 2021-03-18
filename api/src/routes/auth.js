const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const db = require('../config/database');
const User = require('../models/User');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

// Signup
// router.post('/signup', async (req, res) => {
//     try {
//         // const salt = await bcrypt.genSalt();
//         // const hashedPassword = await bcrypt.hash(req.body.password, salt);
//         const { firstName, lastName, email, username } = req.body;
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);

//         User.create({
//             firstName: firstName,
//             lastName: lastName,
//             username: username,
//             password: hashedPassword,
//             email: email,
//         });
//         // const newUser = await User.create({
//         //     firstName: firstName,
//         //     lastName: lastName,
//         //     username: username,
//         //     password: hashedPassword,
//         //     email: email,
//         // });

//         res.status(201).send();
//     } catch {
//         res.status(500).send();
//     }
// });

router.post('/auth/signup', (req, res) => {
    const { firstName, lastName, email, username } = req.body;
    bcrypt
        .hash(req.body.password, 10)
        .then((hashedPassword) => {
            User.create({
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: hashedPassword,
                email: email,
            })
                .then((newUser) => {
                    res.status(201).send(newUser.username);
                })
                .catch((err) => res.send(err));
        })
        .catch((err) => res.send(err));
});

// Login
router.post('/auth/signin', async (req, res) => {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user === null) {
        return res.status(400).send('Cannot find user');
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success');
        } else {
            res.send('Not Allowed');
        }
    } catch {
        res.status(500).send();
    }
});

module.exports = router;
