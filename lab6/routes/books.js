//I pledge my honor that I have abided by the Stevens Honor System.
const express = require('express');
const router = express.Router();
const data = require('../data');
const connection = require('../config/mongoConnection');
const bookData = data.books;

router.get('/', async (req, res) => {
    try{
        const bookList = await bookData.getAll();
        res.status(200).json(bookList);
    }
    catch(e){
        res.status(500).send({error:e});
    }
});

router.post('/', async (req, res) => {
    const newBookData = req.body;
    if (!newBookData.title) {
        res.status(400).json({ error: 'You must provide book title' });
        return;
    }
    if (!newBookData.author) {
        res.status(400).json({ error: 'You must provide book author' });
        return;
    }
    if (!newBookData.genre) {
        res.status(400).json({ error: 'You must provide book genre' });
        return;
    }
    if (!newBookData.datePublished) {
        res.status(400).json({ error: 'You must provide book datePublished' });
        return;
    }
    if (!newBookData.summary) {
        res.status(400).json({ error: 'You must provide book summary' });
        return;
    }
    try{
        const {title, author, genre, datePublished, summary} = newBookData;
        const newPost = await bookData.create(title, author, genre, datePublished, summary);
        res.status(200).json(newPost);
    }
    catch(e){
        res.status(400).json({error: e});
    }
});

router.get('/:id', async (req, res) => {
    try {
      const getBookbyId = await bookData.getById(req.params.id);
      res.status(200).json(getBookbyId);
    } catch (e) {
        res.status(404).json({ error: 'Book not found' });
    }
  });

router.put('/:id', async (req, res) => {
    const updatedData = req.body;
    if (!updatedData.title||!updatedData.author||!updatedData.genre||!updatedData.datePublished||!updatedData.summary) {
        res.status(400).json({ error: 'You must provide all fields!' });
        return;
    }
    try{
        await bookData.getById(req.params.id);
    }
    catch(e){
        res.status(404).json({ error: 'Book not found' });
        return;
    }
    try {
        const updatedBook = await bookData.update(req.params.id, updatedData.title, updatedData.author, updatedData.genre, updatedData.datePublished, updatedData.summary);
        res.status(200).json(updatedBook);
    }
    catch(e){
        res.status(400).send({error: e});
    }
});

router.patch('/:id', async (req, res) => {
    try{
        await bookData.getById(req.params.id);
    }
    catch(e){
        res.status(404).json({ error: 'Book not found' });
        return;
    }
    const updatedBody = req.body;
    let updatedData = {};
    let updatedAuthor = {}
    const oldBook = await bookData.getById(req.params.id);
    if(updatedBody.title && updatedBody.title != oldBook.title){
        updatedData.title = updatedBody.title;
    }
    if(updatedBody.author && updatedBody.author.authorFirstName != oldBook.author.authorFirstName){
        updatedAuthor.authorFirstName = updatedBody.author.authorFirstName;
        updatedAuthor.authorLastName = updatedBody.author.authorLastName;
    }
    if(updatedBody.author && updatedBody.author.authorLastName != oldBook.author.authorLastName){
        updatedAuthor.authorFirstName = updatedBody.author.authorFirstName;
        updatedAuthor.authorLastName = updatedBody.author.authorLastName;
    }
    if(updatedBody.genre){
        for (x of updatedBody.genre){
            if (oldBook.genre.includes(x)===false){
                updatedData.genre = updatedBody.genre;
                break;
            }
        }
    } 
    if(updatedBody.datePublished && updatedBody.datePublished != oldBook.datePublished){
        updatedData.datePublished = updatedBody.datePublished;
    } 
    if(updatedBody.summary && updatedBody.summary != oldBook.summary){
        updatedData.summary = updatedBody.summary;
    }
    if(Object.keys(updatedAuthor).length>0){
        updatedData.author = updatedAuthor;
    }
    if (Object.keys(updatedData).length <1){
        res.status(400).json({error: 'Must update at least 1 field'});
        return;
    }
    try{
        const updatedBook = await bookData.update(req.params.id, updatedData.title, updatedData.author, updatedData.genre, updatedData.datePublished, updatedData.summary);
        res.status(200).json(updatedBook);
    }
    catch(e){
        res.status(400).send({error:e});
    }
});

router.delete('/:id', async (req, res) => {
    try{
        await bookData.getById(req.params.id);
    }
    catch(e){
        res.status(404).json({ error: 'Book not found' });
        return;
    }
    try {
      const deletedBook = await bookData.remove(req.params.id);
      res.status(200).json(deletedBook);
    } catch (e) {
        res.status(500).send({error: e});
    }
 });

module.exports = router;