// importa o pacote do express
const express = require('express')
const fs = require('fs');
const path = require('path');
const upload = require('../middlewares/uploads');

//gerenciador de rotas para express
const router = express.Router();

const db = require("../database/database")


//ROTAS DE CRUD ALUNO

//Cadastro
router.post('/cadastrarAlunos', upload.single('imagem'), (req, res) => {
    const { dados_aluno, dados_respons, dados_matricula, desc_aluno, is_adm } = req.body;
    const image_url = req.file ? req.file.path : null;

    const senha_numerica = Math.floor(1000 + Math.random() * 9000)
    const senha_aluno = senha_numerica.toString();

    

    const novoAluno = ({
        dados_aluno: JSON.parse(dados_aluno),
        dados_respons: JSON.parse(dados_respons),
        dados_matricula: JSON.parse(dados_matricula),
        desc_aluno: JSON.parse(desc_aluno),
        senha_aluno,
        is_adm: JSON.parse(is_adm),
        image_url
    });

    db.insert(novoAluno)
        .then(
            () => {
                return res.status(201).json({
                    erroStatus: false,
                    mensagemStatus: "ALUNO CADASTRADO COM SUCESSO!"
                })
            }
        ).catch(
            (error) => {
                return res.status(400).json({
                    erroStatus: true,
                    mensagemStatus: "ERRO AO CADASTRAR O ALUNO.",
                    errorObject: error
                });
            }
        );

})

//listagem
router.get('/listarAlunos', (req, res) => {
    db.find()
        .then(
            (response) => {
                return res.status(200).json({
                    erroStatus: false,
                    mensagemStatus: "ALUNOS LISTADOS COM SUCESSO.",
                    data: response
                })
            }
        ).catch(
            (error) => {
                return res.status(400).json({
                    erroStatus: true,
                    mensagemStatus: "ERRO AO LISTAR OS ALUNOS.",
                    errorObject: error
                });
            }
        );
})

//Listagem por PK
router.get('/listarAlunoPK/:id', (req, res) => {

    let id = req.params
    db.findOne(id)
        .then(
            (response) => {
                return res.status(200).json({
                    erroStatus: false,
                    mensagemStatus: "ALUNO RECUPERADO COM SUCESSO.",
                    data: response
                })
            }
        )
        .catch(
            (error) => {
                return res.status(400).json({
                    erroStatus: true,
                    mensagemStatus: "ERRO AO RECUPERAR O ALUNO.",
                    errorObject: error
                });
            }
        )

});

router.get('/dadosAluno', (req, res) => {
    const { id } = req.query;
    
    // Envia uma resposta JSON com os dados recebidos
    db.findOne(id)
        .then(
            (response) => {
                return res.status(200).json({
                    erroStatus: false,
                    mensagemStatus: "ALUNO RECUPERADO COM SUCESSO.",
                    data: response
                })
            }
        )
        .catch(
            (error) => {
                return res.status(400).json({
                    erroStatus: true,
                    mensagemStatus: "ERRO AO RECUPERAR O ALUNO.",
                    errorObject: error
                });
            }
        )
});



//edição
router.put('/alterarAlunos', upload.single('imagem'), async (req, res) => {
    const id = req.body._id
    const { dados_aluno, dados_respons, dados_matricula, desc_aluno, senha_aluno, is_adm } = req.body;
    const newImageUrl  = req.file ? req.file.path : null;

    const oldData = await db.findOne(JSON.parse(id));
    const oldImageUrl = oldData?.image_url; 

    // Se uma nova imagem foi enviada e uma antiga existe, remova a antiga
    if (newImageUrl && oldImageUrl) {
        const oldImagePath = path.resolve(oldImageUrl); // Converte para caminho absoluto
        if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath); // Exclui o arquivo antigo
        }
    }
    

    db.edit(
        JSON.parse(id),
        JSON.parse(dados_aluno),
        JSON.parse(dados_respons),
        JSON.parse(dados_matricula),
        JSON.parse(desc_aluno),
        JSON.parse(senha_aluno),
        JSON.parse(is_adm),
        newImageUrl
      )
        .then(() => {
            return res.status(200).json({
                erroStatus: false,
                mensagemStatus: "ALUNO ALTERADO COM SUCESSO."
            });
        })
        .catch((error) => {
            return res.status(400).json({
                erroStatus: true,
                mensagemStatus: "ERRO AO ALTERAR O ALUNO.",
                errorObject: error
            });
        });
});









//exclusão
router.delete('/excluirAlunos/:id', (req, res) => {
    let id = req.params

    db.findOne(id).then((response) => {

        const imageUrl = response.image_url

        // Verifica se a imagem foi fornecida e existe
        if (imageUrl && fs.existsSync(path.resolve(imageUrl))) {
            fs.unlinkSync(path.resolve(imageUrl)); // Deleta o arquivo de imagem
        }



        db.remove(id)
            .then(
                () => {
                    return res.status(200).json({
                        erroStatus: false,
                        mensagemStatus: "ALUNO EXCLUÍDO COM SUCESSO."
                    })
                }
            ).catch(
                (error) => {
                    return res.status(400).json({
                        erroStatus: true,
                        mensagemStatus: "ERRO AO EXCLUIR O ALUNO.",
                        errorObject: error
                    });
                }
            );
    })






})

//torna as rotas utilizáveis em outro arquivo
module.exports = router;