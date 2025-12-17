const express = require("express")
const userRoute = express.Router()

const {getUser, addUser, dltUser, userPut, userPatch} = require('../../controller/userController/userController')

userRoute.get("/myuser", getUser)
userRoute.post("/myuser", addUser)
userRoute.delete("/myuser/:uid", dltUser);
userRoute.put("/myuser/:uid", userPut);
userRoute.patch("/myuser/:uid", userPatch);

module.exports= userRoute