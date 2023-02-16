const category = require('../models/category.model');


//Route-1  <--------------------  (Add category)  ------------------------------------->//
const addCategory = async(req,res)=>{
    try {
        const { category_name } = req.body;
        if(!category_name){
            res.status(400).send("Please add a category");
        }
        const Category = await category.create({
            category_name
        })
        if(Category){
            res.status(200).json({Message:"category created Sucessfully",Status:true,payload:Category});
        }else{
            res.status(400).send("Error in category creation");
        }
    } catch (error) {
        return res.status(500).send("Internal server Error");
    }
}

//Route-2  <------------------ (Get all category) ------------------------------------->//
const getCategory = async(req,res)=>{
    try {
        const data = await category.find();
        if(!data){
            return res.status(400).send("Error in fetching Category Data");
        }else{
            return res.status(200).json({payload:data});
        }
    } catch (error) {
        return res.status(500).send("Internal server Error");  
    }
}

//Route-3 <----------------- (Delete Category) ---------------------------------------->//
const deleteCategory = async(req,res)=>{
    try {
        const data = await category.findByIdAndDelete(req.params.id);
        if(data){
            return res.status(200).json({Message:"Category Deleted Sucessfully",payload:data});
        }else{
            return res.status(400).send("Error in deletion of category");
        }
    } catch (error) {
        return res.status(500).send("Internal server Error");
    }
}

module.exports = {addCategory,getCategory,deleteCategory};
