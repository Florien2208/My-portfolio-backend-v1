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
        url: "http://localhost:9000",
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
            status: {
              type: "string",
              enum: ["fail", "error"],
              description: "Error status",
            },
            message: {
              type: "string",
              description: "Error message",
            },
            stack: {
              type: "string",
              description: "Error stack trace (only in development)",
            },
            errors: {
              type: "array",
              description: "Validation errors array",
              items: {
                type: "object",
                properties: {
                  field: {
                    type: "string",
                    description: "Field that caused the error",
                  },
                  message: {
                    type: "string",
                    description: "Error message for this field",
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        ValidationError: {
          description: "Validation Error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
              example: {
                status: "fail",
                message:
                  "Invalid input data. Email is required. Name must be at least 3 characters.",
                errors: [
                  { field: "email", message: "Email is required" },
                  {
                    field: "name",
                    message: "Name must be at least 3 characters",
                  },
                ],
              },
            },
          },
        },
        NotFoundError: {
          description: "Resource not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
              example: {
                status: "fail",
                message: "No user found with that ID",
              },
            },
          },
        },
        DuplicateError: {
          description: "Duplicate field value",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
              example: {
                status: "fail",
                message:
                  'Duplicate field value: "john@example.com". Please use another value!',
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"], // Path to the API routes
};

export const specs = swaggerJsdoc(options);
