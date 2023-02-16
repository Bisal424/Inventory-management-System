const   express                            = require('express');
const   router                             = express.Router();
const   {
        addCategory,
        getCategory,
        deleteCategory
        }                                  = require('../controller/categoryController');



router.post('/addcategory',addCategory);
router.get('/getcategory',getCategory);
router.delete('/deletecategory/:id',deleteCategory);



module.exports = router;
