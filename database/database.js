const { MongoClient, ObjectId } = require("mongodb")


// Substitua pela senha correta
const uri = "mongodb+srv://Karate_dojo:ZUK2rh3n79MHUPhM@dbkarate.tygkh.mongodb.net/?retryWrites=true&w=majority&appName=dbKarate"
let singleton

async function connection() {

  if (singleton) return singleton

  // Crie uma nova instância do MongoClient
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  console.log("Conectado com sucesso ao MongoDB!");

  // Aqui você pode adicionar lógica para acessar coleções e dados
  singleton = client.db("dbDojo");
  return singleton

}

async function insert(aluno){
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

async function edit(id, dados_aluno, dados_respons, dados_matricula, is_adm) {
  const db = await connection();
  return db.collection("alunos").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        dados_aluno,
        dados_respons,
        dados_matricula,
        is_adm
      }
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
  remove
}
