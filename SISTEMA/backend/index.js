const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')
const conexao = require('./db.js')

const app = express()
app.use(cors())
app.use(express.json())

const porta = 3000

app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`)
})

app.post("/contatenos", async (req, res) => {
  try {
    const { nome, email, mensagem } = req.body

    if (!nome || nome.trim().length < 3) {
      return res.status(400).json({ resposta: "Preencha um nome válido." })
    }
    if (!email || email.trim().length < 5) {
      return res.status(400).json({ resposta: "Preencha um e-mail válido." })
    }
    if (!mensagem || mensagem.trim().length < 5) {
      return res.status(400).json({ resposta: "Escreva uma mensagem mais detalhada." })
    }

    const sql = `INSERT INTO contate_nos (nome, email, mensagem) VALUES (?, ?, ?)`
    const [resultado] = await conexao.execute(sql, [nome, email, mensagem])

    if (resultado.affectedRows === 1) {
      return res.json({ resposta: "Mensagem enviada com sucesso!" })
    } else {
      return res.status(500).json({ resposta: "Erro ao enviar mensagem." })
    }
  } catch (error) {
    console.error("❌ Erro ao salvar mensagem:", error.message)
    res.status(500).json({ resposta: "Erro interno no servidor." })
  }
})
