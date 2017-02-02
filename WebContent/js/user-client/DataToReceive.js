
function DataToReceive(){
	/**************************************************************************
	 * Singelton Klasse
	 *************************************************************************/
	
	if(arguments.callee._singletonInstance){
		return arguments.callee._singletonInstance;
	}
	arguments.callee._singletonInstance = this;
	
	var areas = null;
	

	this.getAreas = function(){
		waitForResult();
	}
	
	
	this.setAreas = function(areasToSet){
		areas = areasToSet;
	}
	
//	function waitForResult(result, callback){
//		setTimeout(
//			function(){
//				if(result != null){
//					if(callback !== undefined){
//						callback();
//					}
//				return;
//				}else{
//					waitForResult(result, callback);
//				}
//		}, 5);
//	}
	
//	function waitForResult(){
//		if(typeof result !== "undefined" && result != null){
//			console.log("Vareable exist " + result);
//		}
//		else{
//			setTimeout(function() {
//				waitForResult();
//			}, 250);
//		}
//	}
}