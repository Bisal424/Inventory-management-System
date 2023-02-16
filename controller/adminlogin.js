require('dotenv').config();
//const JWT_SECRET = process.env.JWT_SECRET;
const adminLogin = async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password ){
            res.status(400);
            throw new Error("Please fill in all required fields");
        }
        if(process.env.EMAIL == email && process.env.PASSWORD == password){
                res.status(200).json({message : "Success",payload:authtoken});
            }
    }
    catch (error) {
        return res.status(500).send("Internal Server Error");
    }
}
module.exports = adminLogin;