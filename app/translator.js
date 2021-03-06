'use strict';

let fs = require('fs');
let https = require('https');

var rp = require('request-promise-native');
var xmlParse = require('xml2js').parseString;

module.exports = translate;

function translate(to, from, text) {

    // **********************************************
    // *** Update or verify the following values. ***
    // **********************************************

    // Replace the subscriptionKey string value with your valid subscription key.
    let subscriptionKey = '82fa97fc511440f7910bfd8698909204';

    let host = 'https://api.cognitive.microsofttranslator.com';
    let path = '/translate?api-version=3.0';

    // Translate to German and Italian.
    let params = '&to='+to;

    let response_handler = function (response) {
        let body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            let json = JSON.stringify(JSON.parse(body), null, 4);
            console.log(json);
        });
        response.on('error', function (e) {
            console.log('Error: ' + e.message);
        });
    };

    let get_guid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    let Translate = function (content) {
        let request_params = {
            method: 'POST',
            //hostname: host,
            uri: host+path + params,
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': subscriptionKey,
                'X-ClientTraceId': get_guid(),
            },
			body: content
        };

		return rp(request_params)
        .then(function(xml){                
            return new Promise(function (resolve, reject) {   
				resolve(xml);
            });
        })
        .catch(function (err){
            return err;
        });

        let req = https.request(request_params, response_handler);
        req.write(content);
        req.end();
        return req;
    }

    let content = JSON.stringify([{ 'Text': text }]);

    return Translate(content);


};





