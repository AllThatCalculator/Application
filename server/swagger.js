const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "ATC API",
      version: "1.0.0",
      description: "ATC API using swagger and express.",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "local Server",
      },
    ],
  },
  apis: ["./routes/*.js", "./swagger/*"],
};

const specs = swaggereJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
