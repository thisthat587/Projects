const mysql = require('mysql2');
// let customerData = [];
// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'cafe'
});

// Perform queries
const queryString = `SELECT name FROM foodcategorylist`;

async function getCustomerData() {
    try {
        const customerData = await connection.promise().query(queryString);
        // for (let i = 0; i< customerData[0].length; i++) {
        //     console.log(customerData[0][i]);
        // }
        console.log(customerData[0][0]);
        return customerData;

    } catch (error) {
        console.error('Error executing query.....', error);
    }
    return;
}

const data = getCustomerData();
console.log(data)
// Close the connection
connection.end();

