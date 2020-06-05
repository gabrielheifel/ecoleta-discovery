const express = require("express")
const server = express()  

// Configurar pasta public
server.use(express.static("public"))
 
// Configurar caminhos da minha aplicação
// Página inicial
// req: Requisição
// res: Resposta
server.get("/", (req, res) => {
    //Envida o html
    res.sendFile(__dirname + "/views/index.html")   //__dirname = diretorio onde esta o server.js no caso    
})

server.get("/create-point", (req, res) => {
    //Envida o html
    res.sendFile(__dirname + "/views/create-point.html")     
})

// Ligar o servidor
server.listen(3000)     // Abre a porta localhost:3000 do servidor(no browser)
