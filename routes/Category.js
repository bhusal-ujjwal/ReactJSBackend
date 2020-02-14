const express = require('express');
const mongoose = require('mongoose');
const NovelCategory = require('../models/Category');
const auth = require('../auth');
const router = express.Router();

router.route('/')
.get((req,res,next)=>{
    NovelCategory.find({})
    .then((category)=>{
        res.json(category);
    })
    .catch(next);
})
.post(auth.verifyUser,(req,res,next)=>{
    NovelCategory.create(req.body)
    .then((category)=>{
        res.statusCode = 201;
        res.json(category);
    })
    .catch(next);
})
.put((req,res,next)=>{
    res.statusCode = 405;
    res.json({ message: "Method not allowed" });
})
.delete((req,res,next)=>{
    NovelCategory.deleteMany({})
    .then((category)=>{
        res.json(category);
    })
    .catch(next);
});

router.route('/:id')
.get((req, res, next) => {
    NovelCategory.findOne({ _id: req.params.id })
        .then((category) => {
            res.json(category);
        }).catch(next);
})
.put((req, res, next) => {
    NovelCategory.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then((category) => {
            res.json(category);
        }).catch(next);
})
.delete((req, res, next) => {

    NovelCategory.findByIdAndDelete(req.params.id)
        .then((category) => {
            res.json(category);
        }).catch(next);
});

module.exports = router;