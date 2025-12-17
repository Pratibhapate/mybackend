const express = require("express")
const app = express();
const dotenv = require("dotenv");
dotenv.config()


app.use(express.json())

const port = process.env.SERVER_PORT;

const userRoute = require("./route/userRoute/userRoute")
app.use("/", userRoute)

app.listen (port, ()=>{
    console.log(`server is running `)
})

