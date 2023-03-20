var express = require('express');
var router = express.Router();
var Country=require('../model/Country')
var State=require('../model/State')

/* GET users listing. */
router.get('/', async function(req, res, next) {
   try{
      const country=await Country.find({}).populate('state').exec()
      res.json({country:country})
   }catch(err){
    next(err)
   }
});

router.post('/', async function(req, res, next) {
  try{
     const country=await Country.create(req.body)
     res.json({country})
  }catch(err){
   next(err)
  }
});

router.get('/sort/ascending', async function(req, res, next) {
  try{
     const country=await Country.find({}).sort('name').populate('state').exec()
    //  console.log(country)
     res.json({country})
  }catch(err){
   next(err)
  }
});


router.get('/sort/descending', async function(req, res, next) {
  try{
     const country=await Country.find({}).sort({name:-1}).populate('state').exec()
    //  console.log(country)
     res.json({country})
  }catch(err){
   next(err)
  }
});


router.get('/sort/population', async function(req, res, next) {
  try{
     const country=await Country.find({}).sort('population').populate('state').exec()
    //  console.log(country)
     res.json({country})
  }catch(err){
   next(err)
  }
});

router.get('/:id', async function(req, res, next) {
  var id=req.params.id
  try{
     const country=await Country.findById(id).populate('state').exec()
     res.json({country})
  }catch(err){
   next(err)
  }
});

router.put('/:id', async function(req, res, next) {
  var id=req.params.id
  try{
     const country=await Country.findByIdAndUpdate(id,req.body,{new:true})
     res.json({country})
  }catch(err){
   next(err)
  }
});

router.delete('/:id', async function(req, res, next) {
  var id=req.params.id
  try{
     const country=await Country.findByIdAndDelete(id)
     res.json({country})
  }catch(err){
   next(err)
  }
});

module.exports = router;
