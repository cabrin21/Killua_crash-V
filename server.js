const express = require("express");
const cors = require("cors");

const app = express();

// 🔓 Autorise GitHub Pages
app.use(cors({
  origin: "*",
  methods: ["GET"]
}));

app.use(express.json());

// Route test
app.get("/", (req, res) => {
  res.send("API Killua active ⚡");
});

// Route pour générer le code
app.get("/api/code", (req, res) => {

  const randomCode = "243" + Math.floor(100000 + Math.random() * 900000);

  res.json({
    status: "success",
    code: randomCode
  });

});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Serveur Killua lancé ⚡");
});
