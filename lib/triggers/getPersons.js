var Q = require('q');
var elasticio = require('elasticio-node');
var messages = elasticio.messages;
var http = require('http');
var request = require('request');

var snazzy = require('../actions/snazzy.js');


exports.process = processTrigger;



function processTrigger(msg, cfg) {

    var contacts = [];
    var self = this;

    snazzy.createSession(cfg, function() {
	//createSession(function() {
	request.post(
	    'http://snazzycontacts.com/mp_contact/json_respond/address_contactperson/json_mainview?address_contactperson_search='+cfg.search+'&mp_cookie='+cfg.mp_cookie,
	    { json: { max_hits:100, print_address_data_only:1 }, headers:{'X-API-KEY': cfg.apikey} },
	    function (error, response, body) {
		if (!error && response.statusCode == 200) {
		    //console.log(body);
		    contacts = body.content;
		    emitData();
		}
	    }
	);
    });


    function emitData() {

        var data = messages.newMessageWithBody({"persons":contacts});
        // console.log('Emitting data '+data);

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
