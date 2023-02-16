const user                  = require('../models/user.model');
const bcrypt                = require('bcryptjs');
const jwt                   = require('jsonwebtoken');
const {randomBytes}         = require('crypto');
const sendMail              = require('../utils/nodemailer');

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;


//ROUTE:1 <-----------------------  Register a user (By Admin)  -------------------------->//
const registerUser = async (req, res) =>
{
try {
        const { name, email,role } = req.body;
        // Validation
                if (!name || !email ||!role ) {
                res.status(400);
                throw new Error("Please fill in all required fields");
        }
        let User = await user.findOne({ email: req.body.email });
        if (User) {
        return res.status(400).json({ error: "sorry one user is already exits with this user" });
        }
        const password = randomBytes(6).toString('hex');
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(password,salt);
                const dbResponse = await user.create
                ({
                    email    : req.body.email,
                    name     : req.body.name,
                    role     : req.body.role,
                    password : secPassword
                });
        sendMail(req.body.name, req.body.email , password ,'create');
        return res.status(200).send({Message : "mail sent sucessfully!"})
    }
        catch (error) {
        console.log(error.message);
        res.status(500).send("Internal sever error");
    }
}

//Route-2 <--------------------- update password (Staff) ------------------------------------>//

const updatePassword = async (req,res)=>{
    try {
        const data      = req.body;
        const email     = data.email;
        const password  = data.password;
        const newPass   = data.newPassword;

        const doc = await user.findOne({email:email});
        if(!doc)
            return res.status(401).send({ message :'record not found!', status:'success' })
        
        const result = await bcrypt.compare(password, doc.password);

        if(!result)
            return res.status(401).send({ message:'invalid credentials!', status:'fail' })
        
        const salt = await bcrypt.genSalt(10);
        const genpassword = await bcrypt.hash(newPass,salt);
        const dbResponse = await user.findByIdAndUpdate(doc._id,{password : genpassword,
        accountStatus: true});

        if(dbResponse)
        {
            return res.status(201).send({ message : 'record updated successfully!', status: 'success' });
        }
        else
        {
            return res.status(400).send({ message : 'something went wrong!', status: 'fail' })
        }
    } catch (error) {
        return res.status(500).send({ error: error.message, message : 'Something went wrong', status: 'fail' });
    }
}


//ROUTE-3 <--------------------------- login User(Staff) -------------------------------------->//

const loginUser = async (req, res) =>
{
    //if there are errors return bad request and the errors.
    const { email, password } = req.body;
    try {
        let User = await user.findOne({ email });
        if (!User) {
            return res.status(400).json({ error: "please try to login with correct credentials" });
        }
        const passwordcompare = bcrypt.compare(password, User.password);
        if (!passwordcompare) {
            return res.status(400).json({ error: "please try to login with correct credentials" });
        }
        const data = {
        user: 
        {
        id: User._id
        }
    }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Internal sever error");
    }
}


//ROUTE-4 <--------------------- Get user Detailes(Owner) ----------------------------------------->//

const getUser= async(req, res) =>
{
    try {
    //const userid= ;
    console.log(req.user.id);
    const User = await user.findById(req.user.id).select("-password");
    res.send(User);
    }
    catch (error) {
    console.log(error.message);
    res.status(500).send("Internal sever error");
    }
}

//Route-5 <---------------------------- forget Password (Staff) -------------------------------------->//
const forgetPassword = async(req,res)=>{
        try {
            const filter        = { email : req.body.email }
            const dbResponse    = await user.findOne(filter)
            //console.log("------->",dbResponse);
            if(!dbResponse){
                return res.status(400).json({Message:"Record Not found!",status:"success"});
            }
            const ranPassword = randomBytes(6).toString('hex');
            const salt     = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(ranPassword,salt);
            const newData  = {
                password:password,
                accountStatus:false
            }
            //console.log("------->",newData);
            const response  = await user.updateOne({ email: req.body.email }, newData);
            console.log("------->",response);
            if(response){
                sendMail( dbResponse.name, dbResponse.email, ranPassword, 'reset')
                return res.status(200).send({ message : 'An email has been sent to your email id!', status: 'success' });
            }
        } catch (error) {
            res.status(500).send("Internal sever error");
        }
}

//Route-6 <---------------------- Remove User(Admin) ------------------------------------------------->//

const removeUser = async(req,res)=>{
    try {
        const data = req.body.email;
        const response = await user.remove({email:data});
        if(response){
            return res.status(200).send({ message :'Staff record deleted!', status:'success' });
        }
        else{
            return res.status(400).send({ message :'Staff record not deleted!', status:'fail' })
        }
    } catch (error) {
            return res.status(500).send({ error: error.message, message : 'Something went wrong!', status: 'fail' });  
    }
}

module.exports = { 
    registerUser,
    updatePassword, 
    loginUser , 
    getUser,
    forgetPassword,
    removeUser
};