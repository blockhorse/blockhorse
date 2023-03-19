const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/', (req, res) => {
  const response = req.body.transaction;
  console.log("response", response);


    console.log("response.success", response.success);
    console.log("response.data.key", response.data.key);
        console.log("response.data.type", response.data.type);
  
  if (response.success === true && response.data.key === 'active' && response.data.type === 'sendToken') {
    
    const transactionId = response.result.id;
    const lastBidder = response.data.username;
    const lastBidValue = response.data.amount;
    const memo = response.data.memo;
    const itemId = memo.split(":")[1];
     const exito =response.success

    const auction = controller.updateAuction(itemId, lastBidder, lastBidValue,transactionId,exito);

    return res.json({
      success: true,
      result: auction,
      message: 'La subasta se ha actualizado con éxito.'
    });
  } else {
    return res.status(400).json({
      success: false,
      message: 'La respuesta no es válida. Por favor, verifique los datos y vuelva a intentarlo.'
    });
  }
});



router.get('/', async(req, res) => {
  const response = req.query;
  console.log("response", response);
    res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 

    const auction = await controller.getAuctions();
    console.log("auction", auction);

    return res.json({
      success: true,
      result: auction,
      message: 'La subasta se ha actualizado con éxito.'
    });
  }  
);


module.exports = router;

