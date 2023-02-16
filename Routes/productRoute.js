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
const   checkScopeLine       = require('../middleware/perms'); //For user permission.

router.post('/createproduct',parser.single("image"), createProduct);
router.get('/getproducts',getallProduct);

router.get('/:id',getProduct);
router.delete('/deleteproduct/:id',deleteProduct);

router.put('/updateproduct/:id',updateProduct);

module.exports = router;
