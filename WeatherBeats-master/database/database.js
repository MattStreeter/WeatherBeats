const {Client} = require('pg')
const client = new Client({
  user: 'postgres',
  password: 'postgres',
  database: 'user.sql'
})

client.connect()
.then(() => console.log("Connected Successfully"))
.then(() => client.query("select * from consumer"))
.catch (e => console.log)
.finally(()=> client.end())
