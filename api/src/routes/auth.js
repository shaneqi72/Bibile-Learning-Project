require('dotenv').config();

const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const db = require('../config/database');
const User = require('../models/User');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let refreshToken = [];

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
                    res.status(201).json({
                        accessToken: accessToken,
                        id: newUser.id,
                        user: newUser,
                    });
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
            const refreshToken = jwt.sign(loginUser, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: '7d',
            });
            // refreshToken.push(refreshToken);

            res.json({
                accessToken: accessToken,
                id: user.id,
                user: user,
                refreshToken: refreshToken,
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
    const accessToken = bearerHeader.split(' ')[1];

    if (bearerHeader == null) {
        res.sendStatus(403);
    }

    req.token = accessToken;

    next();
};

router.get('/auth/api/user-profile', verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, async (err, authData) => {
        console.log(authData.userName);
        const user = await User.findOne({ where: { username: authData.userName } });
        console.log(user);
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                user,
            });
        }
    });
});

router.post('/auth/api/renewAccessToken', (req, res) => {
    const refreshToken = req.body.token;
    if (!refreshToken) {
        return res.status(403).json({ message: 'User not authenticated' });
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        console.log(user);
        if (err) {
            refreshToken.sendStatus(403).json({ message: 'User not authenticated' });
        } else {
            const authUser = {
                userName: user.username,
                password: user.password,
            };
            const accessToken = jwt.sign(authUser, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '20s',
            });
            return res.status(201).json({ accessToken });
        }
    });
});

module.exports = router;

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
