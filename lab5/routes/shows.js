//I pledge my honor that I have abided by the Stevens Honor System.
const axios = require('axios');
const express = require('express');
const router = express.Router();

async function getShows(){
    const { data } = await axios.get('http://api.tvmaze.com/shows');
    const parsedData = data; 
    return parsedData; 
}

async function getShowById(id){
    id=parseFloat(id);
    const { data } = await axios.get(`http://api.tvmaze.com/shows/${id}`);
    const parsedData = data; 
    return parsedData; 
}


router.get('/', async (req, res)=>{
    try{
        const allShows = await getShows();
        res.json(allShows);
    }
    catch(e){
        res.status(500).send();
    }
});

router.get('/:id', async (req, res)=>{
    try{
        const showById = await getShowById(req.params.id);
        res.json(showById);
    }
    catch(e){
        res.status(404).json({message: 'Show not found'});
    }
});

module.exports = router;