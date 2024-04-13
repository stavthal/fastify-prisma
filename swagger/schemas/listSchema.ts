const listSchema = {
  getList: {
    tags: ["List"], // This should correspond to a defined tag in your Swagger setup
    summary: "Get a list",
    params: {
      type: "object",
      properties: {
        listId: { type: "string", description: "The ID of the list" },
      },
    },
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          id: { type: "integer", description: "The ID of the list" },
          title: { type: "string", description: "The title of the list" },
          cards: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "integer", description: "The ID of the card" },
                title: { type: "string", description: "The title of the card" },
                description: {
                  type: "string",
                  description: "The description of the card",
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
  createList: {
    tags: ["List"], // This should correspond to a defined tag in your Swagger setup
    summary: "Create a new list",
    params: {
      type: "object",
      properties: {
        boardId: { type: "string", description: "The ID of the board" },
      },
    },
    body: {
      type: "object",
      properties: {
        title: { type: "string", description: "The title of the list" },
      },
    },
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          id: { type: "integer", description: "The ID of the list" },
          title: { type: "string", description: "The title of the list" },
        },
      },
      500: {
        description: "Internal Server Error",
        type: "object",
        properties: {
          error: { type: "string", description: "Error message" },
          message: { type: "string", description: "The message" },
        },
      },
    },
  },
  updateList: {
    description: "Update a list",
    tags: ["List"], // This should correspond to a defined tag in your Swagger setup
    summary: "Update a list",
    params: {
      type: "object",
      properties: {
        listId: { type: "string", description: "The ID of the list" },
      },
    },
    body: {
      type: "object",
      properties: {
        title: { type: "string", description: "The title of the list" },
      },
    },
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          id: { type: "integer", description: "The ID of the list" },
          title: { type: "string", description: "The title of the list" },
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
  deleteList: {
    description: "Delete a list",
    tags: ["List"], // This should correspond to a defined tag in your Swagger setup
    summary: "Delete a list",
    params: {
      type: "object",
      properties: {
        listId: { type: "string", description: "The ID of the list" },
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

export default listSchema;
