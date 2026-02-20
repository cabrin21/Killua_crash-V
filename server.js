const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTE API POUR TON SITE
app.post("/get-code", (req, res) => {
    const { inputCode } = req.body;

    if (!inputCode) {
        return res.json({ message: "Code invalide ❌" });
    }

    // Génération du code
    const generatedCode = "KILLUA-" + Math.floor(Math.random() * 999999);

    res.json({
        message: "Code généré ⚡ : " + generatedCode
    });
});

// ROUTE TEST
app.get("/", (req, res) => {
    res.send("KILLUA API ONLINE ⚡");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("KILLUA API running on port " + PORT);
});
