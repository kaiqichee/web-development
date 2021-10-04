//I pledge my honor that I have abided by the Stevens Honor System.
const express = require('express');
const router = express.Router();

router.get('/', async (req, res)=>{
    try{
        res.status(200).render('layouts/main');
    }
    catch(e){
        res.status(500).send();
    }
});

module.exports = router;