//I pledge my honor that I have abided by the Stevens Honor System.
const bookData = require('./books');
const revData = require('./reviews');
const connection = require('../config/mongoConnection');
let { ObjectId } = require('mongodb');

async function main() {
}

try {
    main();
}
catch(e){
    console.log(e);
}

module.exports = {
    books: bookData,
    reviews: revData
}