const store = require('./store.js');




async function get_wallets(body) {
    console.log("body usuario", body.usuario);
    console.log("BODY DEJUSTP", body);

    try {
        // Obtener el registro de la base de datos
        const wallet = await store.get_wallet(body);
        console.log("wallet", wallet);

     if (!wallet || wallet.length === 0) {
    // Si no se encuentra el registro, crear uno con todos los campos numéricos en 0
    const defaultWallet =[ {
            usuario: body.usuario,
            balance: 0,
            ganancia_apuestas: 0,
            balance_drops: 0,
            balance_cofre_e: 0,
            retiros: 0,
            retiros_drops: 0,
            entradas: 0,
            entradas_trx: 0,
            retirados_cofres_especiales: 0,
            // Otros campos con valores por defecto si es necesario
            // ...
        }];

    return defaultWallet;
}
 else {
            // Si se encuentra el registro, devolverlo tal como está
            return wallet;
        }
    } catch (error) {
        throw error; // Manejo de errores adecuado
    }
}


module.exports = {
 get_wallets,
}






