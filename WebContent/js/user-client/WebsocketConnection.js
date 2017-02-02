/**
 * Die Klasse verwaltet die Websocket-Verbindung
 */

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
	var addElem = new AddElements();
	
	this.createWebsocket = function(config){
		console.log("JavaScript");
		var uri ='ws://localhost:8080/configurator-server/configManager/' + config;
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
				console.log("Message 0001 : " + data.result);
				
				if(data.result[0].hasOwnProperty("error")){
					alert(data.result[0].error);
				}else{
					addElem.addAreas(data.result);
					for(area in data.result){
						addElem.addComponents(data.result[area]);
					}
				}
				
				break;
			case "0004": 
				console.log("| <--- | addComponents");
				console.log("Message 0004 : " + data.result);
				for(var i in data.result){
					if(data.result[i].hasOwnProperty('components')){
						if(data.result[i].components.length == 1){
							for(var key in data.result[i].components){
								var compId = [data.result[i].components[key].id];
								that.addComponent(compId);
							}
							return;
						}
					}
					if(data.result[i].configComplete == true){
						var tag = '<p id="config">';
						var currentConfig = "";
						var comp = "";
						var allComponents = "";
						for(var key in data.result[i].currentConfig){
							comp = comp + data.result[i].currentConfig[key].nameToShow + '<br/>';
							for(var component in data.result[i].currentConfig[key].components){
								allComponents = allComponents + "==== " + data.result[i].currentConfig[key].components[component].nameToShow + "<br/>";
							}
							comp = comp + allComponents;
							allComponents = "";
						}
						currentConfig = tag + comp + '</p>';
						
						var elem = $("<div id='dialog-confirm' title='Konfigurration komplett'>" + 
								  currentConfig + "</div>");
						
						$("section").append(elem);
						
						$( "#dialog-confirm" ).dialog({
					    	autoOpen:false,
					      resizable: true,
					      height:500,
					      width: 500,
					      modal: true,
					      buttons: {
					        "Konfiguration ändern": function() {
					          $( this ).dialog( "close" );
					          addElem.addAreas(data.result);
								for(area in data.result){
									addElem.addComponents(data.result[area]);
								}
					        },
					        "Bestellen": function() {
					          $( this ).dialog( "close" );
					          window.document.location.href = "http://localhost:8080/configurator-server/bestellung.html";
					        }
					      }
					    });
						
						$( "#dialog-confirm" ).dialog( "open" );
					}else{
						addElem.addAreas(data.result);
						for(area in data.result){
							addElem.addComponents(data.result[area], false);
						}
					}
				}
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
	}
	
	this.addComponent = function(component){
		var addComp = {
				"jsonrpc": "2.0", 
				"method": "getComponents",
				"params": {
					"components" : component
				}, 
				"id": "0004"
		}
		
		console.log("| ---> | addComponent");
		socket.send(JSON.stringify(addComp));
	}
	
	this.addCurrentCongiguration = function(component){
		var addComp = {
				"jsonrpc": "2.0", 
				"method": "getCurrentConfiguration",
				"params": {}, 
				"id": "0005"
		}
		
		console.log("| ---> | addComponent");
		socket.send(JSON.stringify(addComp));
	}
	
	this.setKonflictSolution = function(component){
		var addComp = {
				"jsonrpc": "2.0", 
				"method": "setKonflictSolution",
				"params": {"components":["motorisierung"]}, 
				"id": "0004"
		}
		console.log("| ---> | addComponent");
		socket.send(JSON.stringify(addComp));
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