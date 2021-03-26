require('dotenv').config();

const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const db = require('../config/database');
const User = require('../models/User');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    const user = {
        userName: username,
        email: email,
    };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
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
                    res.status(201).send({ token: accessToken });
                })
                .catch((err) => res.status(400).send(err));
        })
        .catch((err) => res.status(400).send(err));
});

// Login
router.post('/auth/signin', async (req, res) => {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user === null) {
        return res.status(400).send('Cannot find user');
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            // Login Success

            // 1. Get user already exists
            // 2. Generate payload
            // { userId: '123123', name: 'shane' }
            // 3. Generate jwt with secret
            // 4. res.send token

            const loginUser = {
                userName: req.body.username,
                password: user.password,
            };

            const accessToken = jwt.sign(loginUser, process.env.ACCESS_TOKEN_SECRET);

            res.send({
                token: accessToken,
            });
        } else {
            res.json({
                error: 'Not Allowed',
            });
        }
    } catch {
        res.status(500).send();
    }
});

//Verify Token

const verifyToken = (req, res, next) => {
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    const token = bearerHeader.split(' ')[1];

    if (bearerHeader == null) {
        res.sendStatus(403);
    }

    req.token = token;

    next();
};

router.post('/auth/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created',
                authData,
            });
        }
    });
});

module.exports = router;
