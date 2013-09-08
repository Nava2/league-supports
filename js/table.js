/**
 *
 */

window.SSNS = window.SSNS || { };

SSNS.createRow = function(points, name, imgLoc, linkLoc) {
	var row = document.createElement("div");
	row.className = "row-fluid well-small";
	
	var link = document.createElement("a");
    link.setAttribute("href", linkLoc);
    $(link).append("Champion Select Link");
	
	var pointsEntr = document.createElement("div");
	pointsEntr.className = "span1";
	var pictureEntr = document.createElement("div");
	pictureEntr.className = "span2";
	var nameEntr = document.createElement("div");
	nameEntr.className = "span3";
	
	$.each([pictureEntr, nameEntr], function() {
		$(link).append(this);
	});
	
	$(pointsEntr).append("<p>" + points + "</p>");
	$(nameEntr).append("<p>" + name + "</p>");
	
	var picture = document.createElement("img");
	picture.setAttribute("src", imgLoc);
	picture.setAttribute("alt-text", name);
	picture.setAttribute("style", "width: 50px; height: 50px");
	picture.className = "media-object";
	$(pictureEntr).append(picture);
	
	$(row).append(pointsEntr);
	$(row).append(link);
	
	return row;
};