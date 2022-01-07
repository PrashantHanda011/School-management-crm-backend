import jwt from 'jsonwebtoken'
import User from '../schema/userschema.js'

const authenticate=async(req,res,next)=>{
    try {
        
        const token = req.cookies.jwttoken
        console.log(token)
        const verifytoken = jwt.verify(token,process.env.SECRET_KEY)

        const rootuser = await User.findOne({_id:verifytoken._id,"tokens.token":token})
        if(!rootuser){throw new Error("user not found")}

        req.token = token;
        req.rootuser = rootuser
        req.userid = rootuser._id
        next();
        
    } catch (err) {
        console.log(err)
        return res.status(401).json(null)
    }

}
export default authenticate;