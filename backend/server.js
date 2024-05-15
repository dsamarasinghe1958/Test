import express from "express";
import mysql from "mysql2/promise"; // Import mysql2 promise-based API
import cors from "cors";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import fs from "fs";
import path from "path";
import random from "random";

// Create the Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

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

// GET request for '/userGetPrivate'
app.get("/userGetPrivate", async (req, res) => {
  try {
    const results = await executeQuery("SELECT * FROM csem_profile_private WHERE scsemppri_id =1");
    res.json(results);
  } catch (error) {
    res.status(500).send("Error retrieving data from database");
  }
});
// GET request for '/userGetPublic'
app.get("/userGetPublic", async (req, res) => {
  try {
    const results = await executeQuery("SELECT * FROM csem_profile_public WHERE scsemppri_id =1");
    res.json(results);
    console.log("--sqluserGetPublic--");
    console.log(results);
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

// POST request for '/userPostPrivate'
app.post("/userPostPrivate", async (req, res) => {
  try {
   const { InputFirstName, InputLastName, InputPhone, InputAltEmail } = req.body;
   console.log("--sqluserPostPrivate--");
   console.log(req.body);
    const userId = req.body.InputUserId; // Assuming you're passing the user ID for the WHERE condition  
    await executeQuery("UPDATE csem_profile_private SET scsemppri_first_name = ?, scsemppri_last_name = ?, scsemppri_phone = ?, scsemppri_alt_email = ? WHERE scsemppri_id = ?",
  [InputFirstName, InputLastName, InputPhone, InputAltEmail, userId]
);
   res.json("Data updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating data in database");
  }
});
// POST request for '/userPostPublic'
app.post("/userPostPublic", async (req, res) => {
  try {
   const { InputNickName, InputCountry } = req.body;
   console.log("--sqluserPostPublic--");
   console.log(req.body);
    const userId = req.body.InputUserId; // Assuming you're passing the user ID for the WHERE condition  
    await executeQuery("UPDATE csem_profile_public SET scsemppub_nickname = ?, scsemppub_countrycode = ? WHERE scsemppri_id = ?",
  [InputNickName, InputCountry, userId]
);
   res.json("Data updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating data in database");
  }
});
// Start the server
app.use(cors());
app.use(express.json())
app.use(fileUpload());

app.post("/upload",(req,res)=>{

    const data={
        name:req.body.name,
         email:req.body.email,
         
         image:req.body.image,   
    
    };
    console.log("--sqlww0--");
    console.log(data);
    let sql="INSERT INTO `img_upload` SET ?";
    pool.query(sql,data,(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
             console.log("inserted");
             res.send(result);
            // res.send()

        }
    })

})

app.post('/imgupload', (req, res) => {
   
    
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let targetFile = req.files.imgfile;
    let newimgFile = req.files.newimg;

    let extName = path.extname(targetFile.name);
    let newextName = path.extname(newimgFile.name);

   
    const num= random.int(10000,999999);
  
     let uploadDir = path.join(__dirname, '../backend','public','upload', num+targetFile.name);
     let newuploadDir = path.join(__dirname, '../backend','public','upload', num+newimgFile.name);

    let imgList = ['.png','.jpg','.jpeg'];
    // Checking the file type
    if(!imgList.includes(extName)  ){
      
        return res.json({submit:false,msg:"Only jpg ,jpeg and png"})
    }
    if(!imgList.includes(newextName)  ){
      
        return res.json({submit:false,msg:"Only jpg ,jpeg and png"})
    }

    if(targetFile.size > 2000000 ){
       
       return res.json({submit:false,msg:"File should be less then 2 MB "})
    }
    if( newimgFile.size > 2000000){
       
        return res.json({submit:false,msg:"File should be less then 2 MB "})
     }

    

    targetFile.mv(uploadDir, (err) => {
        if (err)
        {
            return res.status(500).send(err);
        }
        else{

            newimgFile.mv(newuploadDir,(err)=>{
                if (err)
                {
                    return res.status(500).send(err);
                }
                else{

                    const imgname=num+targetFile.name
                    const newimgname=num+newimgFile.name
                    const data={
                        name:req.body.name,
                         email:req.body.email,
                         
                         image:imgname,
                         newimg:newimgname,
                         
                    
                    };
                    let sql="INSERT INTO `img_upload` SET ?";
                    pool.query(sql,data,(err,result)=>{
                        if(err)
                        {
                            console.log(err);
                        }
                        else{
                              console.log("inserted");
                            //  res.send(result);
                            // // res.send()
                            res.json({submit:true,fliname:targetFile.name,name:data.name,email:data.email,newimg:newimgFile.name})
                
                        }
                    })

                }

            })





           
        }
            

      
    });
  
});

app.post("/uploadtest", (req, res) => {
  const data = req.body.imageData;
  const userId = req.body.userId
  const base64Data = data.replace(/^data:image\/png;base64,/, '');
  const fileName = `profile_photo_${userId}_${Date.now()}.png`
  const filePath = path.join(__dirname, 'uploads', fileName);

  fs.writeFile(filePath, base64Data, 'base64', (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error saving profile photo' });
    } else {
      db.query(
        "UPDATE personal_info SET profile_pic = ? WHERE user_id = ?", [fileName, userId],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            // res.send(result);
            res.send({ message: 'Profile photo saved successfully' });
          }
        }
      )
      // res.json({ message: 'Profile photo saved successfully' });
    }
  });

})
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

