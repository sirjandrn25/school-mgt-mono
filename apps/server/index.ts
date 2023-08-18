import { Response } from "express";

const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
    console.log("Welcome. Hello world!");
    res.send("Hello world");
});

app.listen(port, () => {
    console.log(
        `server is listening on ${port}, click on http://localhost:${port}`
    );
});
