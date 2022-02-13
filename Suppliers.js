import mysql from 'mysql2';
import fs from 'fs'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Aloulou0905',
    database:'Commerce'
})

// create a function to get all Suppliers
const getAllSuppliers = async () => {
    const selectQuery = 'SELECT * FROM Suppliers '

    const [suppliers , fields] = await connection.promise().query(selectQuery)

    console.log('this is the', suppliers)
    return suppliers
 }
 
    const createsuppliers = async (supl) => {
        const insertQuery = 
        `INSERT INTO suppliers (Id, Name, Address, Phone, ContactPersonId)
        VALUES (?, ?, ?, ?, ?)`
 
        const [results] = await connection.promise()
        .query(insertQuery, [supl.id, supl.name, supl.address, supl.phone, supl.contactpersonid])
 
        console.log(results)
 
        return results
     
    }
 
  //  createsuppliers({
  //       id:"5",
  //       name: "TAFYA MICHOU",
  //       address: "22 Route De Peguy-Ville",
  //       phone:"(509) 2941-1010",
  //       contactpersonid:"121"


  //   })
 
     const createMultipleSuppliers = async (arr) => {
        arr.forEach( async element => {
           _ = await createSuppliers(element)
        });
     }
 
 const createSuppliers = (fileName) => {
    const data = fs.readFileSync(fileName)


    console.log(data.toString())
 }
 
 createSuppliers('ritchellduperval/code/suppliers.csv', 'utf8')


//getAllSuppliers()
 


 connection.end()