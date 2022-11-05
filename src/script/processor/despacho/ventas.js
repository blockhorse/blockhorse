//const Model= require('../../../components/hivepay/models.js')
const store= require('../../../components/hivepay/store.js')

async function get_payhive_done(){
let hivepay={ checked: "pagado_en_hive_pay"}

const res= await store.get(hivepay);
 return res;

}


async function get_pay_block_done(){
let pago_block={ checked: "true"}
const res= await store.get(pago_block);
return res;

}


async function procesar_entrega_de_venta(param){

}






module.exports={
get_ph:	 get_payhive_done,
get_pb:  get_pay_block_done,
entregar_venta:	procesar_entrega_de_venta,
}




