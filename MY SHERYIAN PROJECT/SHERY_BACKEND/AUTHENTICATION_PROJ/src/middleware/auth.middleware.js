const jwt = require('jsonwebtoken')
const userModel = require('../models/user.models')



async function authmiddleware (req, res, next ) {
    const token = req.cookies.token

    if(!token){
        return res.status(401).json(
            {
                msg:"unauthorized"
            }
        )
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await userModel.findOne({
              _id: decoded.id
        })
         req.user = user
         next()
    }
  
    catch(err){
        return res.status(401).json(
            {
                msg:"invalid token ,login again"
            }
        )
    }
}
module.exports = authmiddleware