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
    try {
        connection.query("SELECT * FROM barang", function (error, results) {
            if (error) throw error;
            res.json({
                pesan: "Ok",
                data: results,
            });
        });
    } catch (err) {
        console.log(err);
    }
});

app.get("/get20barang/:page", (req, res) => {
    try {
        const hitungOffset = 20 * (Number(req.params.page) - 1);
        connection.query(
            "SELECT * FROM barang LIMIT 20 OFFSET " + hitungOffset,
            function (error, results) {
                if (error) throw error;
                res.json({
                    pesan: "Ok",
                    data: results,
                });
            }
        );
    } catch (err) {
        console.log(err);
    }
});

app.get("/barang/:id", function (req, res) {
    try {
        connection.query(
            `SELECT * FROM barang WHERE id='${req.params.id}'`,
            function (error, results) {
                if (error) throw error;
                res.json({
                    pesan: "ok",
                    data: results,
                });
            }
        );
    } catch (err) {
        console.log(err);
    }
});

app.get("/kategori/:kategori", function (req, res) {
    try {
        connection.query(
            `SELECT * FROM barang WHERE kategori='${req.params.kategori}'`,
            function (error, results) {
                if (error) throw error;
                res.json({
                    pesan: "ok",
                    data: results,
                });
            }
        );
    } catch (err) {
        console.log(err);
    }
});
app.get("/kategori/:kategori/:page", function (req, res) {
    try {
        const hitungOffset = 20 * (Number(req.params.page) - 1);
        connection.query(
            `SELECT * FROM barang WHERE kategori='${req.params.kategori}' LIMIT 20 OFFSET ${hitungOffset}`,
            function (error, results) {
                if (error) throw error;
                res.json({
                    pesan: "ok",
                    data: results,
                });
            }
        );
    } catch (err) {
        console.log(err);
    }
});

app.get("/subkategori/:subkategori/:page", function (req, res) {
    try {
        const hitungOffset = 20 * (Number(req.params.page) - 1);
        connection.query(
            `SELECT * FROM barang WHERE subkategori='${req.params.subkategori}' LIMIT 20 OFFSET ${hitungOffset}`,
            function (error, results) {
                if (error) throw error;
                res.json({
                    pesan: "ok",
                    data: results,
                });
            }
        );
    } catch (err) {
        console.log(err);
    }
});

app.post("/cari", function (req, res) {
    try {
        connection.query(
            `SELECT * FROM barang WHERE nama LIKE '%${req.body.cari}%'`,
            function (error, results) {
                if (error) throw error;
                res.json({
                    pesan: "ok",
                    data: results,
                });
            }
        );
    } catch (err) {
        console.log(err);
    }
});

//-------------- gambar barang --------------//
app.get("/gambar/:id", function (req, res) {
    try {
        connection.query(
            `SELECT * FROM gambar_barang WHERE id='${req.params.id}'`,
            function (error, results) {
                if (error) throw error;
                res.json({
                    pesan: "ok",
                    data: results,
                });
            }
        );
    } catch (err) {
        console.log(err);
    }
});

//-------------- dakota --------------//
app.post("/dakota", async (req, res) => {
    const respon = await fetch(
        "https://www.dakotacargo.co.id/api/pricelist/?ak=semarang kota&tpr=" +
            req.body.prov +
            "&tko=" +
            req.body.kab +
            "&tke=" +
            req.body.kec
    );
    const hasil = await respon.json();
    res.json({
        pesan: "Ok",
        data: hasil,
    });
});
app.get("/getkec/:kab", async (req, res) => {
    const respon = await fetch(
        "http://www.dakotacargo.co.id/api/api_glb_M_kodepos.asp?key=15f6a51696a8b034f9ce366a6dc22138&id=11022019000001&aKab=" +
            req.params.kab
    );
    const hasil = await respon.json();
    res.json({
        pesan: "Ok",
        data: hasil,
    });
});
app.get("/getkode/:kec", async (req, res) => {
    const respon = await fetch(
        "http://www.dakotacargo.co.id/api/api_glb_M_kodepos.asp?key=15f6a51696a8b034f9ce366a6dc22138&id=11022019000001&aKec=" +
            req.params.kec
    );
    const hasil = await respon.json();
    res.json({
        pesan: "Ok",
        data: hasil,
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
