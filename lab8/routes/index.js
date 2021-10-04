//I pledge my honor that I have abided by the Stevens Honor System.
const searchRoutes = require('./search');

const constructorMethod = (app) => {
    app.use('/', searchRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({error: 'Route Not Found'});
    });
};

module.exports = constructorMethod;