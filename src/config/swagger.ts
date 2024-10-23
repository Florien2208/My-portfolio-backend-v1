import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TypeScript Express API",
      version: "1.0.0",
      description: "A simple Express API built with TypeScript",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          required: ["name", "email"],
          properties: {
            id: {
              type: "string",
              description: "Auto-generated MongoDB ID",
            },
            name: {
              type: "string",
              description: "User name",
            },
            email: {
              type: "string",
              description: "User email",
              format: "email",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "User creation date",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"], // Path to the API routes
};

export const specs = swaggerJsdoc(options);
