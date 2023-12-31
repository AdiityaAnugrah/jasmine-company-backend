const axios = require("axios");
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const port = 8082;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jualan",
});

connection.connect();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/getallbarang", (req, res) => {
  connection.query("SELECT * FROM barang", function (error, results) {
    if (error) return error;
    res.json({
      pesan: "Ok",
      data: results,
    });
  });
});

app.get("/get20barang/:page", (req, res) => {
  const hitungOffset = 20 * (Number(req.params.page) - 1);
  connection.query(
    "SELECT * FROM barang LIMIT 20 OFFSET " + hitungOffset,
    function (error, results) {
      if (error) return error;
      res.json({
        pesan: "Ok",
        data: results,
      });
    }
  );
});

app.get("/barang/:id", function (req, res) {
  connection.query(
    `SELECT * FROM barang WHERE id='${req.params.id}'`,
    function (error, results) {
      if (error) return error;
      res.json({
        pesan: "ok",
        data: results,
      });
    }
  );
});

app.get("/kategori/:kategori", function (req, res) {
  connection.query(
    `SELECT * FROM barang WHERE kategori='${req.params.kategori}'`,
    function (error, results) {
      if (error) return error;
      res.json({
        pesan: "ok",
        data: results,
      });
    }
  );
});
app.get("/kategori/:kategori/:page", function (req, res) {
  const hitungOffset = 20 * (Number(req.params.page) - 1);
  connection.query(
    `SELECT * FROM barang WHERE kategori='${req.params.kategori}' LIMIT 20 OFFSET ${hitungOffset}`,
    function (error, results) {
      if (error) return error;
      res.json({
        pesan: "ok",
        data: results,
      });
    }
  );
});

app.get("/subkategori/:subkategori/:page", function (req, res) {
  const hitungOffset = 20 * (Number(req.params.page) - 1);
  connection.query(
    `SELECT * FROM barang WHERE subkategori='${req.params.subkategori}' LIMIT 20 OFFSET ${hitungOffset}`,
    function (error, results) {
      if (error) return error;
      res.json({
        pesan: "ok",
        data: results,
      });
    }
  );
});

app.post("/cari", function (req, res) {
  connection.query(
    `SELECT * FROM barang WHERE nama LIKE '%${req.body.cari}%'`,
    function (error, results) {
      if (error) return error;
      res.json({
        pesan: "ok",
        data: results,
      });
    }
  );
});

//-------------- gambar barang --------------//
app.get("/gambar/:id", function (req, res) {
  connection.query(
    `SELECT * FROM gambar_barang WHERE id='${req.params.id}'`,
    function (error, results) {
      if (error) return error;
      res.json({
        pesan: "ok",
        data: results,
      });
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
