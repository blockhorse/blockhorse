const express = require('express');

const user = require('./../components/user/network')

const payhive= require('./../components/hivepay/network.js')


const routes = function (server){
	server.use('/user', user);
	server.use('/payhive', payhive);
}

module.exports = routes;


