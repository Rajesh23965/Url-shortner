const  mongoose  = require("mongoose");

async function dbConnection(url) {
    return mongoose.connect(url);
    
}
module.exports={
    dbConnection,
}