const express = require('express');

const home= require('./../components/home/network.js')
const dashboard= require('./../components/dashboard/network.js')


const user = require('./../components/user/network')

const payhive= require('./../components/hivepay/network.js')
const race= require('./../components/race/network.js')
const keychaintrx= require('./../components/keychaintrx/network.js')

const routes = function (server){
	//server.use('/', home);
    server.use('/dashboard', dashboard );
	server.use('/user', user);
	server.use('/payhive', payhive);
     server.use('/race', race);
     server.use('/keychaintrx', keychaintrx);
	
	

	
}

module.exports = routes;


