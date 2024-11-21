import path from "path";
import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());
app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')));


const uri = "mongodb+srv://David:AvPzorozOKk4SPEu@sylabreeze-db.w0ll5.mongodb.net/?retryWrites=true&w=majority&appName=sylabreeze-db";

const mydb = "Syllabreeze";

let db;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
async function connectToMyMongoDB() {   
    try{
        await client.connect();
        console.log("Connected to Mongodb and express");
        db = client.db(mydb);
    } catch (error) {
        console.error("MongoDB connection error", error);
    }
}

connectToMyMongoDB();


app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '../public/index.html'));
});

app.post("/M00915023/addUsers", async (req, res) => {
    try{
        // const data = req.body;
        const data = {"name" : "Pepe", "sex" : "Male", "gender": "Man"};
        const result = await db.collection("users").insertOne(data);
        res.status(201).send(result);
    } catch (error) {
        console.error("Error inserting document: ",error);
        res.status(201).send("Error inserting document");
    }
});

app.get('/M00915023/users', async (req, res) => {
    try {
        const users = await db.collection("users").find({}).toArray();
        console.log(users);
        res.status(200).json(users);
    } catch (error) {
        console.error('Error retrieving documents:', error);
        res.status(500).send('Error retrieving documents');
    }
});

const userSex = "Female";

app.get(`/M00915023/users/:sex`, async (req, res) => {
    try {
        if (userSex) {
            const userSex = req.params.sex;
            const findUser = await db.collection("users").find({"sex" : `${userSex}`}).toArray();
            console.log({findUser});
            res.status(200).json(findUser);
        } else {
            console.log("No User found")
        }
        
    } catch (error) {
        console.error('Error retrieving documents:', error);
        res.status(500).send('Error retrieving documents');
    }
});


// Route for creating the post
app.post('/M00915023/create', async (req, res) => {   
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;
    const DOB = req.body.DOB;

    if (!req.body.fName || !req.body.lName || !req.body.email) {
        return res.status(400).send('Name and Email are required!');
    }

    const result = await db.collection("users").insertOne({ fName, lName, email, DOB });
    console.log(result);
    })

app.listen(8080);
console.log("port 8080");