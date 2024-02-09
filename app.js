const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const port = 8082;

// var corsOptions = {
//     origin: [
//         "https://jasminefurniture.store",
//         "https://jasminefurniture.co.id",
//     ],
//     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

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
            const formating = results.map((hasil) => {
                return {
                    id: hasil.id,
                    nama: hasil.nama,
                    harga: hasil.harga,
                    gambar:
                        "http://10.5.49.178:8082/getgambarbarang/" + hasil.id,
                    rate: hasil.rate,
                    stok: hasil.stok,
                    deskripsi: hasil.deskripsi,
                    kategori: hasil.kategori,
                    subkategori: hasil.subkategori,
                    diskon: hasil.diskon,
                    berat: hasil.berat,
                    dimensi: hasil.dimensi,
                    varian: hasil.varian,
                    jml_varian: hasil.jml_varian,
                };
            });
            res.json({
                pesan: "Ok",
                data: formating,
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
                const formating = results.map((hasil) => {
                    return {
                        id: hasil.id,
                        nama: hasil.nama,
                        harga: hasil.harga,
                        gambar:
                            "http://10.5.49.178:8082/getgambarbarang/" +
                            hasil.id,
                        rate: hasil.rate,
                        stok: hasil.stok,
                        deskripsi: hasil.deskripsi,
                        kategori: hasil.kategori,
                        subkategori: hasil.subkategori,
                        diskon: hasil.diskon,
                        berat: hasil.berat,
                        dimensi: hasil.dimensi,
                        varian: hasil.varian,
                        jml_varian: hasil.jml_varian,
                    };
                });
                res.json({
                    pesan: "Ok",
                    data: formating,
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
                const formating = results.map((hasil) => {
                    return {
                        id: hasil.id,
                        nama: hasil.nama,
                        harga: hasil.harga,
                        gambar:
                            "http://10.5.49.178:8082/getgambarbarang/" +
                            hasil.id,
                        rate: hasil.rate,
                        stok: hasil.stok,
                        deskripsi: hasil.deskripsi,
                        kategori: hasil.kategori,
                        subkategori: hasil.subkategori,
                        diskon: hasil.diskon,
                        berat: hasil.berat,
                        dimensi: hasil.dimensi,
                        varian: hasil.varian,
                        jml_varian: hasil.jml_varian,
                    };
                });
                res.json({
                    pesan: "ok",
                    data: formating,
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
                const formating = results.map((hasil) => {
                    return {
                        id: hasil.id,
                        nama: hasil.nama,
                        harga: hasil.harga,
                        gambar:
                            "http://10.5.49.178:8082/getgambarbarang/" +
                            hasil.id,
                        rate: hasil.rate,
                        stok: hasil.stok,
                        deskripsi: hasil.deskripsi,
                        kategori: hasil.kategori,
                        subkategori: hasil.subkategori,
                        diskon: hasil.diskon,
                        berat: hasil.berat,
                        dimensi: hasil.dimensi,
                        varian: hasil.varian,
                        jml_varian: hasil.jml_varian,
                    };
                });
                res.json({
                    pesan: "ok",
                    data: formating,
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
                const formating = results.map((hasil) => {
                    return {
                        id: hasil.id,
                        nama: hasil.nama,
                        harga: hasil.harga,
                        gambar:
                            "http://10.5.49.178:8082/getgambarbarang/" +
                            hasil.id,
                        rate: hasil.rate,
                        stok: hasil.stok,
                        deskripsi: hasil.deskripsi,
                        kategori: hasil.kategori,
                        subkategori: hasil.subkategori,
                        diskon: hasil.diskon,
                        berat: hasil.berat,
                        dimensi: hasil.dimensi,
                        varian: hasil.varian,
                        jml_varian: hasil.jml_varian,
                    };
                });
                res.json({
                    pesan: "ok",
                    data: formating,
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
                const formating = results.map((hasil) => {
                    return {
                        id: hasil.id,
                        nama: hasil.nama,
                        harga: hasil.harga,
                        gambar:
                            "http://10.5.49.178:8082/getgambarbarang/" +
                            hasil.id,
                        rate: hasil.rate,
                        stok: hasil.stok,
                        deskripsi: hasil.deskripsi,
                        kategori: hasil.kategori,
                        subkategori: hasil.subkategori,
                        diskon: hasil.diskon,
                        berat: hasil.berat,
                        dimensi: hasil.dimensi,
                        varian: hasil.varian,
                        jml_varian: hasil.jml_varian,
                    };
                });
                res.json({
                    pesan: "ok",
                    data: formating,
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
                const formating = results.map((hasil) => {
                    return {
                        id: hasil.id,
                        nama: hasil.nama,
                        harga: hasil.harga,
                        gambar:
                            "http://10.5.49.178:8082/getgambarbarang/" +
                            hasil.id,
                        rate: hasil.rate,
                        stok: hasil.stok,
                        deskripsi: hasil.deskripsi,
                        kategori: hasil.kategori,
                        subkategori: hasil.subkategori,
                        diskon: hasil.diskon,
                        berat: hasil.berat,
                        dimensi: hasil.dimensi,
                        varian: hasil.varian,
                        jml_varian: hasil.jml_varian,
                    };
                });
                res.json({
                    pesan: "ok",
                    data: formating,
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
                const formating = results.map((hasil) => {
                    return {
                        gambar1:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/1",
                        gambar2:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/2",
                        gambar3:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/3",
                        gambar4:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/4",
                        gambar5:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/5",
                        gambar6:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/6",
                        gambar7:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/7",
                        gambar8:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/8",
                        gambar9:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/9",
                        gambar10:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/10",
                        gambar11:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/11",
                        gambar12:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/12",
                        gambar13:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/13",
                        gambar14:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/14",
                        gambar15:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/15",
                        gambar16:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/16",
                        gambar17:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/17",
                        gambar18:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/18",
                        gambar19:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/19",
                        gambar20:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/20",
                        gambar21:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/21",
                        gambar22:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/22",
                        gambar23:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/23",
                        gambar24:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/24",
                        gambar25:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/25",
                        gambar26:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/26",
                        gambar27:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/27",
                        gambar28:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/28",
                        gambar29:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/29",
                        gambar30:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/30",
                        gambar31:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/31",
                        gambar32:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/32",
                        gambar33:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/33",
                        gambar34:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/34",
                        gambar35:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/35",
                        gambar36:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/36",
                        gambar37:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/37",
                        gambar38:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/38",
                        gambar39:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/39",
                        gambar40:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/40",
                        gambar41:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/41",
                        gambar42:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/42",
                        gambar43:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/43",
                        gambar44:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/44",
                        gambar45:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/45",
                        gambar46:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/46",
                        gambar47:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/47",
                        gambar48:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/48",
                        gambar49:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/49",
                        gambar50:
                            "http://10.5.49.178:8082/getgambar/" +
                            req.params.id +
                            "/50",
                    };
                });
                res.json({
                    pesan: "ok",
                    data: formating,
                });
            }
        );
    } catch (err) {
        console.log(err);
    }
});

//--------------- Generator Link Gambar ------------//
app.get("/getgambarbarang/:id_barang", (req, res) => {
    connection.query(
        `SELECT * FROM barang WHERE id='${req.params.id_barang}'`,
        (error, results) => {
            if (error) return error;
            const resultFilter = results[0].gambar;
            res.setHeader("Content-Type", "image/jpeg");
            res.send(resultFilter);
        }
    );
});
app.get("/getgambar/:id_barang/:urutan", (req, res) => {
    connection.query(
        `SELECT * FROM gambar_barang WHERE id='${req.params.id_barang}'`,
        (error, results) => {
            if (error) return error;
            const resultFilter = results[0]["gambar" + req.params.urutan];
            res.setHeader("Content-Type", "image/jpeg");
            res.send(resultFilter);
        }
    );
});

//-------------- dakota --------------//
app.post("/dakota", async (req, res) => {
    try {
        const respon = await fetch(
            "https://www.dakotacargo.co.id/api/pricelist/?ak=semarang kota&tpr=" +
                req.body.prov +
                "&tko=" +
                req.body.kab +
                "&tke=" +
                req.body.kec
        );

        if (!respon.ok) {
            const errorData = await respon.json();
            console.error("Error from Dakota API:", errorData);
            throw new Error("Error from Dakota API");
        }

        console.log(respon.ok);
        const hasil = await respon.json();
        res.json({
            pesan: "Ok",
            data: hasil,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ pesan: "Terjadi kesalahan di local" });
    }
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
