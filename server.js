
var WebSocketClient = require('websocket').client;
const request = require('request')
var client = new WebSocketClient();
 
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});
 
client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    var count = 0;
    connection.on('message', function(message) {
    	console.log("***************************Notification Received*******************************************");
    	var datajson = JSON.parse(message.utf8Data);
    	console.log("data object ",datajson);
    	io.emit("server_socket",message.utf8Data);
        if (message.type === 'utf8' && count == 0) {
        	count++;
            //console.log("Received: '" + message.utf8Data + "'");
           // http://127.0.0.1/AppServer/api/v1/notification-subscribers/'+datajson.SubscriberId+'/subscribe


           //list of notifications to receive from server
           var jsonData = [{"EventType":"SignalLoss"},{"EventType":"StreamLoss"},{"EventType":"DigitalInput"},{"EventType":"RelayOutput"},{"EventType":"StorageFailure"},{"EventType":"StorageInitializing"},{"EventType":"FanFailure"},{"EventType":"PowerSupplyFailure"},{"EventType":"TemperatureCritical"},{"EventType":"LowPressure"},{"EventType":"Recording"},{"EventType":"RecordingStreamFailure"},{"EventType":"NoStorageSettings"},{"EventType":"NoRecordingSettings"},{"EventType":"Configuration"},{"EventType":"DeviceStatus","ExcludeInitializedState":"Ready"},{"EventType":"PTZLock"},{"EventType":"Upgrade"},{"EventType":"UpgradeUploadComplete"},{"EventType":"UpgradeFileVerify"},{"EventType":"UpgradeAvailable"},{"EventType":"UpgradeFailure"},{"EventType":"Instruction"},{"EventType":"BackupUploadComplete"},{"EventType":"Backup"},{"EventType":"BackupRestore"},{"EventType":"QuickSetup"},{"EventType":"LicenseFailure"},{"EventType":"AuthenticationMode"},{"EventType":"ExportMedia"},{"EventType":"EventSubsciptionFailure"},{"EventType":"NtpServiceFailure"},{"EventType":"SnmpServiceFailure"},{"EventType":"LowDiskSpace"},{"EventType":"GlobalSceneChanged"},{"EventType":"BulkOperation"},{"EventType":"RedundantActive"},{"EventType":"Bookmark"},{"EventType":"SqlServiceStatus"},{"EventType":"SqlServiceInstanceFailure"},{"EventType":"SqlServiceAuthentication"},{"EventType":"SqlServiceNetworkFailure"},{"EventType":"DashboardRamCpuUsageSampling"},{"EventType":"DuplicateLoginAlert"},{"EventType":"PLCInstruction"},{"EventType":"EmailSendFailure"},{"EventType":"EmailSendFailureClose"},{"EventType":"DirectionalMotion"},{"EventType":"IllegalParking"},{"EventType":"DoubleLineCrossing"},{"EventType":"TemperatureWarning"},{"EventType":"TemperatureAlarm"},{"EventType":"SectionAlarm"},{"EventType":"TemperatureDifferenceWarning"},{"EventType":"TemperatureDifferenceAlarm"},{"EventType":"FallDetection"},{"EventType":"DuressDetection"},{"EventType":"FaceDetection"},{"EventType":"VehicleDetection"},{"EventType":"Logout"}]
           var options = {
           	url: 'http://127.0.0.1/AppServer/api/v1/notification-subscribers/'+datajson.SubscriberId+'/subscribe',
           	headers: {
				"Pragma": "no-cache",
				"Accept": "application/json, text/plain, */*",
				"VII-Authorization": "Bearer eyJWZXJzaW9uIjoiMS4wIiwiVXNlciI6IkFETUlOIiwiQXV0aG9yaXphdGlvblJvbGVzIjpbIjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMSJdLCJFeHBpcmF0aW9uIjoiMDA6MjA6MDAiLCJDcmVhdGlvblRpbWUiOiIyMDIwLTAyLTE0VDExOjE1OjI2Ljk0OTQ3MDdaIiwiUHJvcGVydGllcyI6eyJzZXNzaW9uLklkIjoiNjM3MTcyOTU1MjA0NjY0Njg4In0sIlVzZXJHcm91cHMiOltdLCJFeHBpcmF0aW9uVGltZSI6IjIwMjAtMDItMTRUMTE6MzU6MjYuOTQ5NDcwN1oiLCJIYXNFeHBpcmVkIjpmYWxzZX0=:SJju7Aqksd2fVTYkd+h8M3S0yx4XBCf2nHiMIKyMXNILvkopoIPB238YC5E9RGECmHQViYkuPyFgNE09eG6xkgkyw+87KZh224QGzPx7uTjC+tqyyIbOurGrzlEaWN+uTn/Xeh4oUb47QQRQwuuFE+O3nZRGZvAuv1mg74S14wc="
			  },
			  json: true, 
    		  body: jsonData

           }
            request.post(options, (error, res, body) => {
			  if (error) {
			    console.error(error)
			    return
			  }
			  console.log(`statusCode: ${res.statusCode}`)
			  console.log(body)
			  console.log("*****");
			 // console.log(res);
			})
        }
    });

  
});

client.connect('ws://127.0.0.1/AppServer/api/v1/notifications/connect');