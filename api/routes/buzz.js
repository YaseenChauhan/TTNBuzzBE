const express = require('express');
const router = express.Router();

const buzzs = [
    {id:1,type:'activity',createdDate : new Date()},
    {id:2,type:'lost',createdDate : new Date()},
    {id:3,type:'activity',createdDate : new Date()}
]

router.get('/',(req,res,next) =>{
    res.status(200).json({
        message : "get working fine",
        data : buzzs
    })
})
router.post('/',(req,res,next) =>{
    const buzz = {
        id : req.body.id,
        type : req.body.type,
        createdDate : req.body.createdDate
    }
    buzzs.push(buzz);
    console.log(buzzs);
    res.status(201).json({
        message : "post working fine"
    })
})
router.get('/:buzzId',(req,res,next) =>{
    const id = req.params.buzzId;
    if(id === '123'){
        res.status(200).json({
            message : "successfully found!"
        })
    }
    else{
         res.status(200).json({
            message : "oops! not found"
        })
        
    }
    
})
module.exports = router;