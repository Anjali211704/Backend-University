# My Notes - Backend Development Lab Examination

## Aim

To develop a server-side Notes Management Application using Node.js, Express.js, EJS, Mongoose, and MongoDB Atlas.

## Features

- Add a new note
- Display all saved notes
- Edit existing notes
- Delete notes
- Validate title and content
- Store creation and update dates
- Display a message when no notes exist
- Responsive interface using CSS
- Persistent cloud storage using MongoDB Atlas

## Technologies and Packages

- Node.js
- Express.js
- EJS
- MongoDB Atlas
- Mongoose
- dotenv
- HTML and CSS

## Concepts Used

- Backend routing
- Form handling
- Server-side rendering
- MongoDB CRUD operations
- Mongoose schema and model
- Environment variables
- Server-side validation
- Error handling
- Static file handling

## Project Structure

```text
BackendLabExam/
├── models/
│   └── Note.js
├── public/
│   └── style.css
├── views/
│   ├── index.ejs
│   ├── new.ejs
│   └── edit.ejs
├── screenshots/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## Installation

Install the dependencies:

```bash
npm install
```

## Environment Configuration

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=3000
```

The `.env` file must not be uploaded to GitHub.

## Routes

| Method | Route | Purpose |
|---|---|---|
| GET | `/` | Redirect to the notes page |
| GET | `/notes` | Display all notes |
| GET | `/notes/new` | Display the add-note form |
| POST | `/notes` | Add a new note |
| GET | `/notes/:id/edit` | Display the edit form |
| POST | `/notes/:id/edit` | Update a note |
| POST | `/notes/:id/delete` | Delete a note |

## MongoDB Details

- Database: `notes_lab`
- Collection: `notes`

Each note contains:

- `title`
- `content`
- `category`
- `createdAt`
- `updatedAt`

## How to Run

Start the application:

```bash
npm start
```

Open the following URL:

```text
http://localhost:3000
```

## Expected Output

The home page displays every note stored in MongoDB Atlas. Users can add, edit, and delete notes. If no notes are stored, the application displays an appropriate empty-state message.

## Learning Outcome

This activity demonstrates how an HTML form communicates with an Express backend, how Mongoose performs MongoDB CRUD operations, and how EJS generates dynamic HTML on the server.

## Conclusion

The My Notes application successfully performs Create, Read, Update, and Delete operations using MongoDB Atlas. It also demonstrates routing, form handling, validation, error handling, server-side templates, and persistent database storage.