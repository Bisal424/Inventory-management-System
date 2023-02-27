const   express                            = require('express');
const   router                             = express.Router();
const   {
        addCategory,
        getCategory,
        deleteCategory
        }                                  = require('../controller/categoryController');

const fetchuser                            = require('../middleware/fetchusermiddleware');

router.post('/addcategory/:id',fetchuser,addCategory);
router.get('/getcategory/:id',fetchuser,getCategory);
router.delete('/deletecategory/:id',fetchuser,deleteCategory);



module.exports = router;
