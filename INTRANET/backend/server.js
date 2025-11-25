const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o banco
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "intranet"
});

db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao banco:", err);
        return;
    }
    console.log("📌 Conectado ao banco MySQL");
});

// Rota de login (ou cadastro)
app.post("/login", (req, res) => {
    console.log("=== CHEGOU UMA REQUISIÇÃO ===");

    const { email, senha } = req.body;

    console.log("BODY RECEBIDO:", req.body);

    if (!email || !senha) {
        return res.status(400).json({ erro: "Email e senha são obrigatórios" });
    }

    console.log("✔ Dados recebidos corretamente:", email, senha);

    // -----------------------------
    // SALVAR NO BANCO
    // -----------------------------
    const sql = "INSERT INTO acesso (email, senha) VALUES (?, ?)";
    db.query(sql, [email, senha], (err, result) => {
        if (err) {
            console.error("❌ Erro ao inserir:", err);
            return res.status(500).json({ erro: "Erro ao salvar no banco" });
        }

        console.log("✔ Registro salvo com sucesso! ID:", result.insertId);
        res.json({ sucesso: true, id: result.insertId });
    });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log("🚀 Servidor rodando na porta 3000");
});
