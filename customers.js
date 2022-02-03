// connect mysql to Js 
// Import the package
import mysql from 'mysql2';
// const mysql =require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',// this is just a user name 
    password: 'Aloulou0905',
    database:'Commerce'
})

// create a function to get all CUSTOMERS 
const getAllCustomers = async () => {
    const selectQuery = 'SELECT * FROM Customers'

    const [customers, fields] = await connection.promise().query(selectQuery)

  // const results =  await connection.promise().query(selectQuery)
  // const customers = result [0]
  // const fields = results [1]

   console.log('this is the', customers)
   return customers
}

   const createCustomer = async (cust) => {
       const insertQuery = 
       `INSERT INTO Customers (Id, Name, Email)
       VALUES (?, ?, ?)`

       const [results] = await connection.promise()
       .query(insertQuery, [cust.id, cust.name, cust.email])

       console.log(results)

       return results
    
   }

   createCustomer({
        name:"Carlie",
        id: 1,
        email: "carlie@aol.com"
    })





getAllCustomers()
connection.end()
