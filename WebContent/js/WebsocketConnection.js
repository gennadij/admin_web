//document.addEventListener('DOMContentLoaded', connect, false);

function WebsocketConnection(){
	/**************************************************************************
	 * Singelton Klasse
	 *************************************************************************/
	
	if(arguments.callee._singletonInstance){
		return arguments.callee._singletonInstance;
	}
	arguments.callee._singletonInstance = this;
	
	var that = this;
	var socket;
	var dataToReceive = new DataToReceive();
	var addElem = new AddElements();
	
	this.createWebsocket = function(){
		console.log("JavaScript");
		var uri ='ws://localhost:8080/configurator-server/client';
		socket = new WebSocket(uri);
		socket.onmessage = onMessage;
		socket.onopen = open;
		socket.onclose = close;
	}
	
	function onMessage(message) {
		var data = JSON.parse(message.data);
		var errorStatus = false;
		var resultStatus= false;
		var idStatus = false;
		console.log("Receive: " + message.data);
		if(data.hasOwnProperty("error")){
			errorStatus = true;
		}
		if(data.hasOwnProperty("result")){
			resultStatus = true;
		}
		if(data.hasOwnProperty("id")){
			idStatus = true;
		}
		if(errorStatus == false && resultStatus == true && idStatus == true){
			switch (data.id) {
			case "0001":
				console.log("| <--- | startConfiguration");
				dataToReceive.setAreas(data.result);
				addElem.addAreas(data.result);
				that.getClassOfComponents(data.result[0].nickName);
				break;
			case "0002":
				console.log("| <--- | getClassOfComponents");
				console.log(data.result);
				addElem.addClassesOfComponents(data.result);
				break;

			default:
				break;
			}
		}
		
		
	}

	this.startConfiguration = function(){
		var startConf = {
			"jsonrpc": "2.0", 
			"method": "startConfiguration",
			"params": [], 
			"id": "0001"
		}
		console.log("| ---> | startConfiguration");
		waitForSocketConnection(socket, function() {
			socket.send(JSON.stringify(startConf));
		});
//		$.blockUI({ css: { 
//            border: 'none', 
//            padding: '15px', 
//            backgroundColor: '#000', 
//            '-webkit-border-radius': '10px', 
//            '-moz-border-radius': '10px', 
//            opacity: .5, 
//            color: '#fff' 
//        } });
//		
//		setTimeout($.unblockUI, 2000);
		
	}
	
	this.getClassOfComponents = function(area){
		var getClassOfComp = {
			"jsonrpc": "2.0", 
			"method": "getClassOfComponents",
			"params": {
				"area" : area
			}, 
			"id": "0002"
		}
		console.log("| ---> | getClassOfComponents");
		socket.send(JSON.stringify(getClassOfComp));
	}
	function open() {
		console.log("Websocket is open");
	}

	function close() {
		console.log("close");
		socket.close();
	}
	
	function waitForSocketConnection(socket, callback){
        setTimeout(
            function(){
                if (socket.readyState === 1) {
                    if(callback !== undefined){
                        callback();
                    }
                    return;
                } else {
                    waitForSocketConnection(socket,callback);
                }
            }, 5);
    };
	
}




//request.method = "greateProduct";
//request.params = [];
//request.params[0] = "citybike";
//request.id = 1;
//request.jsonrpc = "2.0";

//function connect() {
//	socket = new WebSocket("ws://localhost:8080/configurator-server/client");
//	   socket.onmessage = onMessage;
//	   socket.onopen = open;
//	console.log("JavaScript");
//	
//	$("#hallo").click(function() {
////		socket.send(JSON.stringify(request));
//	});
//	socket.send(JSON.stringify(request));
//
////   socket.send("hallo");