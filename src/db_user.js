const sqlite3 = require('sqlite3').verbose()
const dbName ='later.sqlite'
const db = new sqlite3.Database(dbname)
db.serialize(( )=> {
    const sql = 'CRERATE TABLE IF NOT EXISTS articles (id integer primary key, name , famili , email TEXT, phone integer, pass TEXT)'
    db.run(sql)

})
class Articles{
    static find (id, cb){
        db.get('SELECT *FROM articles id=?',id,cd)
}
    static create (data,cb){
        const sql = 'INSERT INTO articles (name , famili, email, phone, pass) value (?,?,?,?,?)'
        db.run(sql, data.name, data.famili, data.email, data.phone, data.pass)
    }
}   
module.exports=db
module.exports.Articles=Articles
