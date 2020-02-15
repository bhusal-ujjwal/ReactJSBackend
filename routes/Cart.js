const express = require('express');
const Cart = require('../models/cart');
const auth = require("../auth");

const router = express.Router();


router.post("/",auth.verifyUser,(req,res,next)=>{
    let cart = new Cart(req.body);
    cart.usercart = req.user;
    cart.save().then((cart)=>{
        res.statusCode = 201;
        res.json(cart);
    }).catch(next);
})


router.get("/",auth.verifyUser,(req,res, next)=>{
    Cart.find({usercart:req.user._id})
    .then((cart)=>{
        res.json(cart);
    }).catch((error)=>next(error))
})

router.route('/')
    .put((req, res) => {
        res.statusCode = 405;
        res.json({ message: "Method not supported" });
    })
    .delete((req, res, next) => {
        Cart.deleteMany({ usercart: req.user._id })
            .then((reply) => {
                res.json(reply);
            }).catch(next);
    });

router.route('/:id')
    .get((req, res, next) => {
        Cart.findOne({ usercart: req.user._id, _id: req.params.id })
            .then((cart) => {
                if (cart == null) throw new Error("Cart not found!")
                res.json(task);
            }).catch(next);
    })
    .post((req, res) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed" });
    })
    .put((req, res, next) => {
        Cart.findOneAndUpdate({ usercart: req.user._id, _id: req.params.id }, { $set: req.body }, { new: true })
            .then((cart) => {
                if (cart == null) throw new Error("Cart not found!");
                res.json(cart);
            }).catch(next);
    })
    .delete((req, res, next) => {
        Cart.findOneAndDelete({ user: req.user._id, _id: req.params.id })
            .then((cart) => {
                if (cart == null) throw new Error("Cart not found!");
                res.json(cart);
            }).catch(next);
    });


module.exports = router;