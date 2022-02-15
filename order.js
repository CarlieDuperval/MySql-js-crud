import mysql from "mysql2";
import fs from "fs";

const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root', // can be any name like daried, this is just a user name
    password: '',
    database: 'Commerce'
}
)
const getAllOrders = async () => {
    const selectQuery = 'SELECT * FROM Orders'

    const [orders, fields] = await connection.promise().query(selectQuery)

    console.log('this is the', orders)

    return orders
}


const createSuppliers = async (order) => {
    const insertQuery = 
    `INSERT INTO Orders (Id, OrderDate, DeliveryDate, CustomerId, TotalPrice)
    VALUES (?, ?, ?, ?, ?)`

    try {
        const [results] = await connection.promise()
        .query(insertQuery, [order.id, order.orderdate, order.deliverydate, order.customerid, order.totalprice])

        console.log(results)
        return results
    }
 catch (error) {
        console.log(error)
    }

    
    //return results
}

const createMultipleOrders =  async (orderCollection) => {
    const insertQuery = 
    `INSERT INTO Orders (Id, OrderDate, DeliveryDate, CustomerId, TotalPrice)
    VALUES ?`

    try {
        const [results] = await connection.promise()
        .query(insertQuery, [orderCollection])

        console.log(results)
        return results
    }
 catch (error) {
        console.log(error)
    }

}


// createOrder({
//     id: 120,
//     Orderdate: "10-10-2022",
//     deliverydate: "10-11-2022 ",
//     customerid: 2,
//     totalprice: 150.20
// })


const createOrdersFromFile = async (fileName) => {
    
    //1Read the file
    const data = fs.readFileSync(fileName, "utf-8").toString()

    // Put each line into an array of strings
    const fileArr = data.split("\n") //\u2028 => new line
    
    //Create a container for the bulk insert
    const orderCollection = []

    for( const line of fileArr) {
        
        // turn each line into and array
        //console.log(line)
        let orderData = line.split(",")

        if(!orderData[0] || orderData[0] === 'id'){
            console.log("this is not id", orderData[0])
            continue
        }


        orderData[0] = Number.parseInt(orderData[0])
        // Add new array to container for bulk insert
        orderCollection.push(orderData)
        
    }


    // order collection
    await createMultipleOrders(orderCollection)
   // console.log(orderCollection[0])

}



//const collection = [[2000,'Tania Clarke','9936 MIAMI GARDENS FL','tania@aol.com','(509)956-5725']]
//createMultipleOrders(collection)
createOrdersFromFile("orders.csv")
.then(res => console.log("created"))
//getAllOrders()

const st = "we,love,commas"
const arr = st.split(",")

// console.log(...arr)

connection.end()
