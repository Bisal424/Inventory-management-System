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
            return res.status(200).send({Status:true,Message:"Admin Verified"});
        }else{
            return res.status(200).send({Status:false,Message:"Admin Not Verified"});
        }
    }
    catch (error) {
        return res.status(500).send("Internal Server Error");
    }
}
module.exports = adminLogin;