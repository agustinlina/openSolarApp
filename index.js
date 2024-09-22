import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const port = process.env.PORT || 8080
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(express.json()) //

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port} ...`)
})
