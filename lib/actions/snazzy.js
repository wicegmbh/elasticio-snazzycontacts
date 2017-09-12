var request = require('request');


exports.createSession = function(config, continueFnOnSuccess) {
    
    var token;

    console.log("USING API KEY "+config.apikey);

    request.post('http://telekom.wicecontacts.com/mp_base/json_login/login/get_token', { headers:{'X-API-KEY': config.apikey} }, function (error, response, body) {
	if (!error && response.statusCode == 200) {	    
	    // console.log(body);
	    var data = JSON.parse(body);
	    token = data['content']['token'];
	    console.log("TOKEN: "+token);
	    
	    request.post(
		'http://telekom.wicecontacts.com/mp_base/json_login/login/verify_credentials',
		{ json: { token:token, email:config.email, password:config.password }, headers:{'X-API-KEY': config.apikey} },
		function (error, response, body) {
		    if (!error && response.statusCode == 200) {	    
			// console.log(body)
			config['mp_cookie'] = body['content']['mp_cookie'];
			console.log("COOKIE: "+config['mp_cookie']);
			continueFnOnSuccess();
		    }
		});
	}
    });
    
}
