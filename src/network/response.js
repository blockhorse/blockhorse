exports.success = function (req, res, msg,sts,hdr){
	res.status( sts || 200 ).send({
		error :'',
		body: msg
	})
}

exports.error = function (req, res, msg,sts,hdr){
 msg= msg + es;
	res.status(status || 500 ).send({
		error :msg,
		body:'',


	})
}