import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { StreamChat } from "stream-chat";
import {v4 as uuidv4} from "uuid";
import bcrypt from "bcrypt";

dotenv.config()

const app = express();
const PORT = 3001

app.use(cors());
app.use(express.json());

const serverClient = new StreamChat.getInstance(API_KEY, API_SECRET);

app.post("/signup", async (req,res) => {
    try {
        const {firstName, lastName, userName, password} = req.body
        const userId = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);
        const token = serverClient.createToken(userId);
        res.json({token,userId, firstName, lastName, userName, hashedPassword});
    } catch (error) {
        res.json(error)
    }
})
app.post("/login")


app.listen(3001, ()=> {
    console.log(`Server is running on port ${PORT}`)
});

