/**
 * 
 */

window.SSNS = window.SSNS || { };

function encode_utf8(s) {
	return encodeURI(s).replace(/%27/g, '\'').replace(/\//g, '%2f')
		.replace(/=/g, '%3D').replace(/:/g, '%3A').replace(/@/g, '%40');
}

SSNS.getInformation = function(infoObj, searchArea, resultFunc) {
	if (infoObj === null || searchArea === null) {
		return null;
	}
	
	
	
	var champQuery = searchArea.query.replace(/%%CHAMP%%/g, infoObj.selectName);
			
	var query = encode_utf8(champQuery);
	var fQuery = "http://query.yahooapis.com/v1/public/yql?q=" + query + "&format=json&callback=";
	
	console.log("REST Query = { " + fQuery + " }");
	
	var result = [];
	return $.getJSON(fQuery, function(data) {
		if (resultFunc === null)
			return null;

		console.log("data size: " + data.query.count);
		result = data.query.results.a;
	}).done(function() {
		resultFunc(result);
	});	
};

SSNS.filterType = function(type, resultSet) {
	var result = [];
	
	var validChamps = SSNS.Characters()[type];
	
	console.log("Filtering by type=" + type + " -- set = {" + resultSet + "}");
	
	var isValidChamp = function(obj) {
		for (var i = 0; i < validChamps.length; ++i) {
			if (validChamps[i].name === obj.content) {
				return true;
			}
		}
		
		return false;
	};
	
	$.each(resultSet, function() { 
		if (isValidChamp(this)) {
			result.push(this);
		}
	});
	
	return result;
};

SSNS.filterOnlySupports = function(resultSet) {
	return SSNS.filterType("supports", resultSet);
};