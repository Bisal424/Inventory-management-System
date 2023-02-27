const   express             = require('express');
const   Router              = express.Router();
const   fetchuser           = require('../middleware/fetchusermiddleware');

const   {
        addStore,
        fetchStore,
        deleteStore,
        getallStores,
        updateStore
        }                   = require('../controller/storeController');

Router.post('/addstore/:id',fetchuser,addStore);
Router.get('/fetchStore/:id',fetchuser,fetchStore);
Router.delete('/deleteStore/:id',fetchuser,deleteStore);
Router.get('/fetchallstores',fetchuser,getallStores);
Router.put('/updatestore/:id',fetchuser,updateStore);

module.exports = Router;