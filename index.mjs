import express from 'express'
import _ from 'dotenv'
import path from 'path'
import { connectToDatabase } from './services/mongo.service.mjs'

import AuthRouter from './routes/auth.router.mjs' 
import UsersRouter from './routes/users.router.mjs'
import PropertiesRouter from './routes/properties.router.mjs'
import CategoriesRouter from './routes/categories.router.mjs'

_.config()

const app = express()
const port = process.env.PORT || 8000

// Connect to db
connectToDatabase()

// Basic middlewrae
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200)
    }

    next()
})

// Routes middleware
AuthRouter(app)
UsersRouter(app)
PropertiesRouter(app)
CategoriesRouter(app)

// Server static assets if in production
// if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  // }

// Start server
app.listen(port, () => console.log(`Server running on port ${port}...`))

