//I pledge my honor that I have abided by the Stevens Honor System.
const express = require('express');
const router = express.Router();
const path=require('path');

router.get('/', async (req, res)=>{
    try{
        res.status(200).sendFile(path.resolve('static/home.html'));
    }
    catch(e){
        console.log(e);
        res.status(500).send();
    }
});


module.exports = router;