
import express from 'express';
import routes from './app/routes/index.js'
import dotenv from 'dotenv'
import { connectToCluster } from './app/core/mongodb.config.js';
import errorHandler from './app/middleware/error-handler.middleware.js';
import cors from 'cors';
// Initialize environment variables

const app = express();
dotenv.config()

const PORT = process.env.PORT;
let dbUri = '';
if (process.env.MODE === 'development') {
    dbUri = process.env.DATABASE_URI
}
else {
    dbUri = process.env.PROD_DATABASE_URI
}

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:4200', 'http://localhost:80'] // Whitelist the domains you want to allow
};

app.use(cors(corsOptions)); // Use the cors middleware with your options


// Set up routes
app.use('/api', routes)
app.get('/', (req, res) => {
    res.json({ message: "Application is running" });
});

await connectToCluster(dbUri)

app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
