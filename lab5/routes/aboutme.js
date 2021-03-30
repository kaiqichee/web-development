//I pledge my honor that I have abided by the Stevens Honor System.
const express = require('express');
const router = express.Router();

let me = {
    "name": "Kaiqi Chee",
    "cwid": "10451613",
    "biography": "Hello my name is Kaiqi Chee, I'm from California but moved to Hoboken for college. It was fun until COVID happened then I had to move back home. I'm happy to be home with my family tho, but miss nj and seeing friends \n. I will hopefully be graduating next year then I'll either begin looking for work or go back to school for another degree. Either way it should be exciting and hopefully everything will be somewhat in person.",
    "favoriteShows": ["New Girl", "White Collar", "The Great British Bakeoff", "Sherlock"]
  };

router.get('/', async (req, res) => {
    try{
       res.json(me);
    }
    catch(e){
        res.status(500).send();
    }
});

module.exports = router;