import express from "express";
import dotenv from "dotenv";
import itemRoutes from './routes/itemRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Allows .env file to be called anywhere using process.env
dotenv.config();

const app = express();
const port = 3000;
const serverUrl = `http://localhost:${port}`;

// Creates app
app.use(express.json());

app.use('/items', itemRoutes);

app.use('/orders', orderRoutes);

app.use('/inventory', inventoryRoutes);

app.listen(port, () => {
  console.log(`Server running on ${serverUrl}...`);
});
