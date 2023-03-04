const auth = require('./auth');
const navigationRoutes = require('./navigation');

const constructorMethod = (app) => {
  app.use('/', auth);
  app.use('/navigation', navigationRoutes);
};

module.exports = constructorMethod;