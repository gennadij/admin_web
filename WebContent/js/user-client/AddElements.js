function AddElements(){
	
	/**************************************************************************
	 * Singelton Klasse
	 *************************************************************************/
	/**
	 * Die Klasse fügt die Elementen in die Interface
	 */
	if(arguments.callee._singletonInstance){
		return arguments.callee._singletonInstance;
	}
	arguments.callee._singletonInstance = this;
	
	var that = this;
	var arrayAreas = new Array();
	var socket = new WebsocketConnection();
	
	this.addAreas = function(areas){
		
		for(var key in areas){
			if(areas[key].hasOwnProperty('option')){
				var optionen;
				for(op in areas[key].option.nameToShow){
					optionen = optionen + "\n" + areas[key].option.nameToShow[op];
				}
				alert("!!!Validation-Server meldet einen Konflikt in der Konfiguration!!! \n " +
						"Sie darfen nur folgende Motoren hinzugefügen \n" +
						optionen);
				socket.setKonflictSolution();
				return;
			}
			for(var area in areas[key].areasToDelete){
				if(areas[key].nickName != "currentConfig"){
					$("#" + areas[key].areasToDelete[area]).remove();
				}
			}
			for(var area in areas[key].areasToDeleteFromConfigFile){
				$("#" + areas[key].areasToDeleteFromConfigFile[area]).remove();
			}
			var areaToAdd = new Area(areas[key]);
			areaToAdd.domain = areas[key].domain;
			if(areaToAdd.area.nickName != undefined){
				areaToAdd.addArea();
			}
		}
	}
	
	this.addComponents = function(data) {
		var elementToAdd = data.nickName;
		var components = data.components;
		var tag = '<p id="config">';
		var currentConfig = "";
		var comp = "";
		var allComponents = "";
		for(var key in data.currentConfig){
			comp = comp + data.currentConfig[key].nameToShow + '<br/>';
			for(var component in data.currentConfig[key].components){
				allComponents = allComponents + "==== " + data.currentConfig[key].components[component].nameToShow + "<br/>";
			}
			comp = comp + allComponents;
			allComponents = "";
		}
		currentConfig = tag + comp + '</p>';
		if(document.getElementById("config")){
			$("#config").remove();
		}
		$("#currentConfig").append(currentConfig);
		//markiere die ausgewaelten Komponente
		$(".component").css("background-color", "#FFFFFF");
		for(var a in data.selectedComponents){
			for(var c in data.selectedComponents[a].components)
			$("#" + data.selectedComponents[a].components[c]).css("background-color", "#99FF99");
		}
		if(data.insertIn == "currentConfig"){
			
		}else{
			if(data.selectionCriterium != undefined){
				if(data.selectionCriterium.min == "1" && data.selectionCriterium.max == "1"){
					for(var key in components){
						comp = new Component(elementToAdd, components[key], false);
						comp.addComponent();
						$("#" + components[key].id).on("click", function(event) {
							var component = new Array();
							component.push(event.currentTarget.id);
							socket.addComponent(component);
						});
					}
				}else if(data.selectionCriterium.min == "0" && data.selectionCriterium.max == "0"){
					var button = $(
							'<br/><button id="sendButton">Bestellen</button>'
					);
					for(var key in components){
						comp = new Component(elementToAdd, components[key], false);
						comp.addComponent();
//						$("#" + components[key].id).on("click", function(event) {
//							var component = new Array();
//							component.push(event.currentTarget.id);
//							socket.addComponent(component);
//						});
					}
					$("#" + elementToAdd).append(button);
					$("#sendButton").on("click", function(event) {
						socket.addCurrentCongiguration();
					});
				}else{
					var selectedComponents = new Array();
					var button = $(
							'<br/><button id="sendButton">Senden</button>'
					);
					var countForCheckBox = 0;
					for(var key in components){
						//Erzeuge die Komponente und fuege in die Klasse hinzu
						comp = new Component(elementToAdd, components[key], true);
						comp.addComponent();
						
						//fuege die Listeners für jede Checkbox
						$("#" + components[key].id).on("click", function(event) {
							if($(this).is(':checked')){
								countForCheckBox++;
								console.log("1" + event.currentTarget.id);
								selectedComponents.push(event.currentTarget.id);
								console.log("push " + selectedComponents);
							}else{
								countForCheckBox--;
								for(var selected in selectedComponents){
									if(selectedComponents[selected] == event.currentTarget.id){
										var start = parseInt(selected);
										var end = parseInt(selected) + 1;
										selectedComponents.splice(start, 1)
									}
								}
								console.log("slice " + selectedComponents);
							}
							//Akteviere alle Checkbox
							for(var key in components){
								$("#" + components[key].id).prop("disabled", false);
							}
							if(countForCheckBox == data.selectionCriterium.max){
								//Gecheckte Checkboxes akteviert lassen, und ungecheckte deaktevieren.
								for(var key in components){
									if($("#" + components[key].id).is(':checked')){
										console.log("Checkbos is checked " + selectedComponents);
									}else{
										$("#" + components[key].id).prop("disabled", true);
									}
								}
							}
						});
					}
					$("#" + elementToAdd).append(button);
					$("#sendButton").on("click", function(event) {
						socket.addComponent(selectedComponents);
						
					});
				}
			}
		}
	}
}