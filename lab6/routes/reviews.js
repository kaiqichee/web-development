//I pledge my honor that I have abided by the Stevens Honor System.
const express = require('express');
const router = express.Router();
const data = require('../data');
const revData = data.reviews;
const bookData = data.books;


router.get('/:id', async (req, res) => {
  try{
    await bookData.getById(req.params.id);
  }
  catch(e){
    res.status(404).json({ error: 'Book not found' });
    return;
  }
  try{
    const getRevs = await revData.getByBookId(req.params.id);
    res.status(200).json(getRevs);
  }
  catch(e){
    res.status(404).json({error:e});
  }
});

router.post('/:id', async (req, res) => {
    const bookPostData = req.body;
    if (!bookPostData.title) {
      res.status(400).json({ error: 'You must provide book title' });
      return;
    }
    if (!bookPostData.reviewer) {
      res.status(400).json({ error: 'You must provide book author' });
      return;
    }
    if (!bookPostData.rating) {
      res.status(400).json({ error: 'You must provide book genre' });
      return;
    }
    if (!bookPostData.dateOfReview) {
      res.status(400).json({ error: 'You must provide date of review' });
      return;
    }
    if (!bookPostData.review) {
      res.status(400).json({ error: 'You must provide book summary' });
      return;
    }
    try{
      await bookData.getById(req.params.id);
    }
    catch(e){
      res.status(400).json({ error: 'Book not found' });
      return;
    }
    try{
        const {title, reviewer, rating, dateOfReview, review} = bookPostData;
        const newRev = await revData.create(req.params.id, title, reviewer, rating, dateOfReview, review);
        res.status(200).json(newRev);
    }
    catch(e){
        res.status(400).json({error:e});
    }
});

router.get('/review/:id', async (req, res) => {
    try {
      const revById = await revData.getByRevId(req.params.id);
      res.status(200).json(revById);
    } catch (e) {
      res.status(404).json({ error: 'Review not found'});
    }
});

router.delete('/:id', async (req, res) => {
  try {
    const rev = await revData.getByRevId(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Review not found' });
    return;
  }
  try {
    const deletedRev = await revData.remove(req.params.id);
    res.status(200).json(deletedRev);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;

