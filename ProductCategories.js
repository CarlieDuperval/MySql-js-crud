import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Aloulou0905',
    database:'Commerce'
})

// create a function to get all ProductCategories
const getAllProductCategories = async () => {
    const selectQuery = 'SELECT * FROM ProductCategories '

    const [productcategories , fields] = await connection.promise().query(selectQuery)

    console.log('this is the', productcategories)
    return productcategories
 }
 
    const createProductCategories = async (prodC) => {
        const insertQuery = 
        `INSERT INTO productcategories (Id, Name, ParentCategoryId)
        VALUES (?, ?, ?)`
 
        const [results] = await connection.promise()
        .query(insertQuery, [prodC.id, prodC.name, prodC.parentcategoryid])
 
        console.log(results)
 
        return results
     
    }
 
    createProductCategories({
         id:"1555",
         name: "Glasseware",
         parentcategoryid: "6"

     })
 
 
 
 
 
getAllProductCategories ()
 connection.end()