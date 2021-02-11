const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use("/api/todos", require("./router"));

app.get("/", (req, res) => {
  res.send("Hello to my API");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server started..."));
