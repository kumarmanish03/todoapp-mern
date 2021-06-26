const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const mysql = require("mysql");

dotenv.config();

router.post("/user/:id", (req, res) => {
  const user_id = req.params.id;
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

    const sql = `INSERT INTO todos (user_id, todo) VALUES (${user_id}, '${todo}')`;

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

router.get("/user/:id", (req, res) => {
  const user_id = req.params.id;

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

    const sql = `SELECT * FROM todos WHERE user_id = ${user_id};`;

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
});

router.put("/:id/completed", (req, res) => {
  const id = req.params.id;

  //console.log(id);

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
