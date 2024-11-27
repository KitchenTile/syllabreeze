import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import { error } from "console";
import session from "express-session";
import { connectToMyMongoDB, db } from "./src/config/db.js";
import { ObjectId } from "mongodb";

import userAuth from "./src/middlewares/sessionAuth.js";

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

    //user template could be moved to new file
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
            return res.status(401).json({message: 'Not enough data to complete registration!'});
        } 

        const result = await db.collection("users").insertOne(user);
        console.log("acknowledged: " + result.acknowledged);
        res.status(200).json({message: "User registered successfully"})
    } catch (error) {
        console.log(error);
    }
   
});

//get login
app.get("/M00915023/login", async (req, res) => {
    //if user is defined (active session), return status else return error
    return req.session.user 
    ? res.status(200).json(req.session.user)
    : res.status(401).json({message: "Not authenticated"})
});

//post login
app.post("/M00915023/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let user;

    try{
        //if email is tied to an user then save it in a variable
        await db.collection("users").findOne({email})
         ? user = await db.collection("users").findOne({email})
         : res.status(401).json({ message: "Invalid email or password" });
        
        //if the password input is differnet than the object password
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

    const haikuInfo = {
        haiku: haiku,
        author:author,
        likes: 0
    }
    
    try{
       const postedHaiku = await db.collection("haikus").insertOne(haikuInfo);
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
    // userAuth(req, res);
    try{
        const content = await db.collection("haikus").find({}).toArray();
        res.status(200).json(content);
    } catch (error) {
        console.error('Error retrieving haikus:', error);
        res.status(500).json({ message: 'Internal server error' }); 
    }
});

//post follow
app.post("/M00915023/follow/:username", async (req, res) => {
    // check if user is logged in
    if (!req.session.user){
        return res.status(401).json({message: "User not logged in"});
    }

    const currentUserId = req.session.user._id;
    const username = req.params.username;

    try {
        //find user then array the search
        const findUser = await db.collection("users").findOne({username})

        //check if array is empty
        if (findUser) {
            console.log("User found:", findUser);

            //grab the first element's id
            const userToFollowId = findUser._id;

            //update current user's following array
            const updateFollowing = await db.collection("users").updateOne( 
                { _id: new ObjectId(String(currentUserId))},
                { $push: { following: new ObjectId(String(userToFollowId))} }
            );

            //update followee's followers array
            const updateFollower = await db.collection("users").updateOne(
                { _id: new ObjectId(String(userToFollowId)) },
                { $push: {followers: new ObjectId(String(currentUserId))}}
            );

            await Promise.all([updateFollowing, updateFollower]);

            //json message
            return res.status(200).json({message: `Succesfully followed ${username}`});

        } else {
            //if array is empty then no user was found
            console.log("No user found");
            res.status(401).json({ message: "No user found" });
        };

    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Internal server error" });
    };
});

//delete follow
app.delete("/M00915023/follow/:username", async (req, res) => {
    // check if user is logged in
    if (!req.session.user){
        return res.status(401).json({message: "User not logged in"});
    }

    const currentUserId = req.session.user._id;
    const username = req.params.username;

    //same approach as follow but with $pull instead of $push
    try {
        const findUser = await db.collection("users").findOne({username})

        if (findUser) {
            console.log("User found:", findUser);

            const userToFollowId = findUser._id;

            const updateFollowing = await db.collection("users").updateOne( 
                { _id: new ObjectId(String(currentUserId))},
                { $pull: { following: new ObjectId(String(userToFollowId))} }
            );

            const updateFollower = await db.collection("users").updateOne(
                { _id: new ObjectId(String(userToFollowId)) },
                { $pull: {followers: new ObjectId(String(currentUserId))}}
            );

            await Promise.all([updateFollowing, updateFollower]);

            return res.status(200).json({message: `Succesfully unfollowed ${username}`});

        } else {
            console.log("No user found");
            res.status(401).json({ message: "No user found" });
        };

    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Internal server error" });
    };
});


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
        res.status(500).json('Error retrieving documents');
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
        res.json(users);
    } catch (error) {
        console.error('Error retrieving documents:', error);
        res.status(500).json({message: 'Error retrieving documents'});
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
        const findUser = await db.collection("users").findOne({username});
            if (findUser.username){
                console.log({findUser});
                res.json(findUser);
            } else {
                console.log("No User found")
            }
        
    } catch (error) {
        console.error('Error retrieving documents:', error);
        res.status(500).json({message: 'Error retrieving documents'});
    }
});

app.listen(8080);
console.log("port 8080");