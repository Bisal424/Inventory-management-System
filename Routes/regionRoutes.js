const express      = require('express');
const Router       = express.Router();

const   { 
        addRegion,
        getallRegion,
        getRegion,
        deleteRegion,
        updateRegion 
        }          = require('../controller/regionController');

const fetchuser    = require('../middleware/fetchusermiddleware');

Router.post('/addregion',fetchuser,addRegion);
Router.get('/getregions',fetchuser,getallRegion);
Router.get('/getregion/:id',fetchuser,getRegion);
Router.delete('/deleteregion/:id',fetchuser,deleteRegion);
Router.put('/updateregion/:id',fetchuser,updateRegion);




module.exports = Router;
