import mysql from 'mysql2';
import fs from 'fs'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Aloulou0905',
    database:'Commerce'
})

// create a function to get all orderItems 
const getAllOrderItems = async () => {
    const selectQuery = 'SELECT * FROM OrderItems '

    const [orderitems , fields] = await connection.promise().query(selectQuery)

    console.log('this is the', orderitems)
    return orderitems
 }
 
    const createOrderItems = async (ordIt) => {
        const insertQuery = 
        `INSERT INTO OrderItems (Id, ProductId, OrderId, Qty)
        VALUES (?, ?, ?, ?)`
 
        const [results] = await connection.promise()
        .query(insertQuery, [ordIt.id, ordIt.productid, ordIt.orderid, ordIt.qty])
 
        console.log(results)
 
        return results
     
    }
 
    // createOrderItems({
    //      id:"112",
    //      productid: "175",
    //      orderid: "11000",
    //      qty:"50.00",

    //  })

     const createMultipleOrderItems = async (arr) => {
        arr.forEach( async element => {
           _ =  await createOrderItems(element)
        });
     }
 
 
 
 const createOrderItemsFromFile = (fileName) => {
    const data = fs.readFileSync(fileName)


    console.log(data.toString())
 }
 
 createOrderItemsFromFile('orderitems.csv', 'utf8')
//getAllOrderItems()
 connection.end()