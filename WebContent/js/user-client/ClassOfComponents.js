
function ClassOfComponents(area, classOfComp, min, max){
	console.log("execute ClassOfComponents(" + area.name + ") ");
	this.area = area;
	this.name = classOfComp;
	this.option = null;
	//this.min = min;
	//this.max = max;
	var countForCheckBox = 0;
	
	this.addClass = function() {
		var classOfComp = $(
				'<div id="' + this.name.nickName + '" class="class">' +
				'<p>====' + this.name.nameToShow + '</p>' +
				'<p>====' + this.name.description + '</p>' +
				'</div>'
			);
		
		$("#" + this.area).append(classOfComp);
	}
	
	this.addComponents = function(components, statusToShow) {
		for(var key in components){
			//Erzeuge die Komponente und fuege in die Klasse hinzu
			comp = new Component(this.name.nickName, components[key], statusToShow);
			comp.addComponent();
			//fuege die Listeners für jede Checkbox
			$("#" + components[key]).on("click", function(event) {
				console.log("checkbox selected");
				if(statusToShow){
					if($(this).is(':checked')){
						countForCheckBox++;
					}else{
						countForCheckBox--;
					}
					//Akteviere alle Checkbox
					for(var key in components){
						$("#" + components[key]).prop("disabled", false);
					}
					if(countForCheckBox == max){
						//Gecheckte Checkboxes akteviert lassen, und ungecheckte deaktevieren.
						for(var key in components){
							if($("#" + components[key]).is(':checked')){
								console.log("Checkbos is checked ");
							}else{
								$("#" + components[key]).prop("disabled", true);
							}
						}
					}
				}else{
					console.log("Sende die Daten");
				}
				
			});
		}
	}
	
	this.addsendButton = function() {
		var button = $(
				'<button id="sendButton">Senden</button>'
		);
		$("#" + this.area).append(button);
		
		$("#sendButton").on("click", function(event) {
			
			if(countForCheckBox < min){
				alert("Bitte wählen SIe bitte die Komponete");
			}else{
				alert("ich sende die Daten");
				$.blockUI({ css: { 
		            border: 'none', 
		            padding: '15px', 
		            backgroundColor: '#000', 
		            '-webkit-border-radius': '10px', 
		            '-moz-border-radius': '10px', 
		            opacity: .5, 
		            color: '#fff' 
		        } });
				
				setTimeout($.unblockUI, 2000);
			}
		});
	}
	
	this.addOption = function(min, max) {
		this.option = {
				"nameOfClass" : this.name,
				"min" : min,
				"max" : max
		}
	}
}