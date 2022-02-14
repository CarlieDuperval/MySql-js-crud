import mysql from 'mysql2';
import fs from 'fs';

const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root', // can be any name like daried, this is just a user name
    password: '',
    database: 'Commerce'
})


const getAllCustomers = async () => {
    const selectQuery = 'SELECT * FROM Customers'

    const [customers, fields] = await connection.promise().query(selectQuery)

    console.log('this is the', customers)

    return customers
}

const createCustomer = async (cust) => {
    const insertQuery = 
    `INSERT INTO Customers (Id, Name, Email)
    VALUES (?, ?, ?)`

    try {
        const [results] = await connection.promise()
        .query(insertQuery, [cust.id, cust.name, cust.email])

        console.log(results)
        return results
    } catch (error) {
        console.log(error)
    }
    

    //return results
}

const createMultipleCustomers =  async (customerCollection) => {
    const insertQuery = 
    `INSERT INTO Customers (Id, Name, Address, Email, Phone)
    VALUES ?`

    try {
        const [results] = await connection.promise()
        .query(insertQuery, [customerCollection])

        console.log(results)
        return results
    } catch (error) {
        console.log(error)
    }
}

// createCustomer({
//     id: 1,
//     name: "Darie Dorlus",
//     email: "darie@dorlus.com"
// })


const createCustomersFromFile = async (fileName) => {
    
    //1Read the file
    const data = fs.readFileSync(fileName, "utf-8").toString()

    // Put each line into an array of strings
    const fileArr = data.split("\n") //\u2028 => new line
    
    //Create a container for the bulk insert
    const customerCollection = []

    for( const line of fileArr) {
        
        // turn each line into and array
        //console.log(line)
        let customerData = line.split(",")

        if(!customerData[0] || customerData[0] === 'id'){
            console.log("this is not id", customerData[0])
            continue
        }

        customerData[0] = Number.parseInt(customerData[0])
        // Add new array to container for bulk insert
        customerCollection.push(customerData)
        
    }

    // customer collection
    await createMultipleCustomers(customerCollection)
   // console.log(customerCollection[0])

}


//const collection = [[2000,'Tania Clarke','9936 MIAMI GARDENS FL','tania@aol.com','(509)956-5725']]
//createMultipleCustomers(collection)
createCustomersFromFile("customers.csv")
.then(res => console.log("created"))
//getAllCustomers()

// const st = "we,love,commas"
// const arr = st.split(",")

// console.log(...arr)

connection.end()