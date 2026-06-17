import express from "express";
import dotenv from "dotenv";

// Allows .env file to be called anywhere using process.env
dotenv.config();

const app = express();
const port = 3000;
const url = `https://localhost:${port}`;

// Creates app
app.use(express.json());

// Home - where user will pick customer or employee
app.use("/home", home);

// To see inventory (would be the same on both sides)
app.use("/inventory", inventory);

app.listen(port, () => {
  console.log(`http://localhost:${port}/home...`);
});
