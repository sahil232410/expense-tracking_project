const bcryptjs = require('bcryptjs');
const userModel = require('../model/userModell');
const expenseModel = require('../model/expenseModel');
const register = async (req,resp)=>{
    try {
        const{uname,email,password}=req.body
    const hashpassword = await bcryptjs.hash(password,10)
    await userModel.create({uname,email,password:hashpassword})
    resp.redirect("/login")
        
    } catch (error) {
        console.log(error);   
    }
}
const login =async(req,resp)=>{
    try {
        const {uname,password}=req.body
        const user =await userModel.findOne({uname})
        if (user &&  (await bcryptjs.compare (password,user.password))){
            req.session.uname=uname
            resp.redirect("/dashboard")
        } else {
            resp.render("/login")
        }
    } catch (error) {
        console.log(error);
        
    }
}

const dashboard =async (req,resp)=>{
    if (!req.session.uname) {
        resp.redirect("/login")
    } else {
        const data = await expenseModel.find();
        resp.render("dashboard",{uname :req.session.uname,data})
        
    }
}

const logout =(req,resp)=>{
    req.session.destroy(()=>{
        resp.redirect("/login")
    })
}
module.exports={register,login,dashboard,logout}