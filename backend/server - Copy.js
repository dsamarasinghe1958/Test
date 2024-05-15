
const express = require("express");
const mysql = require("mysql2/promise"); // Import mysql2 promise-based API
const cors = require("cors");
const bodyParser = require("body-parser");

// Create the Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create a connection pool to the MySQL database
const mysqlConfig = {
  connectionLimit: 10, // Adjust the limit as per your requirements
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || "3307",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "csemaverick",
};

let pool = null;
let connection = null;
const initializePool = async () => {
  pool = await mysql.createPool(mysqlConfig);
  console.log("Connection pool initialized");
};

initializePool();

// Helper function to execute queries
const executeQuery = async (query, params) => {
  try {
    const connection = await pool.getConnection();
    const [results] = await connection.execute(query, params);
    connection.release();
    return results;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};



const updateUser = async (formData) => {
const { InputFirstName, InputLastName, InputPhone, InputAltEmail, InputUserId } = formData;
 
  try {
    // Construct the SQL query with bind parameters
    const sql = `
      UPDATE csem_profile_private 
      SET 
        scsemppri_first_name = ?,
        scsemppri_last_name = ?,
        scsemppri_phone = ?,
        scsemppri_alt_email = ?
      WHERE 
        scsemppri_id = ?
    `;
    
    // Replace undefined values with null
    const params = [
      InputFirstName || null,
      InputLastName || null,
      InputPhone || null,
      InputAltEmail || null,
      InputUserId
    ];

    // Execute the SQL query with bind parameters
    await pool.query(sql, params);

    console.log('User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

// GET request for '/user'
app.get("/user", async (req, res) => {
  try {
    const results = await executeQuery("SELECT * FROM csem_profile_private WHERE scsemppri_id =1");
    res.json(results);
  } catch (error) {
    res.status(500).send("Error retrieving data from database");
  }
});

// GET request for '/country'
app.get("/country", async (req, res) => {
  try {
    const results = await executeQuery("SELECT * FROM csem_countries");
    res.json(results);
  } catch (error) {
    res.status(500).send("Error retrieving data from database");
  }
});

// POST request for '/user'
app.post("/user", async (req, res) => {
  try {
   const { InputFirstName, InputLastName, InputPhone, InputAltEmail } = req.body;
   console.log("--sql0--");
   console.log(req.body);
    const userId = req.body.InputUserId; // Assuming you're passing the user ID for the WHERE condition  
    await executeQuery("UPDATE csem_profile_private SET scsemppri_first_name = ?, scsemppri_last_name = ?, scsemppri_phone = ?, scsemppri_alt_email = ? WHERE scsemppri_id = ?",
  [InputFirstName, InputLastName, InputPhone, InputAltEmail, userId]
);
console.log("--sql--");
console.log("UPDATE csem_profile_private SET scsemppri_first_name = ?, scsemppri_last_name = ?, scsemppri_phone = ?, scsemppri_alt_email = ? WHERE scsemppri_id = ?");
    res.json("Data updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating data in database");
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

