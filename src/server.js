const express = require("express")
const server = express()  

// Configurar pasta public
server.use(express.static("public"))


// Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true,      // Sem cache para não entregar resultados antigos
})

 
// Configurar caminhos da minha aplicação
// Página inicial com renderizador (nunjucks)
// req: Requisição
// res: Resposta
server.get("/", (req, res) => {
    //Envida o html dinâmico
    return res.render("index.html", { title: "Um Título"})    
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {
    return res.render("search-results.html")
})
// Configurar caminhos da minha aplicação
// Sem renderizador (nunjucks)
// server.get("/create-point", (req, res) => {
//     //Envida o html
//     return res.sendFile(__dirname + "/views/create-point.html")     //__dirname = diretorio onde esta o server.js no caso
// })

// Ligar o servidor
server.listen(3000)     // Abre a porta localhost:3000 do servidor(no browser)
