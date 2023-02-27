const   express              = require('express');
const   router               = express.Router();
const   {
        createProduct,
        getallProduct,
        getProduct,
        deleteProduct,
        updateProduct
        }                    = require('../controller/productController');
const   parser               = require('../utils/cloudinary');
const   fetchuser            = require('../middleware/fetchusermiddleware');

router.post('/createproduct',parser.single("image"),fetchuser,createProduct);
router.get('/getproducts',fetchuser,getallProduct);

router.get('/:id',fetchuser,getProduct);
router.delete('/deleteproduct/:id',fetchuser,deleteProduct);

router.put('/updateproduct/:id',fetchuser,updateProduct);

module.exports = router;
