const express = require('express');

const home= require('./../components/home/network.js')
const dashboard= require('./../components/dashboard/network.js')
const auctions= require('./../components/auctions/network.js')

const user = require('./../components/user/network')

const payhive= require('./../components/hivepay/network.js')
const subasta= require('./../components/subastas/network.js')
const race= require('./../components/race/network.js')
const timer= require('./../components/time/network.js')
const equino= require('./../components/equino/network.js')
const keychaintrx= require('./../components/keychaintrx/network.js')
const keychaintrx_chest= require('./../components/keychaintrx_chest/network.js')
const chest_claim= require('./../components/chest_claim/network.js')

const routes = function (server){
	//server.use('/', home);
    server.use('/dashboard', dashboard );
     server.use('/auction', auctions );
	server.use('/user', user);
	 server.use('/payhive', payhive);
	 server.use('/auctions',subasta);
     server.use('/race', race);
       server.use('/time', timer);
      server.use('/keychaintrx', keychaintrx);
      server.use('/keychaintrx_chest', keychaintrx_chest);
      server.use('/chest_claim', chest_claim);
     server.use('/equino', equino);
    
	
	

	
}

module.exports = routes;


