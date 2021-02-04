const express = require('express');
const memebers = require('../../data/Memerbs');
const uuid = require('uuid');

const router = express.Router();

// Signup
router.post('/signup', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active',
    };

    if (!newMember.name || !newMember.email) {
        res.status(400).json({ message: 'Name and email are requied' });
    } else {
        memebers.push(newMember);
        res.json(memebers);
    }
});

// Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    res.json({ token: uuid.v4() });
});

module.exports = router;
