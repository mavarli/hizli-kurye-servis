function notification(id,mesaj){
	
	var sendNotification = function(data) {
  var headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": "Basic MmIzNDRiM2EtMzkwZC00NGI0LTgzZjktMWMwZmEzNzQyNDAw"
  };
  var options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers
  };
  var https = require('https');
  var req = https.request(options, function(res) {  
    res.on('data', function(data) {
      console.log("Response:");
      console.log(JSON.parse(data));
    });
  });
  req.on('error', function(e) {
    console.log("ERROR:");
    console.log(e);
  });
  req.write(JSON.stringify(data));
  req.end();
};
var message = {
  "app_id": "10df7f28-87fa-4822-b32c-afaf9f072469",
  "contents" : { en: mesaj },
  "include_external_user_ids": id
};
sendNotification(message);
	
return true;

}

module.exports = notification;