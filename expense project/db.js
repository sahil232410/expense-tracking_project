
const mongoose = require('mongoose');

const connectdb=()=>{
    mongoose.connect("mongodb://localhost:27017/h2_Expensetracking").then(() => {
        console.log("connected");
    }).catch((err) => {
        console.log(err);
        
    });
}
module.exports={connectdb}