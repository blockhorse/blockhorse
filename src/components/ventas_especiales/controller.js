const store = require('./store.js');




async function get_ventas_packs(body) {
    console.log("body usuario", body.usuario);
    console.log("BODY DEJUSTP", body);

    try {
        // Obtener el registro de la base de datos
        const ventas_pack = await store.get_ventas_packs(body);
        console.log("wallet", ventas_pack);

     if (!ventas_pack || ventas_pack.length === 0) {
    // Si no se encuentra el registro, crear uno con todos los campos numéricos en 0
    // const defaultWallet =[ {
    //         usuario: body.usuario,
    //         balance: 0,
    //         ganancia_apuestas: 0,
    //         balance_drops: 0,
    //         balance_cofre_e: 0,
    //         retiros: 0,
    //         retiros_drops: 0,
    //         entradas: 0,
    //         entradas_trx: 0,
    //         retirados_cofres_especiales: 0,
    //         // Otros campos con valores por defecto si es necesario
    //         // ...



    //     }];

    return null;
}
 else {
            // Si se encuentra el registro, devolverlo tal como está
            return ventas_pack;
        }
    } catch (error) {
        throw error; // Manejo de errores adecuado
    }
}


module.exports = {
 get_ventas_packs,
}






