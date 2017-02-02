/**
 * Startklasse
 */

document.addEventListener('DOMContentLoaded', main, false);

function main(){
	
	var location = window.location.search;
	var config = location.substr(1, location.length);
	console.log(config);
	
	var websocket = new WebsocketConnection();
	websocket.createWebsocket(config);
	websocket.startConfiguration();
}