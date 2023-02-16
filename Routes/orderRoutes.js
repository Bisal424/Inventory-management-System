const   express                            = require('express');
const   router                             = express.Router();
const   {
        addsaleHistory,
        getsalesHistory,
        upadatesalesHistory,
        deleteSalesHistoryByDate
        }                                  = require('../controller/orderController');

const pdfService =require('../services/pdf-service');


router.post('/addhistory',addsaleHistory);
router.get('/gethistory',getsalesHistory);

router.put('/updatehistory/:id',upadatesalesHistory);
router.delete('/deletesaleshistory',deleteSalesHistoryByDate);

router.get('/invoice',(req,res)=>{
        const stream = res.writeHead(200,{
                'Content-Type':'application/pdf',
                'Content-Disposition':'attachment;filename=invoice.pdf'
        });
        pdfService.buildPDF(
                (chunk) => stream.write(chunk),
                () =>stream.end()
        );
});

module.exports = router;
