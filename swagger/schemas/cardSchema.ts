const cardSchema = {
  createCard: {
    description: "Create a card",
    tags: ["Card"], // This should correspond to a defined tag in your Swagger setup
    summary: "Create a new card under a new list.",
    params: {
      type: "object",
      properties: {
        cardId: { type: "string", description: "The ID of the list" },
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
