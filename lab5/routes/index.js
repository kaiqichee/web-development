//I pledge my honor that I have abided by the Stevens Honor System.
const showsRoutes = require('./shows');
const aboutmeRoutes = require('./aboutme');


const constructorMethod = (app) =>{
    app.use('/shows', showsRoutes);
    app.use('/aboutme', aboutmeRoutes);
    app.use('*', (req, res) =>{
        res.status(404).json({error: 'Route Not Found'});
    });
}
module.exports = constructorMethod;