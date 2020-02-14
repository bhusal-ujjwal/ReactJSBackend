const express = require('express');
const Novel = require('../models/Novels');

const router = express.Router();
router.route('/')
//retreveing all the novel from the database
.get((req,res,next)=>{
    Novel.find({})
    .then((novel)=>{
        status=200;
        res.json(novel);

    })
    .catch((err)=>next(err));

})
 //inserting  new novel to the database
.post((req,res,next)=>{
    Novel.create(req.body)
    .then((novel)=>{
        res.status=200;
        res.json(novel);
    })
    .catch((err) => next(err));



})
//cannot update all the  novel 
.put((req,res,next)=>{
    res.statusCode=201;
    res.json("You cannot update novel");

})
 //deleting  All novel from database
.delete((req,res,next)=>{
    Novel.deleteMany({})
    .then((novel)=>{
        res.json(novel);

    })
});

 //Getting particular novel by id from database
 router.route('/:id')
  .get((req,res,next)=>{
    Novel.findById(req.params.id)
    .populate('NovelCategory','category')
     .then((novel)=>{
        res.json(novel);
     })
     .catch((err) => next(err));
 })

 //cannot post the novel
 .post((req,res,next)=>{
     res.statusCode=201;
     res.json("You cannot add novel again on here");
 })
 //Updating the particular novel by id

 .put((req,res,next)=>{
    Novel.findByIdAndUpdate(req.params.id,{$set : req.body},{new:true})
     .then((novel)=>{
         res.json(novel);

     })
     .catch((err)=> next(err));
 })

 // Deleting particular novel by id

 .delete((req,res,next)=>{
    Novel.findByIdAndDelete(req.params.id)
     .then((novel)=>{
         res.json(novel);
     })
     .catch((err)=> next(err));
 })

module.exports= router;


