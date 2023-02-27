const   express                            = require('express');
const   router                             = express.Router();

const {storeData,categoryData}             = require('../controller/InventoryController');

const fetchuser                            = require('../middleware/fetchusermiddleware');

router.get('/storedata/:id',fetchuser,storeData);
router.get('/categorydata/:id',fetchuser,categoryData);


module.exports=router;



