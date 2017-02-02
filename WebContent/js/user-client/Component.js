/**
 * Die Klasse fügt die Komponente in die Area
 */
function Component(nameOfClass, nameOfComp, statusToShow){
	this.nameOfClass = nameOfClass;
	this.nameOfComp = nameOfComp;
	var comp = null;
	this.statusToShow = statusToShow;
	this.addComponent = function() {
		if(this.statusToShow){
			comp = $(
				'<input type="checkbox" name="check" id="' + this.nameOfComp.id + 
				'">' + this.nameOfComp.nameToShow + '</br>'
			);
		}else{
			comp = $(
				'<div id="' + this.nameOfComp.id + '" class="component">' +
				'<p>' + this.nameOfComp.nameToShow + '</p>' +
				'</div>'
			);
		}
		//Komponente zu der ClassOfComponents hinzufuegen
		$("#" + this.nameOfClass).append(comp);
		//Listner hinzufügen
	}
}