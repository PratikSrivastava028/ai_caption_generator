const jwt = require("jsonwebtoken")
const userModel = require("../models/user.models")

async function registerController(req,res) {

const {username,password} = req.body;
const userAlreadyExist = await userModel.findOne({username})
if(userAlreadyExist){
    return res.status(400).json({
        msg:"user already exists"
    })
}
const user = await userModel.create({
    username,
    password
})

const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

res.cookie("token",token)


res.status(201).json({
    msg:"user created successfully",
    user,
})
}

async function loginController(req,res){
    const {username,password} = req.body

    const user = await userModel.findOne({
        username:username
    })
    if(!user){
        return res.status(404).json({
            msg:"user not found"
        })
    }
    if(user.password == password){
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.cookie("token",token)

        return res.status(200).json({
            msg:"user logged in successfully",
            user
        })
    }
    return res.status(400).json({
        msg:"invalid credentials"
    })

}


module.exports = {registerController,loginController}