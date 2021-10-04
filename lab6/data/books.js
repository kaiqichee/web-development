//I pledge my honor that I have abided by the Stevens Honor System.
const mongoCollections = require('../config/mongoCollections');
const books = mongoCollections.books;
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

function dateCheck(date){
    if(typeof date !== 'string'){
        return false;
    }
    let d=date.split('/');
    if (d.length!=3){
        return false;
    }
    if(d[0]<1 || d[0]>12){
        return false;
    }
    else if(d[1]<1 || d[1]>31){
        return false;
    }
    else if(d[2].toString().length!=4){
        return false;
    }
    else{
        return true;
    }
}

function errorCheck(title, author, genre, datePublished, summary){
    if (title === undefined) throw 'Argument missing or undefined';
    else if (author === undefined) throw 'Argument missing or undefined';
    else if (genre === undefined) throw 'Argument missing or undefined';
    else if (datePublished === undefined) throw 'Argument missing or undefined';
    else if (summary === undefined) throw 'Argument missing or undefined';
    else if (typeof title !== 'string' || spaces(title)===true) throw 'Title must be a non-empty string';
    else if (typeof summary !== 'string' || spaces(summary)===true) throw 'Summary must be a non-empty string';
    else if (typeof datePublished !== 'string' || spaces(datePublished)===true) throw 'Date published must be a non-empty string';
    else if (dateCheck(datePublished)===false) throw 'Invalid date provided';
    else if (Array.isArray(genre) === false) throw 'Genre must be of type array';
    else if (genre.length < 1) throw 'Genre must have at least 1 item';
    else if (allStrings(genre)===false) throw 'All items in cast must be of type string';
    else if (typeof author !== 'object' || author === null || Array.isArray(author) === true) throw 'Author must be of type object';
    else if (author.authorFirstName === undefined) throw 'Author first name is undefined';
    else if (typeof author.authorFirstName !== 'string') throw 'Author first name must be of type string';
    else if (author.authorFirstName === "") throw 'Author first name cannot be an empty string';
    else if (spaces(author.authorFirstName)) throw 'Author first name cannot be only spaces';
    else if (author.authorLastName === undefined) throw 'Author last name is undefined';
    else if (typeof author.authorLastName !== 'string') throw 'Author last name must be of type string';
    else if (author.authorLastName === "") throw 'Author last name cannot be an empty string';
    else if (spaces(author.authorLastName)) throw 'Author last name cannot be only spaces';
}

function errorCheckUp(title, author, genre, datePublished, summary){
    if(title){
        if (typeof title !== 'string' || spaces(title)===true) throw 'Title must be a non-empty string';
    }
    if(author){
        if (typeof author !== 'object' || author === null || Array.isArray(author) === true) throw ':Author must be of type object';
        else if (author.authorFirstName === undefined) throw 'Author first name is undefined';
        else if (typeof author.authorFirstName !== 'string') throw 'Author first name must be of type string';
        else if (author.authorFirstName === "") throw 'Author first name cannot be an empty string';
        else if (spaces(author.authorFirstName)) throw 'Author first name cannot be only spaces';
        else if (author.authorLastName === undefined) throw 'Author last name is undefined';
        else if (typeof author.authorLastName !== 'string') throw 'Author last name must be of type string';
        else if (author.authorLastName === "") throw 'Author last name cannot be an empty string';
        else if (spaces(author.authorLastName)) throw 'Author last name cannot be only spaces';
    }
    if(genre){
        if (Array.isArray(genre) === false) throw 'Genre must be of type array';
        else if (genre.length < 1) throw 'Genre must have at least 1 item';
        else if (allStrings(genre)===false) throw 'All items in cast must be of type string';
    }
    if(datePublished){
        if (typeof datePublished !== 'string' || spaces(datePublished)===true) throw 'Date published must be a non-empty string';
        else if (dateCheck(datePublished)===false) throw 'Invalid date provided';
    }
    if(summary){
        if (typeof summary !== 'string' || spaces(summary)===true) throw 'Summary must be a non-empty string';
    }
}

async function create(title, author, genre, datePublished, summary){
    errorCheck(title, author, genre, datePublished, summary);
    const bookCollection = await books();
    let newBook ={
        title: title,
        author: author,
        genre: genre,
        datePublished: datePublished,
        summary: summary,
        reviews: []
    }
    const insertBook = await bookCollection.insertOne(newBook);
    if (insertBook === 0){
        throw 'Could not add book';
    }
    const newId = insertBook.insertedId;
    const book=await this.getById(newId.toString());
    book._id=book._id.toString();
    return book;
}

async function getAll(){
    const bookCollection = await books();
    const allBooks = await bookCollection.find({}, {projection: {_id:1,title:1}}).toArray();
    allBooks.map(x=>x._id=x._id.toString());
    return allBooks;
}

async function getById(id){
    if (id===undefined) throw 'Id not provided';
    else if (typeof id !== 'string') throw 'Id must be a string';
    else if (valid_id(id)===false) throw 'Id is not a valid ObjectId';
    id=ObjectId(id);
    const bookCollection = await books();
    const specificBook = await bookCollection.findOne({ _id: id });
    if (specificBook===null) {
        throw 'Book not found';
    }
    specificBook._id=specificBook._id.toString();
    return specificBook;
}

async function update(id, title, author, genre, datePublished, summary){
    if (id === undefined) throw 'Id is undefined';
    else if (typeof id !== 'string') throw 'Id must be a string';
    else if (valid_id(id)===false) throw 'Id is not a valid ObjectId';
    errorCheckUp(title, author, genre, datePublished, summary);
    id=ObjectId(id);
    const bookCollection = await books();
    const specificBook = await bookCollection.findOne({_id:id});
    if (specificBook === null){
        throw 'Book not found';
    }
    if (title === undefined){
        title=specificBook.title;
    }
    if (author === undefined){
        author=specificBook.author;
    }
    if (genre === undefined){
        genre=specificBook.genre;
    }
    if (datePublished === undefined){
        datePublished=specificBook.datePublished;
    }
    if(summary===undefined){
        summary=specificBook.summary;
    }
    if(genre!==undefined){
        for (g of genre){
            if (specificBook.genre.includes(g)===false){
                specificBook.genre.push(g);
            }
        }
    }
    let bookChanges = {
        title: title,
        author: author,
        genre: specificBook.genre,
        datePublished: datePublished,
        summary: summary,
        reviews: specificBook.reviews
    }
    const updatedBook = await bookCollection.updateOne({_id:id}, {$set:bookChanges});
    if (updatedBook === 0){
        throw 'Book could not be updated';
    }
    upBook=await getById(id.toString());
    upBook._id=upBook._id.toString();
    return upBook;
}

async function remove(id){
    if (id === undefined) throw 'Id is undefined';
    else if (typeof id !== 'string') throw 'Id must be a string';
    else if (valid_id(id)===false) throw 'Id is not a valid ObjectId';
    id=ObjectId(id);
    const bookCollection = await books();
    const deleteMovie = await bookCollection.deleteOne({_id:id});
    if (deleteMovie === 0){
        throw 'Book cannot be deleted';
    }
    const removed ={bookId:id.toString(), deleted: true};
    return removed;
}

module.exports ={
    create,
    getAll,
    getById,
    update,
    remove
}