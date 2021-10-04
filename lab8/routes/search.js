//I pledge my honor that I have abided by the Stevens Honor System.
const axios = require('axios');
const express = require('express');
const router = express.Router();

function spaces(x){
    let b=true;
    for (const n in x){
        b = b && x[n]===" ";
    }
    return b;
}

async function searchShows(q){
    const { data } = await axios.get(`http://api.tvmaze.com/search/shows?q=${q}`);
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
        res.status(200).render('posts/home', {title: "Show Finder"});
    }
    catch(e){
        console.log(e);
        res.status(500).send();
    }
});

router.post('/search', async (req, res)=>{
    try{
        if (spaces(req.body.searchTerm)){
            res.status(400).render('posts/error', {error: "Error: Search term must be a non-empty string.", title: "Error"});
        }
        else{
        let foundShows = await searchShows(req.body.searchTerm);
        if (foundShows.length>20){
            foundShows=foundShows.slice(0,20);
        }
        res.status(200).render('posts/search', {shows: foundShows, searchTerm: req.body.searchTerm, title:"Shows Found"});
        }
    }
    catch(e){
        res.status(500).send();
    }
});

router.get('/shows/:id', async (req, res)=>{
    try{
        const showById = await getShowById(req.params.id);
        showById.summary = showById.summary.replaceAll(/<[^<>]+>/g,"");
        res.status(200).render('posts/index', {show:showById, title:showById.name});
    }
    catch(e){
        res.status(404).render('posts/error', {error: "Error: No shows found for this search term.", title: "Error"});
    }
});

module.exports = router;