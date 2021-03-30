//I pledge my honor that I have abided by the Stevens Honor System.
const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;
let { ObjectId } = require('mongodb');

function valid_id(id){
    try {
    let parsedId = ObjectId(id);
    return true;
    }
    catch (e){
        return false;
    }
}

function spaces(x){
    let b=true;
    for (const n in x){
        b = b && x[n]===" ";
    }
    return b;
}

function allStrings(x){
    let b=true;
    for (const n in x){
        b = b&&(typeof x[n]==='string');
    }
    return b;
}

function errorCheck(title, plot, rating, runtime, genre, cast, info){
    if (title === undefined) throw 'Error: Argument missing or undefined';
    else if (plot === undefined) throw 'Error: Argument missing or undefined';
    else if (rating === undefined) throw 'Error: Argument missing or undefined';
    else if (runtime === undefined) throw 'Error: Argument missing or undefined';
    else if (genre === undefined) throw 'Error: Argument missing or undefined';
    else if (cast === undefined) throw 'Error: Argument missing or undefined';
    else if (info === undefined) throw 'Error: Argument missing or undefined';
    else if (typeof title !== 'string' || spaces(title)===true) throw 'Error: Title must be a non-empty string';
    else if (typeof plot !== 'string' || spaces(plot)===true) throw 'Error: Plot must be a non-empty string';
    else if (typeof rating !== 'string' || spaces(rating)===true) throw 'Error: Rating must be a non-empty string';
    else if (typeof runtime !== 'string' || spaces(runtime)===true) throw 'Error: Runtime must be a non-empty string';
    else if (typeof genre !== 'string' || spaces(genre)===true) throw 'Error: Genre must be a non-empty string';
    else if (Array.isArray(cast) === false) throw 'Error: Cast must be of type array';
    else if (cast.length < 1) throw 'Error: Cast must have at least 1 item';
    else if (allStrings(cast)===false) throw 'Error: All items in cast must be of type string';
    else if (typeof info !== 'object' || info === null || Array.isArray(info) === true) throw 'Error: Info must be of type object';
    else if (info.director === undefined) throw 'Error: Director is undefined';
    else if (typeof info.director !== 'string') throw 'Error: Director must be of type string';
    else if (info.director === "") throw 'Error: Director cannot be an empty string';
    else if (info.yearReleased === undefined) throw 'Error: Year released is undefined';
    else if (info.yearReleased.toString().length < 4) throw 'Error: Year release must be 4 digits';
    else if (info.yearReleased < 1930 || info.yearReleased>new Date().getFullYear()+5) throw 'Error: Year release is outside valid range';
}

async function create(title, plot, rating, runtime, genre, cast, info){
    errorCheck(title, plot, rating, runtime, genre, cast, info );
    const movieCollection = await movies();
    let newMovie ={
        title: title,
        plot: plot,
        rating: rating,
        runtime: runtime,
        genre: genre,
        cast: cast,
        info: info
    }
    const insertMovie = await movieCollection.insertOne(newMovie);
    if (insertMovie === 0){
        throw 'Error: Could not add movie';
    }
    const newId = insertMovie.insertedId;
    const movie=await this.get(newId.toString());
    movie._id=movie._id.toString();
    return movie;
}

async function getAll(){
    const movieCollection = await movies();
    const allMovies = await movieCollection.find({}).toArray();
    allMovies.map(x=>x._id=x._id.toString());
    return allMovies;
}

async function get(id){
    if (id === undefined) throw 'Error: Id is undefined';
    else if (typeof id !== 'string') throw 'Error: Id must be a string';
    else if (valid_id(id)===false) throw 'Error: Id is not a valid ObjectId';
    id=ObjectId(id);
    const movieCollection = await movies();
    const specificMovie = await movieCollection.findOne({_id:id});
    if (specificMovie===null) {
        throw 'Error: No movie with given Id';
    }
    specificMovie._id=specificMovie._id.toString();
    return specificMovie;
}

async function remove(id){
    if (id === undefined) throw 'Error: Id is undefined';
    else if (typeof id !== 'string') throw 'Error: Id must be a string';
    else if (valid_id(id)===false) throw 'Error: Id is not a valid ObjectId';
    const movieCollection = await movies();
    id=ObjectId(id);
    const movRemove=await get(id.toString());
    const title =movRemove.title;
    const deleteMovie = await movieCollection.deleteOne({_id:id});
    if (deleteMovie === 0){
        throw 'Error: Movie cannot be deleted';
    }
    return `${title} has been successfully deleted`;
}

async function rename(id, newTitle){
    if (id === undefined) throw 'Error: Id is undefined';
    else if (typeof id !== 'string') throw 'Error: Id must be a string';
    else if (valid_id(id)===false) throw 'Error: Id is not a valid ObjectId';
    else if (newTitle === undefined) throw 'Error: New title is undefined';
    else if (typeof newTitle !== 'string') throw 'Error: New title must be a string';
    const movieCollection = await movies();
    id=ObjectId(id);
    const specificMovie = await movieCollection.findOne({_id:id});
    if (specificMovie === null){
        throw 'Error: No movie with given Id';
    }
    let renamedMovie = {
        title: newTitle,
        plot: specificMovie.plot,
        rating: specificMovie.rating,
        runtime: specificMovie.runtime,
        genre: specificMovie.genre,
        cast: specificMovie.cast,
        info: specificMovie.info

    }
    const updatedMovie = await movieCollection.updateOne({_id:id}, {$set:renamedMovie});
    if (updatedMovie === 0){
        throw 'Error: Movie could not be updated';
    }
    upMov=await get(id.toString());
    upMov._id=upMov._id.toString();
    return upMov;
}

module.exports ={
    create,
    getAll,
    get,
    remove,
    rename,
}