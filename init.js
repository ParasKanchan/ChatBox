//this is to initialise database
import mongoose from "mongoose";
import {Chat} from "./models/chat.js"


async function main() {
    await mongoose.connect('mongodb://localhost:27017/whatsapp');
  }

main()
     .then(()=>{console.log("Connection Successfull!")})
     .catch(err => console.log(err));

let allChats = [
    {
        from : "Paras",
        to : "Harsh",
        msg : "Kaisa hai bhootni k",
        Created_at : new Date()
    },
    {
        from : "Harsh",
        to : "Paras",
        msg : "Accha hu bhdwe..tu bta",
        Created_at : new Date()
    },
    {
        from : "Paras",
        to : "Harsh",
        msg : "Intern mili",
        Created_at : new Date()
    },
    {
        from : "Harsh",
        to : "Paras",
        msg : "Nahi bhai..mara rha hu",
        Created_at : new Date()
    },
    {
        from : "Paras",
        to : "Harsh",
        msg : "Marketing k baare mei pta hai kuchh",
        Created_at : new Date()
    },
    {
        from : "Harsh",
        to : "Paras",
        msg : "try kr skta hai",
        Created_at : new Date()
    }
];

Chat.insertMany(allChats);
//Now run this  particular file from terminal instead of index.js