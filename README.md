# Multiplayer Snakes and Ladders Game

Welcome to the Multiplayer Snakes and Ladders game! This project is built using Next.js, Tailwind CSS, TypeScript, and Socket.IO to create an interactive and real-time gaming experience. Players can create games and invite others to join using a unique game ID.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Learnings](#learnings)
- [Acknowledgements](#acknowledgements)

## Features

- Create and join multiplayer Snakes and Ladders games.
- Real-time updates using Socket.IO for seamless gameplay.
- TypeScript for a scalable and maintainable codebase.
- Styled with Tailwind CSS for a modern and responsive design.

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jared-hembrow/snakes-and-ladders.git
   ```

2. Change into the project directory:

   ```bash
   cd snakes-and-ladders
   ```

3. Build Application:

   ```bash
   build.sh
   ```

### Running the Application

1. Start the server:

   ```bash
   run.sh
   ```

2. Open your browser and navigate to http://localhost:3000.

## Project Structure

```lua
snakes-and-ladders/
|-- backend
    |-- src

|-- fronent
    |-- public/
    |-- src/
        |-- app/
        |-- components/
        |-- socket/
        |-- util/
        |-- Game/
|-- .gitignore
|-- next.config.js
|-- package.json
|-- README.md
|-- tailwind.config.js
|-- tsconfig.json
```

- backend
  - src: SocketIO, HTTP server, game classes
- frontend
  - src: Source code for the application.
    - components: Reusable React components.
    - app: Next.js pages.
    - socket: Socket.IO server for backend game logic.
    - util: utility functions.
  - next.config.js: Configuration file for Next.js.
  - tailwind.config.js: Configuration file for Tailwind CSS.
  - tsconfig.json: TypeScript configuration.

## Technologies Used

- Next.js - React framework for building web applications.
- Tailwind CSS - Utility-first CSS framework.
- TypeScript - Typed superset of JavaScript.
- Socket.IO - Real-time bidirectional event-based communication.

### Learnings

- Real-time Communication: Learned how to implement real-time communication using Socket.IO for updating game states in real-time across multiple clients.
- React with TypeScript: Gained experience in building scalable and type-safe React components using TypeScript.
- Tailwind CSS: Explored the advantages of using Tailwind CSS for rapid and consistent styling, allowing for a responsive design.

- Next.js: Leveraged Next.js for server-side rendering, optimizing performance, and improving SEO.

### Acknowledgements

Special thanks to the open-source community for providing excellent documentation and resources for the technologies used in this project.
