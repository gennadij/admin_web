/**
 * Die Klasse fügte die Areas in dem Interface
 */

function Area(area) {
	this.area = area;
	this.domain;
	
	this.addArea = function() {
		if(this.domain == "muesli"){
			var cssClass = undefined;
			var tarToAdd = undefined;
			if(this.area.insertIn == "currentConfig"){
				cssClass = this.area.insertIn;
				tagToAdd = "header";
			}else if(this.area.insertIn == "subarea"){
				cssClass = "area_muesli"
				tagToAdd = "section"
			}else{
				cssClass = "area_muesli"
				tagToAdd = "section"
			}
			
			if(this.area.nickName == "muesli"){
				cssClass = "muesli";
			}
			var area = $(
					'<div id="' + this.area.nickName + '" class="' + cssClass + '">'+
					'<p>' + this.area.nameToShow + 
//					'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
//					'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
//					'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
//					'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
//					this.area.description + 
					'</p>'+ 
					'</div>'
				);
			
			$(tagToAdd).append(area); 
		}else{
			var cssClass = undefined;
			var tarToAdd = undefined;
			if(this.area.insertIn == "currentConfig"){
				cssClass = this.area.insertIn;
				tagToAdd = "header";
			}else if(this.area.insertIn == "subarea"){
				cssClass = "area"
				tagToAdd = "section"
			}else{
				cssClass = "area"
				tagToAdd = "section"
			}
			var area = $(
					'<div id="' + this.area.nickName + '" class="' + cssClass + '">'+
					'<p>' + this.area.nameToShow + 
					'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
					'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
					'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
					'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
					this.area.description + '</p>'+ 
					'</div>'
				);
			$(tagToAdd).append(area);
		}
		
	}
}
