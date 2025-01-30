const {getUser}=require("../service/auth.js") 

const checkForAuthenctication=(req,res,next)=>{
    const tokenCookie=req.cookies.token;
    req.user=null;

    if(!tokenCookie)
        return next();
    const token=tokenCookie
    const user=getUser(token);
    req.user=user;
   return next();
}

function restrictTo(roles=[]){
    return function (req,res,next){
        if(!req.user) return res.redirect("/login");
        if(!roles.includes(req.user.role)) return res.end("UnAuthorized");
        return next();
    }
}



// async function restrictToLoggedInUserOnly(req,res,next) {
  
//     // const userUid=req.cookies.uid;
//     const userUid=req.headers['authorization'];
    

//     if(!userUid){
//         return res.redirect("/login")
//     }
// const token=userUid.split("Bearer ")[1]
//     const user=getUser(token);
//     if(!user){
//         return res.redirect("/login");
//     }
//     req.user=user;
//     next();

// }

// async function checkAuth(req,res,next) {
//     // const userUid=req.cookies.uid;
//     const userUid=req.headers['authorization'];

//     // const user=getUser(userUid);
//     const token=userUid.split("Bearer ")[1]
//     const user=getUser(token);
//     req.user=user
//     next();
// }

module.exports={
    // restrictToLoggedInUserOnly,
    // checkAuth,
    restrictTo,
    checkForAuthenctication
}