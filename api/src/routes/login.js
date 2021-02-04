const express = require('express');
const memebers = require('../data/Memerbs');
const uuid = require('uuid');

const router = express.Router();

router.get('/', (req, res) => {
    res.send(memebers);
});

//Create Members
router.post('/', (req, res) => {
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

//Update Memebers
router.put('/:id', (req, res) => {
    const found = memebers.some((member) => member.id === parseInt(req.params.id));

    if (found) {
        const updatedMember = req.body;
        memebers.forEach((member) => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updatedMember.name ? updatedMember.name : member.name;
                member.email = updatedMember.email ? updatedMember.email : member.email;
            }
        });
    } else {
        res.status(400).json({ message: `No member with the id of ${req.params.id}` });
    }
});

module.exports = router;
