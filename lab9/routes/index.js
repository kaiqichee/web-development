//I pledge my honor that I have abided by the Stevens Honor System.
const fibRoutes = require('./fib');

const constructorMethod = (app) => {
    app.use('/', fibRoutes);
    app.use('*', (req, res) => {
        res.status(404).json({error: 'Route Not Found'});
    });
};

module.exports = constructorMethod;