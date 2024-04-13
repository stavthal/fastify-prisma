const listSchema = {
  createList: {
    tags: ["List"], // This should correspond to a defined tag in your Swagger setup
    summary: "Create a new list",
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
