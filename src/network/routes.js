const express = require('express');

const home= require('./../components/home/network.js')
const dashboard= require('./../components/dashboard/network.js')
const racemenu= require('./../components/racemenu/network.js')
const marketmenu= require('./../components/marketmenu/network.js')


const auctions= require('./../components/auctions/network.js')

const user = require('./../components/user/network')

const payhive= require('./../components/hivepay/network.js')
const subasta= require('./../components/subastas/network.js')
const race= require('./../components/race/network.js')
const timer= require('./../components/time/network.js')
const equino= require('./../components/equino/network.js')
const keychaintrx= require('./../components/keychaintrx/network.js')
const keychaintrx_chest= require('./../components/keychaintrx_chest/network.js')
const keychain_chest_magico_bhrt= require('./../components/keychain_chest_magico_bhrt/network.js')
const chest_claim= require('./../components/chest_claim/network.js')
const chest_claimagic= require('./../components/chest_claimagic/network.js')
const chest_claim_especial= require('./../components/chest_claim_especial/network.js')
const chest_claim_patro= require('./../components/chest_claim_patro_lvl_1/network.js')
const actuaciones= require('./../components/actuaciones/network.js')
const creardatosadiccionales= require('./../components/creardatosadiccionales/network.js')
const aplicar_nft= require('./../components/aplicar_nft/network.js')
const wallet= require('./../components/wallet/network.js')
const claim_drop= require('./../components/claim_drop/network.js')
const claim_balance= require('./../components/claim_balance/network.js')
const claim_ganancia= require('./../components/claim_ganancia/network.js')
const poblacion= require('./../components/poblacion-equina/networks.js')
const entrenar= require('./../components/entrenar/network.js')
const temporada= require('./../components/temporada/network.js')
const deposit_wallet= require('./../components/deposit_wallet/network.js')
const bets= require('./../components/bets/network.js')
const sistemas_activos= require('./../components/sistemas_activos/network.js')
const ventas_especiales= require('./../components/ventas_especiales/network.js')
const boletos= require('./../components/boletos/network.js')
const RegistrarEnTorneo= require('./../components/registrarEnTorneo/network.js')



const routes = function (server){
	//server.use('/', home);
    server.use('/dashboard', dashboard );
    server.use('/races', racemenu );
    server.use('/market', marketmenu );
     server.use('/auction', auctions );
	  server.use('/user', user);
	  server.use('/payhive', payhive);
	  server.use('/auctions',subasta);
     server.use('/race', race);
     server.use('/time', timer);
     server.use('/keychaintrx', keychaintrx);
     server.use('/keychaintrx_chest', keychaintrx_chest);
     server.use('/keychainchestbhrt', keychain_chest_magico_bhrt);
     server.use('/chest_claim', chest_claim);
     server.use('/chest_claimagic', chest_claimagic);
     server.use('/chest_claim_especial', chest_claim_especial);
     server.use('/chest_claim_patro', chest_claim_patro);
     server.use('/equino', equino);
     server.use('/actuaciones', actuaciones);
     server.use('/aplicar_nfts', aplicar_nft);
     server.use('/wallet',wallet);
     server.use('/claim_drop',claim_drop);
     server.use('/claim_balance',claim_balance);
     server.use('/claim_ganancia',claim_ganancia);

     server.use('/poblacion',poblacion);
     server.use('/entrenar',entrenar);
     server.use('/temporada',temporada);
     server.use('/bets',bets);
     server.use('/deposit_wallet',deposit_wallet);
     server.use('/sistemas_activos',sistemas_activos);
     server.use('/ventas_especiales',ventas_especiales);
     server.use('/boletos',boletos);
     server.use('/registro_torneo',RegistrarEnTorneo);


    
	
	
}

module.exports = routes;






// Auri 0412 6785951

// { trx_id: '28e2f672afc2336e4edd7098842d5a19a7b49ecb'}