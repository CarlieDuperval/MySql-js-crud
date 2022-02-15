import mysql from "mysql2";
import fs from "fs";

const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root', // can be any name like daried, this is just a user name
    password: 'Aloulou0905',
    database: 'Commerce'
}
)
const getAllProductCategories = async () => {
    const selectQuery = 'SELECT * FROM ProductCategories'

    const [productcategories, fields] = await connection.promise().query(selectQuery)

    console.log('this is the', productcategories)

    return productcategories
}


const createProductCategories = async (prodcategory) => {
    const insertQuery = 
    `INSERT INTO ProductCategories (Id, Name, ParentCategoryId)
    VALUES (?, ?, ?)`

    try {
        const [results] = await connection.promise()
        .query(insertQuery, [prodcategory.id, prodcategory.name, prodcategory.parentcategoryid])

        console.log(results)
        return results
    }
 catch (error) {
        console.log(error)
    }


    
    //return results
}

const createMultipleProductCategories =  async (productcategoriesCollection) => {
    const insertQuery = 
    `INSERT INTO Productcategories (Id, Name, ParentCategoryId)
    VALUES ?`

    try {
        const [results] = await connection.promise()
        .query(insertQuery, [productcategoriesCollection])

        console.log(results)
        return results
    }
 catch (error) {
        console.log(error)
    }

}


// createProductCategories({
//     id: 101,
//     name: "Service",
//     parentcategoryid: 2
// })


const createProductCategoriesFromFile = async (fileName) => {
    
    //1Read the file
    const data = fs.readFileSync(fileName, "utf-8").toString()

    // Put each line into an array of strings
    const fileArr = data.split("\n") //\u2028 => new line
    
    //Create a container for the bulk insert
    const productcategoriesCollection = []

    for( const line of fileArr) {
        
        // turn each line into and array
        //console.log(line)
        let productcategoriesData = line.split(",")

        if(!productcategoriesData[0] || productcategoriesData[0] === 'id'){
            console.log("this is not id", productcategoriesData[0])
            continue
        }


        productcategoriesData[0] = Number.parseInt(productcategoriesData[0])
        // Add new array to container for bulk insert
        productcategoriesCollection.push(productcategoriesData)
        
    }


    // OI collection
    await createMultipleProductCategories(productcategoriesCollection)
   // console.log(productcategoriesCollection[0])

}




//createMultipleOrderItems(collection)
createProductCategories("productcategories.csv")
.then(res => console.log("created"))
getAllProductCategories()

const st = "we,love,commas"
const arr = st.split(",")

// console.log(...arr)

connection.end()
