const fastify = require("fastify")({ logger: true });
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

import boardSchemas from "./swagger/schemas/boardSchema"; // Import the 'boardSchema' module
import listSchema from "./swagger/schemas/listSchema"; // Import the 'listSchema' module
import cardSchema from "./swagger/schemas/cardSchema"; // Import the 'cardSchema' module
import { error } from "console";
import { AnyTxtRecord } from "dns";

fastify.register(require("@fastify/swagger"), {
  openapi: {
    info: {
      title: "Trello-like API",
      description: "Trello-like API Documentation",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
    tags: [
      {
        name: "Board",
        description: "Board endpoints",
      },
      {
        name: "List",
        description: "List endpoints",
      },
      {
        name: "Card",
        description: "Card endpoints",
      },
    ],
  },
}); // Register swagger

// Swagger-UI
fastify.register(require("@fastify/swagger-ui"), {
  routePrefix: "/",
  uiConfig: {
    docExpansion: "list",
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request: any, reply: any, next: any) {
      next();
    },
    preHandler: function (request: any, reply: any, next: any) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header: any) => header,
  transformSpecification: (swaggerObject: any, request: any, reply: any) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

// BOARDS

// Get all the boards
fastify.register((app: any, options: any, done: any) => {
  app.get("/boards", {
    schema: boardSchemas.getAll,
    handler: async (request: any, reply: any) => {
      try {
        const boards = await prisma.board.findMany({
          include: {
            lists: {
              include: {
                cards: true,
              },
            },
          },
        });
        return reply.send(boards);
      } catch (error) {
        request.log.error(error);
        return reply.status(500).send({ error: "Error retrieving boards" });
      }
    },
  });
  done();
});

// Get a single board
fastify.register((app: any, options: any, done: any) => {
  app.get("/boards/:boardId", {
    schema: boardSchemas.getOne,
    handler: async (request: any, reply: any) => {
      const { boardId } = request.params;

      try {
        const board = await prisma.board.findUnique({
          where: { id: parseInt(boardId) },
          include: {
            lists: {
              include: {
                cards: true,
              },
            },
          },
        });
        return reply.send(board);
      } catch (error: any) {
        request.log.error(error);

        // Check for specific error codes
        if (error.code === "P2025") {
          return reply.status(404).send({ error: "Board not found" });
        }
        return reply.status(500).send({ error: "Error retrieving board" });
      }
    },
  });
  done();
});

// Create a board
fastify.register((app: any, options: any, done: any) => {
  app.post("/boards/new-board", {
    schema: boardSchemas.createBoard,
    handler: async (request: any, reply: any) => {
      try {
        const { title } = request.body;
        const board = await prisma.board.create({
          data: {
            title,
          },
        });
        return reply.code(201).send(board); // Send the created board with a 201 Created status
      } catch (error: any) {
        // Log the error internally
        app.log.error(error);

        // Send a specific error message back to the client, making sure it's appropriate for client-side exposure
        return reply.code(500).send({
          error: "Internal Server Error",
          message: "Unable to create new board due to an error",
        });
      }
    },
  });
  done();
});

// Update a board
fastify.register((app: any, options: any, done: any) => {
  app.put("/boards/:boardId", {
    schema: boardSchemas.updateBoard,
    handler: async (request: any, reply: any) => {
      const { boardId } = request.params;
      const { title } = request.body;

      try {
        const updateBoard = await prisma.board.update({
          where: { id: parseInt(boardId) },
          data: {
            title,
          },
        });
        return reply.send(updateBoard);
      } catch (error: any) {
        request.log.error(error);

        // Check for specific error codes
        if (error.code === "P2025") {
          return reply.status(404).send({ error: "Board not found" });
        }
        return reply.status(500).send({ error: "Error updating board" });
      }
    },
  });
  done();
});

// Delete a board
fastify.register((app: any, options: any, done: any) => {
  app.delete("/boards/:boardId", {
    schema: boardSchemas.deleteBoard,
    handler: async (request: any, reply: any) => {
      const { boardId } = request.params;

      try {
        // Optionally, check if there are any lists attached to the board before deleting
        const lists = await prisma.list.findMany({
          where: { boardId: parseInt(boardId) },
        });
        // If there are lists attached to the board, return an error
        if (lists.length > 0) {
          return reply
            .status(400)
            .send({ error: "Board has lists attached and cannot be deleted." });
        }
        // If there are no lists attached, delete the board
        const deleteBoard = await prisma.board.delete({
          where: { id: parseInt(boardId) },
        });

        return reply.send({ message: "Board deleted successfully" });
      } catch (error: any) {
        request.log.error(error);

        // Check for specific error codes
        if (error.code === "P2025") {
          return reply
            .status(404)
            .send({ status: 404, error: "Board not found" });
        }
        return reply.status(500).send({ error: "Error deleting board" });
      }
    },
  });
  done();
});

// TODO: Add a route to get all boards based on a user's id (maybe needs to be done for each of the other routes)

/*
  LISTS
*/

// Get a list
fastify.register((app: any, options: any, done: any) => {
  app.get("/lists/:listId", {
    schema: listSchema.getList,
    handler: async (request: any, reply: any) => {
      const { listId } = request.params;

      try {
        const list = await prisma.list.findUnique({
          where: { id: parseInt(listId) },
          include: {
            cards: true,
          },
        });
        return reply.send(list);
      } catch (error: any) {
        request.log.error(error);

        // Check for specific error codes
        if (error.code === "P2025") {
          return reply.status(404).send({ error: "List not found" });
        }
        return reply.status(500).send({ error: "Error retrieving list" });
      }
    },
  });
  done();
});

// Create a list under a selected board based on the board's id
fastify.register((app: any, options: any, done: any) => {
  app.post("/boards/:boardId/create-list", {
    schema: listSchema.createList,
    handler: async (request: any, reply: any) => {
      const { title } = request.body;
      const { boardId } = request.params;

      try {
        const list = await prisma.list.create({
          data: {
            title,
            boardId: parseInt(boardId), // Ensure the board id is a number
          },
        });
        return reply.send(list);
      } catch (err: any) {
        if (err.code === "P2003") {
          return reply
            .status(404)
            .send({ error: "Board not found. Cannot create list" });
        }
        request.log.error(err);
        return reply.status(500).send({
          error: "Error creating list",
          message: "Please make sure that the structure is correct.",
        });
      }
    },
  });
  done();
});

// Update a list
fastify.register((app: any, options: any, done: any) => {
  app.put("/lists/:listId", {
    schema: listSchema.updateList,
    handler: async (request: any, reply: any) => {
      const { listId } = request.params;
      const { title } = request.body;

      try {
        const updateList = await prisma.list.update({
          where: { id: parseInt(listId) },
          data: {
            title,
          },
        });
        return reply.status(201).send(updateList);
      } catch (error: any) {
        request.log.error(error);

        // Check for specific error codes
        if (error.code === "P2025") {
          return reply.status(404).send({ error: "List not found" });
        }
        return reply.status(500).send({ error: "Error updating list" });
      }
    },
  });
  done();
});

// Delete a list
fastify.register((app: any, options: any, done: any) => {
  app.delete("/lists/:listId", {
    schema: listSchema.deleteList,
    handler: async (request: any, reply: any) => {
      const { listId } = request.params;

      try {
        // Optionally, delete the cards if the list cannot be deleted with cards still in it
        await prisma.card.deleteMany({
          where: { listId: parseInt(listId) }, // makes sure that it deletes cards that are in the list we are trying to delete
        });

        const deleteList = await prisma.list.delete({
          where: { id: parseInt(listId) }, // Ensure the list id is a number
        });

        return reply.send({ message: "List deleted successfully" });
      } catch (error) {
        request.log.error(error);
        return reply.status(500).send({ error: "Error deleting list" });
      }
    },
  });
  done();
});

/*
  CARDS
*/

// Create a card under a specific list
fastify.register((app: any, options: any, done: any) => {
  app.post("/lists/:listId/create-card", {
    schema: cardSchema.createCard,
    handler: async (request: any, reply: any) => {
      const { title, description } = request.body;
      const { listId } = request.params;

      try {
        const card = await prisma.card.create({
          data: {
            title,
            description,
            listId: parseInt(listId), // Ensure the list id is a number
          },
        });
        return reply
          .status(200)
          .send({ message: "Card added successfully", card: card });
      } catch (err) {
        request.log.error(err);
        return reply.status(500).send({ error: "Error adding card to a list" });
      }
    },
  });
  done();
});

// Update a card
fastify.register((app: any, options: any, done: any) => {
  app.put("/cards/:cardId", {
    schema: cardSchema.updateCard,
    handler: async (request: any, reply: any) => {
      const { cardId } = request.params;
      const { title, description } = request.body;

      try {
        const updateCard = await prisma.card.update({
          where: { id: parseInt(cardId) },
          data: {
            title,
            description,
          },
        });
        return reply.status(201).send(updateCard);
      } catch (error: any) {
        request.log.error(error);

        // Check for specific error codes
        if (error.code === "P2025") {
          return reply.status(404).send({ error: "Card not found" });
        }
        return reply.status(500).send({ error: "Error updating card" });
      }
    },
  });
  done();
});

// Get a card
fastify.register((app: any, options: any, done: any) => {
  app.get("/cards/:cardId", {
    schema: cardSchema.getCard,
    handler: async (request: any, reply: any) => {
      const { cardId } = request.params;

      try {
        const card = await prisma.card.findUnique({
          where: { id: parseInt(cardId) },
        });
        return reply.send(card);
      } catch (error: any) {
        request.log.error(error);

        // Check for specific error codes
        if (error.code === "P2025") {
          return reply.status(404).send({ error: "Card not found" });
        }
        return reply.status(500).send({ error: "Error retrieving card" });
      }
    },
  });
  done();
});

// Delete a card
fastify.register((app: any, options: any, done: any) => {
  app.delete("/cards/:cardId", {
    schema: cardSchema.deleteCard,
    handler: async (request: any, reply: any) => {
      const { cardId } = request.params;

      try {
        const deleteCard = await prisma.card.delete({
          where: { id: parseInt(cardId) }, // Ensure the card id is a number
        });
        return reply.send({ message: "Card deleted successfully" });
      } catch (error: any) {
        request.log.error(error);

        // Check for specific error codes
        if (error.code === "P2025") {
          return reply.status(404).send({ error: "Card not found" });
        }
        return reply.status(500).send({ error: "Error deleting card" });
      }
    },
  });
  done();
});

// Function to run the server
const start = async () => {
  try {
    await fastify.listen(8000);
    fastify.swagger();
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start(); // Starting the server
