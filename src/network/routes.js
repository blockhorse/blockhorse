const express = require('express');

const user = require('./../components/user/network')

const payhive= require('./../components/hivepay/network.js')

const dashboard= require('./../components/dashboard/network.js')
const routes = function (server){
	server.use('/user', user);
	server.use('/payhive', payhive);
	server.use('/dashboard', dashboard);
}

module.exports = routes;


