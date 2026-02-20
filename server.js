const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Killua active ⚡");
});

app.get("/api/code", (req, res) => {

  const randomCode = "243" + Math.floor(100000 + Math.random() * 900000);

  res.json({
    status: "success",
    code: randomCode
  });

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Serveur lancé ⚡");
});
