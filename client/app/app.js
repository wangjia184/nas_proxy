const http = require('http')  
const request = require('request');


const SERVER_URL = process.env.SERVER_URL || 'http://47.90.124.40:5000';




function sendRequest(){
    request({
        url: SERVER_URL,
        method: "POST",
        headers: {
            "from": "jerry@nas.com",
        }
    }, function (error, response, body){
        if(error){
            console.log(SERVER_URL, error);
        } else {
            console.log(SERVER_URL, body);
        }

        setTimeout( sendRequest, 30000);
    });
}
sendRequest();