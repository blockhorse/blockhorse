const express = require('express');
const user = require('../components/user/network.js')
const payhive= require('../components/hivepay/network.js')


const routes = function (server){
	server.use('/user', user);
	server.use('https://wwww.sistemasoftware.com/payhive', payhive);
}

module.exports = routes;


