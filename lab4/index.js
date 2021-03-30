//I pledge my honor that I have abided by the Stevens Honor System.
const movies = require('./data/movies');
const connection = require('./config/mongoConnection');
let { ObjectId } = require('mongodb');

async function main() {
    const db = await connection();

    try{
    //1.first movie created and 2.log
    const findingNemoo = await movies.create("Finding Nemoo",
    "Marlin, a clown fish, is overly cautious with his son, Nemo, who has a foreshortened fin. When Nemo swims too close to the surface to prove himself, he is caught by a diver, and horrified Marlin must set out to find him.",
    "PG", "1hr 40min","Family/Adventure",["Albert Brooks","Alexander Gould"],{director: "Andrew Stanton",
    yearReleased: 2003});
    console.log(findingNemoo);

    //3.second movie created
    const cinderella = await movies.create("Cinderella",
    "With a wicked stepmother and two jealous stepsisters who keep her enslaved and in rags, Cinderella (Ilene Woods) stands no chance of attending the royal ball. When her fairy godmother (Verna Felton) appears and magically transforms her reality into a dream come true, Cinderella enchants the handsome Prince Charming at the ball, but must face the wrath of her enraged stepmother and sisters when the spell wears off at midnight.",
    "PG", "1hr 16min","Family/Fantasy",["Eleanor Audley","Rhoda Williams","Lucille Bliss"],{director: " Clyde Geronimi",
    yearReleased: 1950});

    //4.query all movies and log
     allMovies = await movies.getAll();
     console.log(allMovies);
    
    //5.third movie created and 6.log
    const liloAndStitch = await movies.create("Lilo and Stitch",
    "A tale of a young girl's close encounter with the galaxy's most wanted extraterrestrial. Lilo is a lonely Hawaiian girl who adopts a small ugly dog whom she names Stitch. Stitch would be the perfect pet if he weren't in reality a genetic experiment who has escaped from an alien planet and crash-landed on Earth.",
    "PG", "1hr 25min","Family/Comedy",["Chris Sanders","Daveigh Chase"],{director: "Chris Sanders",
    yearReleased: 2002});
    console.log(liloAndStitch);

    //7.rename first movie and 8.log
    const findingNemo = await movies.rename(findingNemoo._id.toString(), "Finding Nemo");
    console.log(findingNemo);

    //9.remove second movie
    await movies.remove(cinderella._id.toString());

    //10.query and log all movies
    allMovies = await movies.getAll();
    console.log(allMovies);
    }
    catch(e){
        console.log(e);
    }
    
    //11.create movie with bad input
    try {
    const mulan = await movies.create("Mulan", "Fearful that her ailing father will be drafted into the Chinese military, Mulan takes his spot -- though, as a girl living under a patriarchal regime, she is technically unqualified to serve.",
    "PG", 1.28,"Musical/Adventure",["Ming-Na Wen","Eddie Murphy"],{director: "Tony Bancroft", yearReleased: 1998});
    console.log("should have errored");
    }
    catch(e){
        console.log(e);
    }

    //12.remove movies that does not exist
    try {
    await movies.remove("507f1f77bcf86cd799439011");
    console.log("should have errored");
    }
    catch(e){
        console.log(e);
    }

    //13.rename a movie that does not exist
    try {
    const toyStory2 = await movies.rename("507f1f77bcf86cd799439011", "Toy Story 2");
    console.log("should have errored");
    }
    catch(e){
        console.log(e);
    }

    //14.rename a movie with bad input
    try {
    const findingNemo2 = await movies.rename("hello", 2);
    console.log("should have errored");
    }
    catch(e){
        console.log(e);
    }

    //15.get a movie by an ID that does not exist
    try {
    const movieError = await movies.get("507f1f77bcf86cd799439011");
    console.log("should have errored");
    }
    catch(e){
        console.log(e);
    }
    await db.serverConfig.close();
}

try {
    main();
}
catch(e){
    console.log(e);
}