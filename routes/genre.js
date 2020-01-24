const express = require('express');
const mongoose = require('mongoose');
const Genre = require('../models/genre');
const auth = require('../auth');
const router = express.Router();

router.route('/')
.get((req,res,next)=>{
    Genre.find({})
    .then((genre)=>{
        res.json(genre);
    })
    .catch(next);
})
.post((req,res,next)=>{
    Genre.create(req.body)
    .then((genre)=>{
        res.statusCode = 201;
        res.json(genre);
    })
    .catch(next);
})
.put((req,res,next)=>{
    res.statusCode = 405;
    res.json({ message: "Method not allowed" });
})
.delete(auth.verifyAdmin,(req,res,next)=>{
    Genre.deleteMany({})
    .then((genre)=>{
        res.json(genre);
    })
    .catch(next);
});

router.route('/:id')
.get((req, res, next) => {
    Genre.findOne({ author: req.user._id, _id: req.params.id })
        .then((genre) => {
            if (genre == null) throw new Error("Genre not found!")
            res.json(genre);
        }).catch(next);
})
.post((req,res,next)=>{
    res.statusCode = 405;
    res.send("Cannot post again!!!");
})

.put((req, res, next) => {
    Genre.findOneAndUpdate({ author: req.user._id, _id: req.params.id }, { $set: req.body }, { new: true })
        .then((genre) => {
            if (genre == null) throw new Error("Genre not found!");
            res.json(genre);
        }).catch(next);
})

.delete((req, res, next) => {
    Genre.findOneAndDelete({ author: req.user._id, _id: req.params.id })
        .then((genre) => {
            if (genre == null) throw new Error("Genre not found!");
            res.json(genre);
        }).catch(next);
});

module.exports = router;