# Word Synonyms Practice Game

## Description
This project is a web-based game designed to help users practice and enhance their vocabulary by guessing synonyms for displayed words. When a user logs in, they are presented with a word and must enter a synonym. If the guess is correct, they earn a point, and a new word is provided. The game tracks each user's score and updates it with each successful guess.
### Technical Architecture
#### Frontend: 
Developed using React, leveraging state and effect hooks for managing state and side effects, respectively. The React app is responsible for rendering the UI, handling user interactions, and communicating with the backend via RESTful APIs.
#### Backend: 
Built with Express.js on Node.js, the backend handles API requests, session management, and serves the static files generated by the front-end build process.
Session Management: Utilizes cookies for maintaining user sessions and persisting game state across interactions.
#### Data Management: 
User data such as usernames, scores, and guesses are managed in memory using simple JavaScript objects. This setup is intended for demonstration purposes and would need to be adapted to use a database for production environments.
### Technologies Used
#### React: 
Used for building the user interface with components and managing state.
#### Node.js and Express: 
Serve the application and handle API requests.
#### Vite: 
Employed during development for fast build tools and hot module replacement.
#### uuid: 
Generates unique identifiers for session management.

## How to Use
### Install Dependencies
Open a terminal in the project directory and run:  npm install  This command installs all the necessary dependencies for the project.
### Build the Project
To build the project, run:  npm run build This command compiles the React application and prepares it for production by generating a dist folder.
### Start the Server
To start the server and serve the application, run:  npm start This starts the backend server, which serves the built React application and handles API requests for the game.

## Playing the Game
### Login
Enter a username to log in. Note that usernames must consist only of letters and numbers. Also, username cannot be “dog”.
### Guessing Synonyms
Once logged in, the current user ’s game information will appear on the screen, including current scores, last entered answer of synonym, and the current word which the user should guess the synonym of it. Enter what you believe is a synonym of the displayed word and submit your guess.
### Scoring
If your guess is correct, you will receive a point, and a new word will be displayed. If incorrect, the correct synonym will be shown, and you can continue guessing with new words.

## Features
### User Authentication
Simple username-based authentication to access the game.
### Real-Time Updates
The game updates synonyms and scores in real-time without requiring page reloads.
### Score Tracking
Tracks and displays user scores persistently during the session. 
External Sources and Licensing: This project uses React for the frontend development, sourced from the official React library. The backend is powered by Express.js, a minimalist web framework for Node.js. No external images or media were used in this project. All content is dynamically generated and managed through React and Express.