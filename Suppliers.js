import mysql from "mysql2";
import fs from "fs";

const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root', // can be any name like daried, this is just a user name
    password: '',
    database: 'Commerce'
}
)
const getAllSuppliers = async () => {
    const selectQuery = 'SELECT * FROM Suppliers'

    const [suppliers, fields] = await connection.promise().query(selectQuery)

    console.log('this is the', suppliers)

    return suppliers
}


const createSuppliers = async (cust) => {
    const insertQuery = 
    `INSERT INTO Suppliers (Id, Name, Address, Phone, ContactPersonId)
    VALUES (?, ?, ?, ?, ?)`

    try {
        const [results] = await connection.promise()
        .query(insertQuery, [supl.id, supl.name, supl.address, supl.phone, supl.contactpersonid])

        console.log(results)
        return results
    }
 catch (error) {
        console.log(error)
    }

    
    //return results
}

const createMultipleSuppliers =  async (supplierCollection) => {
    const insertQuery = 
    `INSERT INTO Suppliers (Id, Name, Address, Phone, ContactPersonId)
    VALUES ?`

    try {
        const [results] = await connection.promise()
        .query(insertQuery, [supplierCollection])

        console.log(results)
        return results
    }
 catch (error) {
        console.log(error)
    }

}


// createCustomer({
//     id: 1,
//     name: "Darie Dorlus",
//     email: "darie@dorlus.com"
// })


const createSuppliersFromFile = async (fileName) => {
    
    //1Read the file
    const data = fs.readFileSync(fileName, "utf-8").toString()

    // Put each line into an array of strings
    const fileArr = data.split("\n") //\u2028 => new line
    
    //Create a container for the bulk insert
    const supplierCollection = []

    for( const line of fileArr) {
        
        // turn each line into and array
        //console.log(line)
        let supplierData = line.split(",")

        if(!supplierData[0] || supplierData[0] === 'id'){
            console.log("this is not id", supplierData[0])
            continue
        }


        supplierData[0] = Number.parseInt(supplierData[0])
        // Add new array to container for bulk insert
        supplierCollection.push(supplierData)
        
    }


    // customer collection
    await createMultipleSuppliers(supplierCollection)
   // console.log(supplierCollection[0])

}



//const collection = [[2000,'Tania Clarke','9936 MIAMI GARDENS FL','tania@aol.com','(509)956-5725']]
//createMultipleSuppliers(collection)
createSuppliersFromFile("suppliers.csv")
.then(res => console.log("created"))
//getAllSuppliers()

const st = "we,love,commas"
const arr = st.split(",")

// console.log(...arr)

connection.end()
