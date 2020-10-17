let todosData = require("./todosData");
const express = require("express");
const router = express.Router();
const uuid = require("uuid");

router.get("/", (req, res) => {
  res.json(todosData);
});

router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v1(),
    text: req.body.text,
    completed: false,
  };
  console.log("connected");
  if (!req.body.text) {
    return res.status(400).json({ msg: "Please include a name" });
  }

  todosData.push(newMember);
  res.json(todosData);
  //res.redirect("/");
});

router.delete("/:id", (req, res) => {
  const found = todosData.some((member) => req.params.id == member.id);

  if (found) {
    todosData = todosData.filter((member) => req.params.id != member.id);
    res.json({
      todosData,
    });
  } else {
    res.status(400).json({ msg: `Member of id ${req.params.id} is not found` });
  }
});

module.exports = router;
