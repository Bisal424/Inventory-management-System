const   express             = require('express');
const   router              = express.Router();
const   {
        registerUser, 
        loginUser, 
        getUser,
        updatePassword,
        forgetPassword,
        removeUser
        }                   = require('../controller/userController');

const   fetchUser           = require('../middleware/fetchusermiddleware');
const   checkScopeLine      = require('../middleware/perms');
const   adminLogin          = require('../controller/adminlogin');

//These 3 Routes For Admin-panel(Owner)

router.post('/adminlogin',adminLogin);

router.post('/register',  checkScopeLine,registerUser);
router.delete('/removeuser', checkScopeLine,removeUser);
router.get('/getuser',fetchUser, checkScopeLine,getUser);

//These 3 Routes For user-panel(Staff)
router.post('/login',loginUser);
router.put('/updatepassword',updatePassword);
router.post('/forgetpassword',forgetPassword);










module.exports = router;