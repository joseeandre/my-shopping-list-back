import express from "express";
import cors from "cors";

import connection from "./database.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/items", async (req, res) => {
    try {
        if (req.body.text?.trim().length === 0) {
            res.sendStatus(400);
        } else {
            await connection.query(`INSERT INTO list text VALUES $1`, [
                req.body.text,
            ]);
            res.sendStatus(201);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get("/items", async (req, res) => {
    try {
        const request = await connection.query(`SELECT * FROM list`);
        res.send(request.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus;
    }
});

export default app;