/**
 *
 */

window.SSNS = window.SSNS || { };

SSNS.createRow = function(points, name, imgLoc, linkLoc) {
	var row = document.createElement("tr");
	
	var baseLink = document.createElement("a");
    baseLink.setAttribute("href", linkLoc);
	
	var pointsEntr = document.createElement("td");
	var pictureEntr = document.createElement("td");
	var nameEntr = document.createElement("td");
	
	
	$(pointsEntr).append(points);
	var nameLink = $.clone(baseLink);
	$(nameLink).append(name);
	$(nameEntr).append(nameLink);
	
	var picture = document.createElement("img");
	picture.setAttribute("src", imgLoc);
	picture.setAttribute("alt-text", name);
	picture.setAttribute("style", "width: 50px; height: 50px");
	picture.className = "media-object";
	var pictureLink = $.clone(baseLink);
	
	$(pictureEntr).append($(pictureLink).append(picture));
	
	var linkEntr = document.createElement("td");
	$(linkEntr).append(baseLink);
	$.each([pointsEntr, pictureEntr, nameEntr, 
	        $(linkEntr).append("Champion Select Link")], 
	        function() {
				$(row).append(this);
	});
	
	return row;
};