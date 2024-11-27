import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import { error } from "console";
import session from "express-session";
import { connectToMyMongoDB, db } from "./src/config/db.js";
import { ObjectId } from "mongodb";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());

// session middleware to store session data
app.use(session({
    secret: "M00915023",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 3600000 //an hour
    }
}))
app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')));

//connects to the db
connectToMyMongoDB();

app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '../public/index.html'));
    //get session info
    console.log(req.session);
    console.log(req.session.id);

    //allows us to link session to user
    req.session.visited = true;
});

// Route for creating users
app.post('/M00915023/users', async (req, res) => {   

    const fName = req.body.fName;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const user = {
        name: fName,
        email: email,
        username: username,
        password: password,
        profilePicture: null,
        followers: [],
        following: [],
        haikus: [],
    };

    try{
        if (!fName || !username || !email || !password ) {
            return res.status(401).send('Not enough data to complete registration!');
        } 

        const result = await db.collection("users").insertOne(user);
        console.log("acknowledged: " + result.acknowledged);
    } catch (errpr) {
        console.log(error);
    }
   
});

//get login
app.get("/M00915023/login", async (req, res) => {
    //if user is defined (active session), return status else return error
    return req.session.user 
    ? res.status(200).send(req.session.user)
    : res.status(401).json({message: "Not authenticated"})
});

//post login
app.post("/M00915023/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let user;

    try{
        await db.collection("users").findOne({email})
         ? user = await db.collection("users").findOne({email})
         : res.status(401).json({ message: "Invalid email or password" });
         ;
        console.log(user.password, user.email);

        user.password !== password
            //status 401 is unaithenticated
            ? res.status(401).json({ message: "Invalid email or password" }) 
            //if user exists and password matches, link the user to the current session
            : req.session.user = user;

        return res.status(200).json({message: "User login successful"})
    } catch (error) {
        console.log(error);
    }
});

// delete login
app.delete("/M00915023/login", async (req, res) => {
    if (req.session.user) {
        //destroy the session
        req.session.destroy();
        res.status(200).json({ message : "Logout Successful! "});
    } else {
        res.status(401).json({ message: "User not logged in"});
    }
});

//post content
app.post("/M00915023/contents", async (req, res) => {
    const haiku = req.body.haiku;
    const author = req.body.author;
    
    try{
       const postedHaiku = await db.collection("haikus").insertOne({ haiku, author });
       console.log(postedHaiku.acknowledged);
       res.status(200).json({ message : "haiku Posted"});

    } catch (error) {
        console.log(error);
    }
});

//get content
app.get("/M00915023/contents", async (req, res) => {
    // check if user is logged in
    if (!req.session.user){
        return res.status(401).json({message: "User not logged in"});
    }
    try{
        const content = await db.collection("haikus").find({}).toArray();
        res.send(content);
    } catch (error) {
        console.log(error)
    }
});

//post follow
app.post("/M00915023/follow", async (req, res) => {
    // check if user is logged in
    if (!req.session.user){
        return res.status(401).json({message: "User not logged in"});
    }

    const currentUserId = req.session.user._id;

    const userToFollow = req.body.userToFollow;

    const id = new ObjectId("6745c093583af3f7c6a64a1f");

    const updateFollowing = async () => {
        
        try{
            await db.collection("users").updateOne( 
                { _id: new ObjectId(String(currentUserId))},
                { $push: { following: id} }
        );
        } catch (error) {
            console.log(error);
        }

    }
        updateFollowing();

        // const updateFollower = async () => {
        //     await db.collection("users").updateOne(
        //         { _id: userToFollow.user.id },
        //         { $addToSet: {followers: userId}}
        //     )
        // }

        return res.status(200).json({
            message: "Succesfully followed someone",
            userUpdate: updateFollowing
        });
});
//delete follow
app.delete("/M00915023/follow", async (req, res) => {
    try{
       
    } catch (error) {

    }
});
//

//search all users
app.get('/M00915023/users/search', async (req, res) => {
    //check if user is logged in
    if (!req.session.user){
        return res.status(401).json({message: "User not logged in"})
    }
    try {
        const users = await db.collection("users").find({}).toArray();
        console.log(users);
        res.status(200).json(users);
    } catch (error) {
        console.error('Error retrieving documents:', error);
        res.status(500).send('Error retrieving documents');
    }
});

//search content
app.get('/M00915023/content/search', async (req, res) => {
    if (!req.session.user){
        return res.status(401).json({message: "User not logged in"})
    }
    try {
        const content = await db.collection("haikus").find({}).toArray();
        console.log(users);
        res.send(users);
    } catch (error) {
        console.error('Error retrieving documents:', error);
        res.status(500).send('Error retrieving documents');
    }
});

//search for user by username
app.get(`/M00915023/users/search/:username`, async (req, res) => {
    //check if user is logged in
    if (!req.session.user){
        return res.status(401).json({message: "User not logged in"})
    }
    
    const username = req.params.username;
    try {
        const findUser = await db.collection("users").find({"user.username" : username}).toArray();
            if (findUser[0].user.username){
                console.log({findUser});
                res.send(findUser);
            } else {
                console.log("No User found")
            }
        
    } catch (error) {
        console.error('Error retrieving documents:', error);
        res.status(500).send('Error retrieving documents');
    }
});




app.listen(8080);
console.log("port 8080");