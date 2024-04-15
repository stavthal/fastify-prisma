# Trello-like API

This repository contains the source code for a Trello-like API built with Fastify and Prisma. The API allows for creating and managing boards, lists, and cards in a manner similar to Trello.

## Features

- Create, retrieve, update, and delete boards.
- Manage lists within boards including creating, updating, and deleting.
- Manage cards within lists including creating, updating, and deleting.
- Nested relationships are fully handled, allowing for retrieval of boards with their lists and cards included.

## Technologies Used

- **Fastify:** A fast and low overhead web framework for Node.js.
- **Prisma:** Next-generation ORM for Node.js and TypeScript.
- **SQLite:** Used for the database to store all data.

## Getting Started

### Prerequisites

- Node.js (v14.x or later recommended)
- npm or Yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://your-repository-url.git
   cd your-repository-name
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the database:

   ```bash
   npx prisma migrate dev
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Boards

- **POST /boards** - Create a new board
- **GET /boards** - Retrieve all boards
- **GET /boards/:id** - Retrieve a single board by ID
- **PUT /boards/:id** - Update a board by ID
- **DELETE /boards/:id** - Delete a board by ID

### Lists

- **POST /boards/:boardId/lists** - Create a new list within a board
- **PUT /lists/:id** - Update a list by ID
- **DELETE /lists/:id** - Delete a list by ID

### Cards

- **POST /lists/:listId/cards** - Create a new card within a list
- **PUT /cards/:id** - Update a card by ID
- **DELETE /cards/:id** - Delete a card by ID

## Documentation

Visit `/` on your local server to access the Swagger UI and view detailed information about the API endpoints and their specifications.

## Contributing

Contributions are welcome! Feel free to open a pull request with new features, improvements, or fixes.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
