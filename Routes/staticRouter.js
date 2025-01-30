const express=require("express");
const Url = require("../Models/url");
const { restrictTo } = require("../Middleware/auth");
const router=express.Router();

router.get("/admin/users",restrictTo(["ADMIN"]),async(req,res)=>{

    const allUser=await Url.find({})
    
        return res.render("home",{
            urls:allUser
        });
    })

router.get("/",restrictTo(["NORMAL","ADMIN"]),async(req,res)=>{

const allUser=await Url.find({generatedBy:req.user._id})

    return res.render("home",{
        urls:allUser
    });
})

// GET route for rendering the signup page
router.get("/signup", (req, res) => {
    return res.render("Signup");
});
router.get("/login", (req, res) => {
    return res.render("Login");
});
module.exports=router;