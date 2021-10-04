//I pledge my honor that I have abided by the Stevens Honor System.
const showRoutes = require('./shows');

const constructorMethod = (app) =>{
    app.use('/', showRoutes);
    app.use('*', (req, res) =>{
        res.status(404).json({error: 'Route Not Found'});
    });
};
module.exports = constructorMethod;