import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("GET (Ya)")
});

app.post("/", (req, res) => {
    res.send("POST (Ya)")
});

app.listen(8080);
console.log("port 8080");