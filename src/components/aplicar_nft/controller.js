const { saveAplicarnft, set_equino_status_implementos, GetAplicadosnft } = require('./store');

async function GuardarEnBase(data) {
  // Extraer los datos necesarios de la transacción
  const {
    data: { json },
    
    result: { tx_id }
  } = data;
  console.log("data", data);



  const account=data.data.username;
  console.log("account", account);

  const jsonData = JSON.parse(json);

  const memo = jsonData[0].contractPayload.memo;


//  console.log("JSON.parse(json)", JSON.parse(json));
  console.log("memo", typeof(memo));

if (memo) {

  const memoParts = memo.split(':');

 // Extraer el mint
  const mintPart = memoParts[memoParts.length - 4].trim();
  console.log("mintPart", mintPart);
  const Caballo_mint = Number(mintPart);

  // Extraer el Nft_name
   const Nft_type = memoParts[memoParts.length - 2].trim();
  const Nft_name = memoParts[memoParts.length - 3].trim();

  const Nft_utility = memoParts[memoParts.length - 1].trim();

  console.log("Caballo_mint:", Caballo_mint);
  console.log("Nft_name:", Nft_name);
  console.log("Nft_utility", Nft_utility);
   console.log("Nft_utility", Nft_type);



    // Crear un nuevo objeto AplicarnftData
    const aplicarnftData = {
      
      trx_id: tx_id,
      account: account,
      Nft_id: Nft_utility,
      Nft_type:Nft_type,
      Nft_name,
      Caballo_mint,
      Dia: new Date(),
      Aplicado: false,
      Devuelto: false,
      Razon_Devolucion: '',
      Status_wallet: 'check'
    };


console.log("aplicarnftData", aplicarnftData);

let aplicarnftStatus = {};



if (Nft_type == "tack" || Nft_type=="recover") {
  aplicarnftStatus = {
    implementos_status: 'pending',
  };

console.log("aplicarnftStatus", aplicarnftStatus);
} else if (Nft_type == "food") {
  console.log("yes")
  aplicarnftStatus = {
     alimentos_status: 'pending',
     alimentos_trx_id: { Nft_id: Nft_utility, trx_id:tx_id  },

  };
  console.log("aplicarnftStatus", aplicarnftStatus);
}

// Guardar el documento en la base de datos
console.log("Antes  Caballo_mint,aplicarnftStatus", Caballo_mint,aplicarnftStatus);
const estado = await set_equino_status_implementos(Caballo_mint,aplicarnftStatus);

console.log("estado", estado);






    const result = await saveAplicarnft(aplicarnftData);

    return result;
  } else {
    throw new Error("Memo no válido");
  }
}







async function ObtenerNftAplicados(query){
  console.log("query", query);


return new Promise((resolve,reject) =>{
resolve(GetAplicadosnft(query))

 })



}





module.exports = { GuardarEnBase,ObtenerNftAplicados };
