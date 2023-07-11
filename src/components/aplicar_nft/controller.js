const { saveAplicarnft, set_equino_status_implementos } = require('./store');

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
let aplicarnftStatus = {};

if (Nft_type == "tack") {
  aplicarnftStatus = {
    equineId: Caballo_mint,
    implementos_status: 'pending'
  };
} else if (Nft_type == "food") {
  aplicarnftStatus = {
    equineId: Caballo_mint,
    alimentos_status: 'pending'
  };
}

// Guardar el documento en la base de datos
const estado = await set_equino_status_implementos(aplicarnftStatus);
console.log("estado", estado);






    const result = await saveAplicarnft(aplicarnftData);

    return result;
  } else {
    throw new Error("Memo no válido");
  }
}

module.exports = { GuardarEnBase };
