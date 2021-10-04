const express = require('express');
const router = express.Router();
const data = require('../data');
const songData = data.songs;
const schemas = require('../data/schemas');
const xss = require('xss');

router.get('/', async (req, res) => {
    try{
        const songList = await songData.getAllSongs();
        res.status(200).json(songList);
    }
    catch(e){
        res.status(500).send({error:e});
    }
});

router.get('/:id', async (req, res) => {
    try{
        const song = await songData.getSongById(xss(req.params.id));
        res.status(200).json(song);
    }
    catch(e){
        res.status(500).send({error:e});
    }
});

router.post('/', async (req, res) => {
    const updatedData = req.body;
    const result=schemas.songSchema.validate(updatedData);
    if(result.error){
        res.status(400).json({error:result.error});
        return;
    }
    let newSong=result.value;
    try {
        const addedSong = await songData.addSong(newSong);
        res.status(200).json(addedSong);
    }
    catch(e){
        res.status(500).send({error: e});
    }
});

router.put('/:id', async(req, res)=> {
    const updatedData = req.body;
    const result=schemas.songSchema.validate(updatedData);
    if(result.error){
        res.status(400).json({error:result.error});
        return;
    }
    let updatedInfo=result.value;
    try{
        await songData.getSongById(xss(req.params.id));
    }
    catch(e){
        res.status(404).json({ error: 'Song not found' });
        return;
    }
    try {
        const updatedSong = await songData.updateSong(xss(req.params.id), updatedInfo);
        res.status(200).json(updatedSong);
    }
    catch(e){
        res.status(500).send({error: e});
    }
});

router.patch('/:id', async (req, res) => {
    try{
        await songData.getSongById(xss(req.params.id));
    }
    catch(e){
        res.status(404).json({ error: 'Song not found' });
        return;
    }
    const updatedBody = req.body;
    const result=schemas.songSchema.validate(updatedBody);
    if(result.error){
        res.status(400).json({error:result.error});
        return;
    }
    let oldSong = await songData.getSongById(xss(req.params.id));
    let updatedInfo=result.value;
    let updatedData = {};
    if(updatedInfo.spotify_id && updatedInfo.spotify_id != oldSong.spotify_id){
        updatedData.spotify_id = updatedInfo.spotify_id;
    }
    if(updatedInfo.spotify_url && updatedInfo.spotify_url != oldSong.spotify_url){
        updatedData.spotify_url = updatedInfo.spotify_url;
    }
    if(updatedInfo.name && updatedInfo.name != oldSong.name){
        updatedData.name = updatedInfo.name;
    }
    if(updatedInfo.album_name && updatedInfo.album_name != oldSong.album_name){
        updatedData.album_name = updatedInfo.album_name;
    }
    if(updatedInfo.img && updatedInfo.img != oldSong.img){
        updatedData.img = updatedInfo.img;
    }
    if(updatedInfo.audio_features && updatedInfo.audio_features != oldSong.audio_features){
        updatedData.audio_features = updatedInfo.audio_features;
    }
    if(updatedInfo.user_ids){
        for (id of updatedInfo.user_ids){
            if (oldSong.user_ids.includes(id)===false){
                updatedData.user_ids = updatedInfo.user_ids;
                break;
            }
        }
    }
    if(updatedInfo.artists){
        for (artist of updatedInfo.artists){
            if (oldSong.artists.includes(id)===false){
                updatedData.artists = updatedInfo.artists;
                break;
            }
        }
    }
    if (Object.keys(updatedData).length <1){
        res.status(400).json({error: 'Must update at least 1 field'});
        return;
    }
    try{
        const updatedSong = await songData.updateSong(xss(req.params.id), updatedData);
        res.status(200).json(updatedSong);
    }
    catch(e){
        res.status(400).send({error:e});
    }
});

router.delete('/:id', async (req, res) => {
    try{
        await songData.getById(xss(req.params.id));
    }
    catch(e){
        res.status(404).json({ error: 'Song not found' });
        return;
    }
    try {
      const deletedSong = await songData.removeSong(xss(req.params.id));
      res.status(200).json(deletedSong);
    } catch (e) {
        res.status(500).send({error: e});
    }
});

module.exports = router;