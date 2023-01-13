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
        url: "http://dev.localhost:8080/",
        description: "local Server",
      },
      {
        url: "http://dev.allthatcalculator.net/",
        description: "develop server (AWS)",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/*.js", "./swagger/*"],
};

const specs = swaggereJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
