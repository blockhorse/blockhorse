//const Model= require('../../../components/hivepay/models.js')
const store= require('../../../components/hivepay/store.js')

async function get_payhive_done(){
let hivepay={ checked: "pagado_en_hive_pay", entregado: false}

const res= await store.get(hivepay);
 return res;

}


async function get_pay_block_done(){
let pago_block={ checked: "true", entregado:false}
const res= await store.get(pago_block);
return res;

}


async function procesar_entrega_de_venta(param){
console.log("Funcion para entregar la venta",param)

let cantidad=null
let variable=param[0].item_name;
if (variable.endsWith("chest")) {
  console.log("La variable termina en 'chest'");
if(param[0].item_name=="Common chest"){ cantidad=1}
if(param[0].item_name=="Rare chest"){ cantidad=3}
if(param[0].item_name=="Epic chest"){ cantidad=5} 

await store.add_chest(param[0].buyer, cantidad);
//let aprovado = { txid: param[0].txid, entregado: true };
//await store._check_pay(aprovado);

} else {
  console.log("La variable no termina en 'chest'");
}








     


}






module.exports={
get_ph:	 get_payhive_done,
get_pb:  get_pay_block_done,
entregar_venta:	procesar_entrega_de_venta,
}




