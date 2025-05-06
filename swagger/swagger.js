const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const swaggerAuthDocument = require('./swagger-auth.json'); 

// Combine the docs
const combinedSwaggerDocs = {
  ...swaggerDocument,
  paths: {
    ...swaggerAuthDocument.paths,
    ...swaggerDocument.paths,
    
  },
  components: {
    ...swaggerAuthDocument.components,
    ...swaggerDocument.components,
  }
};

const swaggerSetup = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(combinedSwaggerDocs));
};

module.exports = swaggerSetup;
