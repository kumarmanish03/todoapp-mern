let todosData = require("./todosData");
const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const dotenv = require("dotenv");
const mysql = require("mysql");

dotenv.config();

router.post("/", (req, res) => {
  const { todo } = req.body;

  const conn = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_NAME,
    port: process.env.MYSQL_PORT,
  });

  conn.connect((err) => {
    if (err) {
      res.json({ msg: err.message });
      return;
    }

    const sql = `INSERT INTO todos (todo) VALUES ('${todo}')`;

    conn.query(sql, (err) => {
      conn.end();

      if (err) {
        res.json({ msg: err.message });
        return;
      }

      res.json({ msg: "ok" });
    });
  });
});

router.get("/", (req, res) => {
  //res.json(todosData);
  const conn = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_NAME,
    port: process.env.MYSQL_PORT,
  });

  conn.connect((err) => {
    if (err) {
      res.json({ msg: err.message });
      return;
    }

    const sql = `SELECT * FROM todos;`;

    conn.query(sql, (err, todos) => {
      conn.end();

      if (err) {
        res.json({ msg: err.message });
        return;
      }

      //console.log(rows);

      res.json({ msg: "ok", todos });
    });
  });
});

// router.post("/", (req, res) => {
//   const date = new Date();
//   const dateTime =
//     date.getHours() +
//     ":" +
//     date.getMinutes() +
//     " " +
//     date.getDate() +
//     "/" +
//     date.getMonth() +
//     "/" +
//     date.getFullYear();
//   const newMember = {
//     id: uuid.v1(),
//     text: req.body.text,
//     completed: false,
//     date: dateTime,
//   };
//   console.log(dateTime);
//   if (!req.body.text) {
//     return res.status(400).json({ msg: "Please include a name" });
//   }

//   todosData.push(newMember);
//   res.json(todosData);
//   //res.redirect("/");
// });

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  const conn = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_NAME,
    port: process.env.MYSQL_PORT,
  });

  conn.connect((err) => {
    if (err) {
      res.json({ msg: err.message });
      return;
    }

    const sql = `DELETE FROM todos WHERE id = ${id}`;

    conn.query(sql, (err, todos) => {
      conn.end();

      if (err) {
        res.json({ msg: err.message });
        return;
      }

      //console.log(rows);

      res.json({ msg: "ok" });
    });
  });

  // const found = todosData.some((member) => req.params.id == member.id);

  // if (found) {
  //   todosData = todosData.filter((member) => req.params.id != member.id);
  //   res.json({
  //     todosData,
  //   });
  // } else {
  //   res.status(400).json({ msg: `Member of id ${req.params.id} is not found` });
  // }
});

router.put("/:id/completed", (req, res) => {
  const id = req.params.id;

  console.log(id);

  //res.json(todosData);
  const conn = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_NAME,
    port: process.env.MYSQL_PORT,
  });

  conn.connect((err) => {
    if (err) {
      res.json({ msg: err.message });
      return;
    }

    const sql = `SELECT completed FROM todos WHERE id = '${id}'`;

    conn.query(sql, (err, result) => {
      if (err) {
        res.json({ msg: err.message });
        return;
      }

      const completed = result[0].completed == 0 ? 1 : 0;

      // console.log(result[0].completed);

      const sql = `UPDATE todos SET completed = ${completed} WHERE id = '${id}'`;

      conn.query(sql, (err) => {
        conn.end();

        if (err) {
          res.json({ msg: err.message });
          return;
        }

        //console.log(rows);

        res.json({ msg: "ok" });
      });
    });
  });
});

module.exports = router;
