const cardSchema = {
  createCard: {
    description: "Create a card",
    tags: ["Card"], // This should correspond to a defined tag in your Swagger setup
    summary: "Create a new card under a new list.",
    params: {
      type: "object",
      required: ["listId"],
      properties: {
        listId: { type: "string", description: "The ID of the list" },
      },
    },
    body: {
      type: "object",
      required: ["title"],
      properties: {
        title: { type: "string", description: "The title of the card" },
        description: {
          type: "string",
          description: "The description of the card",
        },
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
  getCard: {
    description: "Get a card",
    tags: ["Card"], // This should correspond to a defined tag in your Swagger setup
    summary: "Get a card",
    params: {
      type: "object",
      properties: {
        cardId: { type: "string", description: "The ID of the card" },
      },
    },
    response: {
      200: {
        description: "Successful response",
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
      500: {
        description: "Internal Server Error",
        type: "object",
        properties: {
          error: { type: "string", description: "Error message" },
        },
      },
    },
  },
  updateCard: {
    
  },
  deleteCard: {
    description: "Delete a card",
    tags: ["Card"], // This should correspond to a defined tag in your Swagger setup
    summary: "Delete a card",
    params: {
      type: "object",
      properties: {
        cardId: { type: "string", description: "The ID of the card" },
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

export default cardSchema;
