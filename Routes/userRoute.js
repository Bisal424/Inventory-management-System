const   express             = require('express');
const   router              = express.Router();
const   {
        registerUser, 
        loginUser, 
        getUser,
        updatePassword,
        forgetPassword,
        removeUser,
        refreshToken
        }                   = require('../controller/userController');

const   fetchUser           = require('../middleware/fetchusermiddleware');
const   adminLogin          = require('../controller/adminlogin');

//These 3 Routes For Admin-panel(Owner)

router.post('/adminlogin',adminLogin);

router.post('/refresh',refreshToken);

router.post('/register', registerUser);
router.delete('/removeuser', removeUser);
router.get('/getuser',fetchUser,getUser);

//These 3 Routes For user-panel(Staff)
router.post('/login',loginUser);
router.put('/updatepassword',updatePassword);
router.post('/forgetpassword',fetchUser,forgetPassword);

module.exports = router;