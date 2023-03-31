const {
    get_pays,
    check_pay,
} = require ('./compras/hive_pays.js');


const despacho = require ('./despacho/ventas.js');


setInterval(displayHello, 100000);

async function displayHello() {
 console.log("PRESALE PROCESO")
 
 const pays_to_proccess= await get_pays()
 if(pays_to_proccess.length>=1){
  //console.log("pays_to_proccess in index", pays_to_proccess);
 await check_pay(pays_to_proccess)
 }


 const venta_a_procesar= await despacho.get_ph()
 if(venta_a_procesar.length>=1){
    console.log("Ventas H-pay por entregar", venta_a_procesar.length);

   // console.log("Venta hivepay a procesar", venta_a_procesar);
}

const venta_block_a_procesar = await despacho.get_pb()
 if(venta_block_a_procesar.length >= 1){
    console.log("Ventas  BChain por entregar", venta_a_procesar.length);

    console.log("venta_block_a_procesar", venta_block_a_procesar);
}












}


