//I pledge my honor that I have abided by the Stevens Honor System.
const bookRoutes = require('./books');
const reviewsRoutes = require('./reviews');


const constructorMethod = (app) =>{
    app.use('/books', bookRoutes);
    app.use('/reviews', reviewsRoutes);
    app.use('*', (req, res) =>{
        res.status(404).json({error: 'Route Not Found'});
    });
};
module.exports = constructorMethod;