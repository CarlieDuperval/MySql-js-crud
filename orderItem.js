import mysql from "mysql2";
import fs from "fs";

const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root', // can be any name like daried, this is just a user name
    password: '',
    database: 'Commerce'
}
)
const getAllOrderItems = async () => {
    const selectQuery = 'SELECT * FROM OrderItems'

    const [orderitems, fields] = await connection.promise().query(selectQuery)

    console.log('this is the', orderitems)

    return orderitems
}


const createOrderItems = async (cust) => {
    const insertQuery = 
    `INSERT INTO OrderItems (Id, ProductId, OrderId, Qty)
    VALUES (?, ?, ?, ?)`

    try {
        const [results] = await connection.promise()
        .query(insertQuery, [orderit.id, orderit.productid, orderit.orderid, orderit.qty ])

        console.log(results)
        return results
    }
 catch (error) {
        console.log(error)
    }

    
    //return results
}

const createMultipleOrderItems =  async (orderitemCollection) => {
    const insertQuery = 
    `INSERT INTO OrderItems (Id, ProductId, OrderId, Qty)
    VALUES ?`

    try {
        const [results] = await connection.promise()
        .query(insertQuery, [orderitemCollection])

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


const createOrderItemsFromFile = async (fileName) => {
    
    //1Read the file
    const data = fs.readFileSync(fileName, "utf-8").toString()

    // Put each line into an array of strings
    const fileArr = data.split("\n") //\u2028 => new line
    
    //Create a container for the bulk insert
    const orderitemCollection = []

    for( const line of fileArr) {
        
        // turn each line into and array
        //console.log(line)
        let orderitemData = line.split(",")

        if(!orderitemData[0] || orderitemData[0] === 'id'){
            console.log("this is not id", orderitemData[0])
            continue
        }


        orderitemData[0] = Number.parseInt(orderitemData[0])
        // Add new array to container for bulk insert
        orderitemCollection.push(orderitemData)
        
    }


    // OI collection
    await createMultipleOrderItems(orderitemCollection)
   // console.log(orderitemCollection[0])

}




//createMultipleOrderItems(collection)
createOrderItemsFromFile("orderitem.csv")
.then(res => console.log("created"))
//getAllOrderItems()

const st = "we,love,commas"
const arr = st.split(",")

// console.log(...arr)

connection.end()
