const mongoose   = require('mongoose');
const { Schema } = mongoose;
const validator  = require('validator');

const userSchema = new Schema({
    name : {
        type : String,
        require : [true,"Please enter  a name"],
        minLength:[4,"Please enter a name minimum 4 character"],
        maxLength:[25,"Please enter a name maximum 25 character"],
    },
    email : {
        type : String,
        require : [true,"Please enter a E-mail"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid E-mail"]
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        enum:['Admin', 'STORE_MANAGER', 'REGIONAL MANAGER', 'STAFF'],
        required : true 
    },
    accountStatus:{
        type :Boolean,
        default :false
    },
    
    // tokens:
    // { 
    //     type : Array
    // }
    // assignedTo:{
    //     type:'store',
    //     storeId:"",
    //     regionId:''
    // }
},
{
    timestamps: true
});

module.exports = mongoose.model('User',userSchema);