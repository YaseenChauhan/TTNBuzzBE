const express = require('express');
const router = express.Router();

router.get('/',(req,res,next) => {
    res.status(200).json({
        message : "complaints fetch successfully"
    })
})

router.post('/',(req,res,next) => {
    const complaint = {
        id : req.body.id,
        type : req.body.type,
        createdDate : req.body.createdDate
    }
    res.status(200).json({
        message : "complaints submitted successfully",
        complaint : complaint
    })
})

module.exports = router;