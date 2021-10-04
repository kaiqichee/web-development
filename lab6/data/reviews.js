//I pledge my honor that I have abided by the Stevens Honor System.
const mongoCollections = require('../config/mongoCollections');
const reviews = mongoCollections.reviews;
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

function errorCheck(bookId, title, reviewer, rating, dateOfReview, review){
    if (valid_id(bookId)===false) throw 'Id is not a valid ObjectId';
    else if (bookId === undefined) throw 'Argument missing or undefined';
    else if (title === undefined) throw 'Argument missing or undefined';
    else if (reviewer === undefined) throw 'Argument missing or undefined';
    else if (rating === undefined) throw 'Argument missing or undefined';
    else if (dateOfReview === undefined) throw 'Argument missing or undefined';
    else if (review === undefined) throw 'Argument missing or undefined';
    else if (typeof bookId !== 'string' || spaces(bookId)===true) throw 'Id must be a non-empty string';
    else if (typeof title !== 'string' || spaces(title)===true) throw 'Title must be a non-empty string';
    else if (typeof review !== 'string' || spaces(review)===true) throw 'Review must be a non-empty string';
    else if (typeof reviewer !== 'string' || spaces(reviewer)===true) throw 'Reviewer must be a non-empty string';
    else if (typeof dateOfReview !== 'string' || spaces(dateOfReview)===true) throw 'Date of review must be a non-empty string';
    else if (dateCheck(dateOfReview)===false) throw 'Invalid date provided';
    else if (typeof rating !== 'number' || rating<1 || rating>5) throw 'Rating must be anumber from 1-5';
}

async function create(bookId, title, reviewer, rating, dateOfReview, review){
    errorCheck(bookId, title, reviewer, rating, dateOfReview, review)
    id=ObjectId(bookId);
    let newRev ={
        _id:ObjectId(),
        title: title,
        reviewer: reviewer,
        rating: rating,
        dateOfReview: dateOfReview,
        review: review,
    }
    const bookCollection = await books()
    const book = await bookCollection.findOne({_id:id});
    if (book===null) {
        throw 'Error: No book with given Id';
    }
    const updateRev = await bookCollection.updateOne({_id:id},{$addToSet:{reviews:newRev}});
    const updatedBook = await bookCollection.findOne({_id:id});
    updatedBook._id=updatedBook._id.toString();
    return updatedBook;
}


async function getByBookId(id){
    if (id === undefined) throw 'Id is undefined';
    else if (typeof id !== 'string') throw 'Id must be a string';
    else if (valid_id(id)===false) throw 'Id is not a valid ObjectId';
    id=ObjectId(id);
    const BookCollection = await books();
    const book = await BookCollection.findOne({_id:id},{projection: {_id: 0, reviews:1}});
    const bookRevs = book.reviews;
    if (bookRevs === null){
        throw 'Reviews not found';}
    if (bookRevs.length === 0){
        throw 'No reviews found';}
    bookRevs.map(x=>x._id=x._id.toString());
    return bookRevs;
}

async function getByRevId(id){
    if (id === undefined) throw 'Id is undefined';
    else if (typeof id !== 'string') throw 'Id must be a string';
    else if (valid_id(id)===false) throw 'Id is not a valid ObjectId';
    id=ObjectId(id);
    const BookCollection = await books();
    const specificRev = await BookCollection.findOne({reviews:{ $elemMatch: {_id: id}}});
    if (specificRev === null){
        throw 'Review not found';
    }
    for (rev of specificRev.reviews){
        if (rev._id.toString()===id.toString()){
            const foundRev=rev;
            foundRev._id=foundRev._id.toString();
            return foundRev;
        }
    }
}

function removeFromArray(array, id){
    let temp=[];
    for (rev of array){
        if (rev._id.toString()!==id.toString()){
            temp.push(rev)
        }
    }
    return temp;
}
async function remove(id){
    if (id === undefined) throw 'Id is undefined';
    else if (typeof id !== 'string') throw 'Id must be a string';
    else if (valid_id(id)===false) throw 'Id is not a valid ObjectId';
    id=ObjectId(id);
    const BookCollection = await books();
    const deleteRev = await BookCollection.findOne({reviews:{ $elemMatch: {_id: id}}});
    deleteRev.reviews=removeFromArray(deleteRev.reviews, id);
    await BookCollection.updateOne({_id:deleteRev._id}, {$set:deleteRev});
    const removed ={reviewId:id.toString(), deleted: true};
    return removed;

}

module.exports = {
    create,
    getByBookId,
    getByRevId,
    remove
}