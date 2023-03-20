var express = require('express');
var router = express.Router();
var Country=require('../model/Country')
var State=require('../model/State')

/* GET users listing. */
router.get('/', async function(req, res, next) {
   try{
      const state=await State.find({}).populate('country').exec()
      res.json({state})
   }catch(err){
    next(err)
   }
});



router.get('/sort/ascending', async function(req, res, next) {
  try{
     const state=await State.find({}).sort('name').populate('country').exec()
     res.json({state})
  }catch(err){
   next(err)
  }
});


router.get('/sort/descending', async function(req, res, next) {
  try{
     const state=await State.find({}).sort({name:-1}).populate('country').exec()
    //  console.log(state)
     res.json({state})
  }catch(err){
   next(err)
  }
});


router.get('/sort/population', async function(req, res, next) {
  try{
     const state=await State.find({}).sort('population').populate('country').exec()
    //  console.log(state)
     res.json({state})
  }catch(err){
   next(err)
  }
});

router.get('/:id', async function(req, res, next) {
  var id=req.params.id
  try{
     const state=await State.findById(id).populate('country').exec()
     res.json({state})
  }catch(err){
   next(err)
  }
});

router.post('/:id', async function(req, res, next) {
    var id=req.params.id
    req.body.country=id
    console.log(req.body)
    try{
       const state=await State.create(req.body)
       const country=await Country.findByIdAndUpdate(id,{$push:{state:state._id}})
       res.json({state,country})
    }catch(err){
     next(err)
    }
  });

router.put('/:id', async function(req, res, next) {
  var id=req.params.id
  try{
     const state=await State.findByIdAndUpdate(id,req.body,{new:true})
     res.json({state})
  }catch(err){
   next(err)
  }
});

router.delete('/:id', async function(req, res, next) {
  var id=req.params.id
  try{
     const state=await State.findByIdAndDelete(id)
     const country=await Country.findByIdAndUpdate(state.country,{$pull:{state:state._id}})
     res.json({state,country})
  }catch(err){
   next(err)
  }
});

module.exports = router;