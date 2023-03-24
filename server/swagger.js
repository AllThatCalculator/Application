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
        url: process.env.SWAGGER_SERVER,
        description: process.env.SWAGGER_SERVER_DESC,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: `</br>1. 수동으로 idToken 발급 받아서 입력</br>
          2. /api/test/login api로 발급 받아서 입력`
        },
      },
    },
    security: [{ bearerAuth: [] }],
    externalDocs: {
      description: "오류 코드 및 메세지",
      url: "https://www.notion.so/Error-code-9e2aeb37404e48cda8dae8328556156a"
    }
  },
  apis: [
    "./routes/*.js",
    "./routes/*/*.js",
    "./routes/*/*/*.js",
    "./swagger/*",
  ],
};

const specs = swaggereJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
