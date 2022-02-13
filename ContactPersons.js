import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Aloulou0905',
    database:'Commerce'
})

// create a function to get all ContactPersons 
const getAllContactPersons = async () => {
    const selectQuery = 'SELECT * FROM ContactPersons '

    const [contactpersons , fields] = await connection.promise().query(selectQuery)

    console.log('this is the', contactpersons)
    return contactpersons
 }
 
    const createContactPersons = async (contP) => {
        const insertQuery = 
        `INSERT INTO ContactPersons (Id, Name, Email, Phone, Address)
        VALUES (?, ?, ?, ?, ?)`
 
        const [results] = await connection.promise()
        .query(insertQuery, [contP.id, contP.name, contP.email, contP.phone, contP.address])
 
        console.log(results)
 
        return results
     
    }
 
    createContactPersons({
         id:"120",
         name: "Fleurantin Julie",
         email: "fleurantin@gmail.com",
         phone:"509 443-1011",
         address:"10 Rue Barbancourt "
     })
 
 
 
 
 
 getAllContactPersons()
 connection.end()