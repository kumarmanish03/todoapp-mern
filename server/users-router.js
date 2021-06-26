const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const mysql = require("mysql");

dotenv.config();

router.get("/:id", (req, res) => {
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

    const sql = `SELECT * FROM users WHERE id = ${id}`;

    conn.query(sql, (err, [user]) => {
      conn.end();

      if (err) {
        res.json({ msg: err.message });
        return;
      }

      res.json({ msg: "ok", user: user ?? null });
    });
  });
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  console.log(username, password);

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

    const sql = `INSERT INTO users (username, password) VALUES ('${username}', '${password}');`;

    conn.query(sql, (err) => {
      if (err) {
        res.json({ msg: err.message });
        return;
      }

      const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

      conn.query(sql, (err, [user]) => {
        conn.end();

        if (err) {
          res.json({ msg: err.message });
          return;
        }

        res.json({ msg: "ok", user });
      });
    });
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

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

    const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

    conn.query(sql, (err, [user]) => {
      conn.end();

      if (err) {
        res.json({ msg: err.message });
        return;
      }

      //console.log(rows);

      res.json({ msg: "ok", user: user ?? null });
    });
  });
});

module.exports = router;
