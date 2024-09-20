// importa o pacote do express
const express = require('express')
const cors = require('cors')

//importa as rotas
const routesAlunos = require('./route/routesAlunos');

//torna o express executável dentro do script através da constante declarada
const app  = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cors())


//gerenciador de rotas para express
const router = express.Router();

//rota de teste
router.get('/', (req, res)=>{
    res.send('sistema karete');
})

//ativando a rota
app.use('/', router);

//ativando a rota
app.use('/', routesAlunos);

//declaração da porta
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

