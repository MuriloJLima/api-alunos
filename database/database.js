require('dotenv').config();
const { MongoClient, ObjectId } = require("mongodb")


let singleton

async function connection() {

  if (singleton) return singleton

  const uri = "mongodb+srv://Karate_dojo:ZUK2rh3n79MHUPhM@dbkarate.tygkh.mongodb.net/?retryWrites=true&w=majority&appName=dbKarate"
  const dbName = "dbDojo"; // Nome do banco de dados

  if (!uri || !dbName) {
    throw new Error("Variáveis de ambiente MONGO_URI ou MONGO_DB_NAME não definidas.");
  }

  

  // Crie uma nova instância do MongoClient
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  console.log("Conectado com sucesso ao MongoDB!");

  // Aqui você pode adicionar lógica para acessar coleções e dados
  singleton = client.db(dbName);
  return singleton

}

async function insert(aluno) {
  const db = await connection()
  return db.collection("alunos").insertOne(aluno)
}

async function find() {
  const db = await connection()
  return db.collection("alunos").find().toArray()
}

async function findOne(id) {
  const db = await connection()
  return db.collection("alunos").findOne({ _id: new ObjectId(id) })
}

async function edit(id, dados_aluno, dados_respons, dados_matricula, desc_aluno, senha_aluno, is_adm, newImageUrl) {
  const db = await connection();

  // Monta o objeto $set dinamicamente
  const updateFields = {
    dados_aluno,
    dados_respons,
    dados_matricula,
    desc_aluno,
    senha_aluno,
    is_adm
  };

  // Adiciona image_url ao $set apenas se image_url não for null
  if (newImageUrl !== null) {
    updateFields.image_url = newImageUrl;
  }

  return db.collection("alunos").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: updateFields
    }
  );
}



async function remove(id) {
  const db = await connection()
  return db.collection("alunos").deleteOne({ _id: new ObjectId(id) })
}




module.exports = {
  insert,
  find,
  findOne,
  edit,
  remove,
};