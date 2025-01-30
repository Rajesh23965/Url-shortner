const express=require("express");
const router=express.Router();
const {handleLogInUser,handleSignupUser}=require("../Controllers/user.js");
  
router.post("/signup", handleSignupUser);


router.post("/login",handleLogInUser);

module.exports=router;