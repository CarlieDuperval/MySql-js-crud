// connect mysql to Js 
// Import the package
import mysql from 'mysql2';
import fs from 'fs'


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

//    createCustomer({
//        name:"Carlie",
//        id: 1,
//         email: "carlie@aol.com"
//     })




    const createCustomersFromFile = (fileName) => {
        const data = fs.readFileSync(fileName, "utf-8").toString()
    
        const fileArr = data.split("\u2028") //\u2028 => new line
    
        //console.log(...fileArr)
        
        // for(let i = 1; i < fileArr.length; i++){
        fileArr.forEach( async (line, index, array) => {
            console.log(line)
            console.log(index)
            
            if(index !== 0){
                
    
    
                let customerData = line.split(',')
    
                console
                let customer = {
                    id: customerData[0],
                    name: customerData[1],
                    address: customerData[2],
                    email: customerData[3],
                    phone: customerData[4]
                }
                console.log(customer)
                _ = await createCustomer(customer)
            }
        }) 
    
    }
createCustomersFromFile("customers.csv")



//getAllCustomers()

connection.end()






