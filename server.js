const express=require("express");
const path=require("path");
const cookieParser = require("cookie-parser");
const { dbConnection } = require("./connection.js");
var getIP = require('ipware')().get_ip;
const { checkForAuthenctication,restrictTo } = require("./Middleware/auth.js");

//Routes
const urlRoute=require("./Routes/url.js");
const staticRoute=require("./Routes/staticRouter.js")
const userRoute=require("./Routes/user.js");

const app=express();
const PORT=2001

app.set("view engine","ejs");
app.set("Views",path.resolve("./views"))



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenctication);
app.use(function(req, res, next) {
    const ipInfo = getIP(req);
    console.log(ipInfo);
   
    next();
});
dbConnection("mongodb://127.0.0.1:27017/short_url").then(()=>
    console.log("Mongodb Connected")
)

app.use("/url",restrictTo(["NORMAL","ADMIN"]),urlRoute);
app.use("/",staticRoute);
app.use("/user",userRoute);

app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))
