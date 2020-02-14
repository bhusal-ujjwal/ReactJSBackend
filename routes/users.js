const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const router = express.Router();
const auth = require('../auth');

router.post('/signup', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            let err =  new Error('Could not hash!');
		err.status = 500;
		return next(err);
        }
        User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            address: req.body.address,
            phoneno:req.body.phoneno,
            email: req.body.email,
            username: req.body.username,
            password: hash
        }).then((user) => {
            let token = jwt.sign({ _id: user._id }, process.env.SECRET);
            res.json({ status: "Signup done successfully!", token: token });
        }).catch(next);
    });
});

router.post('/login', (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (user == null) {
                let err = new Error('User not found!');
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({ _id: user._id }, process.env.SECRET);
                        res.json({ status: 'Login successfully!', token: token });
                    }).catch(next);
            }
        }).catch(next);
})

router.get('/me', auth.verifyUser, (req, res, next) => {
    res.json({ _id: req.user._id, firstname: req.user.firstname, lastname: req.user.lastname, address: req.user.address,phoneno:req.user.phoneno,email: req.user.email, username: req.user.username, image: req.user.image });
});

router.put('/me', auth.verifyUser, (req, res, next) => {
    User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true })
        .then((user) => {
            res.json({ _id: user._id, firstname: req.user.firstname, lastname: req.user.lastname, address: req.user.address,phoneno:req.user.phoneno,email: req.user.email,username: user.username, image: user.image });
        }).catch(next);
});
router.delete('/me', auth.verifyUser, (req, res, next) => {
    User.findByIdAndDelete(req.user._id)
        .then((user) => {
            res.json({ status: 'User deleted!', user: user })
        }).catch(next);
});
router.delete('/:userId', auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
    User.findByIdAndDelete(req.params.userId)
        .then((user) => {
            res.json({ status: 'User deleted!', user: user });
        }).catch(next);
});
router.get('/all', auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
    User.find()
        .then((users) => {
            res.json(users);
        }).catch(next);
});

module.exports = router;
