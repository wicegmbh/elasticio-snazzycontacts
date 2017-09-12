var Q = require('q');
var elasticio = require('elasticio-node');
var messages = elasticio.messages;
var request = require('request');
var snazzy = require('./snazzy.js');


exports.process = processAction;



/**
 *  This method will be called from elastic.io platform providing following data
 * 
 * @param msg
 * @param cfg
 */
function processAction(msg, cfg) {

    var reply = {};
    var self = this;

    snazzy.createSession(cfg, function() {
	if(cfg.mp_cookie) {
	    request.post(
		'http://telekom.wicecontacts.com/mp_contact/json_respond/address_company/json_insert?mp_cookie='+cfg.mp_cookie,
		{ json: msg.body, headers:{'X-API-KEY': cfg.apikey} },
		function (error, response, body) {
		    if (!error && response.statusCode == 200) {
			console.log("REPLY "+body);
			reply = body;
			emitData();
		    }
		}
	    );
	} else {
	    console.log("Error: Invalid session.");
	}
    });
    
    function emitData() {

        var data = messages.newMessageWithBody(reply);

        self.emit('data', data);
    }

    function emitError(e) {
        console.log('Oops! Error occurred');

        self.emit('error', e);
    }

    function emitEnd() {
        console.log('Finished execution');

        self.emit('end');
    }

    // Q().then(emitData).fail(emitError).done(emitEnd);

}
