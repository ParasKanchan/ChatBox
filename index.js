import express, { urlencoded } from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import {Chat} from "./models/chat.js"

import methodOverride from "method-override";


const app = express();
const port = 8080;

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));//This statement is to parse the data from req.body
app.use(methodOverride("_method"));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/whatsapp');
  }

main()
     .then(()=>{console.log("Connection Successfull!")})
     .catch(err => console.log(err));


//Index Route
app.get("/chats",async (req,res)=>{
    let chats = await Chat.find();
    //console.log(chats);
    res.render("index.ejs",{chats});
});

//New route
app.get("/chats/new", (req,res)=>{
    res.render("new.ejs");
})

//Create Route
app.post("/chats",(req,res)=>{

    let {from, to, msg} = req.body;

    let newChat = new Chat({
        from:from,
        to:to,
        msg:msg,
        Created_at:new Date()
    });
    //note: save(),delete() -->asyncronous process but no need to use aait keyword if we are using then() keyword
    newChat.save().then(res=>{console.log("Chat was saved")}).catch(err=>{console.log(err)});
    res.redirect("/chats");

});

//Edit Route
app.get("/chats/:id/edit",async (req,res)=>{
     
    let {id} = req.params;
    let chat = await Chat.findById(id);

    res.render("edit.ejs",{chat});
});
//Update Route
app.put("/chats/:id", async (req,res)=>{
    let {id} = req.params;
    let {msg : newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true},{new:true});
    console.log(updatedChat);
    res.redirect("/chats");
})

//Delete or Destroy Route
app.delete("/chats/:id", async (req,res)=>{
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id); 
    console.log(deletedChat);
    res.redirect("/chats");
})

app.get("/",(req,res)=>{
    res.send("root is working");
})

app.listen(port,()=>{
    console.log(`App is listening at ${port}`);
})