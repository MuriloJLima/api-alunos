// importa o pacote do express
const express = require('express')

//gerenciador de rotas para express
const router = express.Router();

const db = require("../database/database")


//ROTAS DE CRUD ALUNO

//Cadastro
router.post('/cadastrarAlunos', (req, res)=>{
    const aluno = req.body
    db.insert(aluno)
    .then(
        ()=>{
            return res.status(201).json({
                erroStatus:false,
                mensagemStatus:"ALUNO CADASTRADO COM SUCESSO!"
            })
        }
    ).catch(
        (error)=>{
            return res.status(400).json({
                erroStatus:true,
                mensagemStatus:"ERRO AO CADASTRAR O ALUNO.",
                errorObject:error
            });
        }
    );
    
})

//listagem
router.get('/listarAlunos', (req, res)=>{
    db.find()
        .then(
            (response)=>{
                return res.status(200).json({
                    erroStatus:false,
                    mensagemStatus:"ALUNOS LISTADOS COM SUCESSO.",
                    data:response
                })
            }
        ).catch(
            (error)=>{
                return res.status(400).json({
                    erroStatus:true,
                    mensagemStatus:"ERRO AO LISTAR OS ALUNOS.",
                    errorObject:error
                });
            }
        );
})

//Listagem por PK
router.get('/listarAlunoPK/:id', (req, res)=>{

    let id = req.params
    db.findOne(id)
    .then(
        (response)=>{
            return res.status(200).json({
                erroStatus:false,
                mensagemStatus:"ALUNO RECUPERADO COM SUCESSO.",
                data:response
            })
        }
    )
    .catch(
        (error)=>{
            return res.status(400).json({
                erroStatus:true,
                mensagemStatus:"ERRO AO RECUPERAR O ALUNO.",
                errorObject:error
            });
        }
    )

});

//listagem por nome
router.get('/listarAlunoNOME/:nome_aluno', (req, res)=>{

    let {nome_aluno} = req.params;

    modelAlunos.findOne({attributes:[
                                        'id_aluno', 'nome_aluno', 'contato_aluno', 'nasc_aluno', 'grad_aluno', 't_sanguineo'
                                    ],where:{nome_aluno}})
    .then(
        (response)=>{
            return res.status(200).json({
                erroStatus:false,
                mensagemStatus:"ALUNO RECUPERADO COM SUCESSO.",
                data:response
            })
        }
    )
    .catch(
        (error)=>{
            return res.status(400).json({
                erroStatus:true,
                mensagemStatus:"ERRO AO RECUPERAR O ALUNO.",
                errorObject:error
            });
        }
    )
});


//edição
router.put('/alterarAlunos', (req, res) => {
    const id = req.body._id;
    const { dados_aluno, dados_respons, dados_matricula, is_adm } = req.body;
  
    console.log(req.body);
  
    db.edit(
      id,
      dados_aluno,
      dados_respons,
      dados_matricula,
      is_adm
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
router.delete('/excluirAlunos/:id', (req, res)=>{
    console.log(req.params);
    let id = req.params

    db.remove(id)
    .then(
        ()=>{
            return res.status(200).json({
                erroStatus:false,
                mensagemStatus:"ALUNO EXCLUÍDO COM SUCESSO."
            })
        }
    ).catch(
        (error)=>{
            return res.status(400).json({
                erroStatus:true,
                mensagemStatus:"ERRO AO EXCLUIR O ALUNO.",
                errorObject:error
            });
        }
    );
})

//torna as rotas utilizáveis em outro arquivo
module.exports = router;