//I pledge my honor that I have abided by the Stevens Honor System.
const userRoutes = require('./user');

const constructorMethod = (app) =>{
    app.use('/', userRoutes);
    app.use('*', (req, res) =>{
        res.status(404).json({error: 'Route Not Found'});
    });
};
module.exports = constructorMethod;