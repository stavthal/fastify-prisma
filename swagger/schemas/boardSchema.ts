const boardSchemas = {
  getAll: {
    description: "Retrieves all boards with their associated lists and cards",
    tags: ["Board"], // This should correspond to a defined tag in your Swagger setup
    summary: "Get all boards",
    response: {
      200: {
        description: "Successful response",
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "integer", description: "The ID of the board" },
            title: { type: "string", description: "The title of the board" },
            lists: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "integer", description: "The ID of the list" },
                  title: {
                    type: "string",
                    description: "The title of the list",
                  },
                  cards: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "integer",
                          description: "The ID of the card",
                        },
                        title: {
                          type: "string",
                          description: "The title of the card",
                        },
                        description: {
                          type: "string",
                          description: "The description of the card",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      500: {
        description: "Internal Server Error",
        type: "object",
        properties: {
          error: { type: "string", description: "Error message" },
        },
      },
    },
  },
  getOne: {
    description: "Gets a board based on the board's ID",
    tags: ["Board"], // Ensures it appears under the correct category in Swagger UI
    summary: "Get a single board",
    params: {
      type: "object",
      required: ["boardId"],
      properties: {
        id: { type: "string", description: "The ID of the board" }, // Keep as string if passed in URL
      },
    },
    response: {
      200: {
        description: "Successful response",
        type: "object", // Corrected from 'array' to 'object'
        properties: {
          id: { type: "integer", description: "The ID of the board" },
          title: { type: "string", description: "The title of the board" },
          lists: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "integer", description: "The ID of the list" },
                title: { type: "string", description: "The title of the list" },
                cards: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "integer",
                        description: "The ID of the card",
                      },
                      title: {
                        type: "string",
                        description: "The title of the card",
                      },
                      description: {
                        type: "string",
                        description: "The description of the card",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      500: {
        description: "Internal Server Error",
        type: "object",
        properties: {
          error: { type: "string", description: "Error message" },
        },
      },
    },
  },
  createBoard: {
    description: "Create a board",
    tags: ["Board"], // This should correspond to a defined tag in your Swagger setup
    summary: "Create a new board",
    body: {
      type: "object",
      required: ["title"],
      properties: {
        title: { type: "string", description: "The title of the board" },
      },
    },
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          id: { type: "integer", description: "The ID of the board" },
          title: { type: "string", description: "The title of the board" },
        },
      },
      500: {
        description: "Internal Server Error",
        type: "object",
        properties: {
          error: { type: "string", description: "Error message" },
        },
      },
    },
  },
  updateBoard: {
    description: "Update a board",
    tags: ["Board"], // This should correspond to a defined tag in your Swagger setup
    summary: "Update a board",
    params: {
      type: "object",
      properties: {
        boardId: { type: "string", description: "The ID of the board" },
      },
    },
    body: {
      type: "object",
      properties: {
        title: { type: "string", description: "The title of the board" },
      },
    },
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          id: { type: "integer", description: "The ID of the board" },
          title: { type: "string", description: "The title of the board" },
        },
      },
      500: {
        description: "Internal Server Error",
        type: "object",
        properties: {
          error: { type: "string", description: "Error message" },
        },
      },
    },
  },
  deleteBoard: {
    description: "Delete a board",
    tags: ["Board"], // This should correspond to a defined tag in your Swagger setup
    summary: "Delete a board",
    params: {
      type: "object",
      properties: {
        boardId: { type: "string", description: "The ID of the board" },
      },
    },
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          message: { type: "string", description: "The message" },
        },
      },
      500: {
        description: "Internal Server Error",
        type: "object",
        properties: {
          error: { type: "string", description: "Error message" },
        },
      },
    },
  },
};

export default boardSchemas;
