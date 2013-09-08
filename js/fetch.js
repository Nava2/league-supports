/**
 * 
 */

window.SSNS = window.SSNS || { };

function encodeYQL(s) {
	return encodeURI(s).replace(/%27/g, '\'').replace(/\//g, '%2f')
		.replace(/=/g, '%3D').replace(/:/g, '%3A').replace(/@/g, '%40');
}

SSNS.YQLChampionResult = function(content, url) {
	this.content = content;
	this.url = url;
};

SSNS.YQLChampionResult.prototype.toString = function() {
	var out = ["YQLChampionResult{ content : \"", this.content, "\", url : \"", 
	           this.url, "\" }"];
	return out.join("");
};

SSNS.getInformation = function(infoObj, searchArea, resultFunc) {
	if (infoObj === null || searchArea === null) {
		return null;
	}
	
	var champQuery = searchArea.query.replace(/%%CHAMP%%/g, infoObj.selectName);
			
	var query = encodeYQL(champQuery);
	var fQuery = "http://query.yahooapis.com/v1/public/yql?q=" + query + "&format=json&callback=";
	
	console.log("REST Query = { " + fQuery + " }");
	
	var result = [];
	return $.getJSON(fQuery, function(data) {
		if (resultFunc === null)
			return null;

		console.log("data size: " + data.query.count);
		
		// convert to our own data type.. :/
		$.each(data.query.results.a, function() {
			result.push(new SSNS.YQLChampionResult(this.content, this.href));
		});
	}).done(function() {
		resultFunc(result);
	});	
};

SSNS.filterType = function(type, resultSet) {
	var result = [];
	
	var validChamps = SSNS.Champion.ALL()[type];
	
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

/**
 * Currently has support for: 
 * 	- ourADC
 *  - oppADC
 *  - oppSupp
 *  
 * Filters can be an array of functions which are applied <em>in-order</em> of 
 * specification. Otherwise, a single will be applied.
 */
SSNS.fetchRequiredData = function(context, onComplete) {
	
	// declare constants
	var CHAMPIONS = SSNS.Champion.ALL();
	var ADCS = CHAMPIONS.adcs;
	var SUPPORTS = CHAMPIONS.supports;
	var SEARCH_AREAS = SSNS.searchAreas();
	
	// grab values from the context
	var ourADC = context["ourADC"];
	var oppADC = context["oppADC"];
	var oppSupp = context["oppSupp"];
	
	// set the default filters to use on champions
	var filters = {
			ourADC : SSNS.filterOnlySupports, 
			oppADC : SSNS.filterOnlySupports,
			oppSupp : SSNS.filterOnlySupports
	};
	
	// check if there were any custom filters added, if so, replace the default
	if (context.hasOwnProperty("filters")) {
		var conFilters = context.filters;
		var filterKeys = Object.keys(filters);
		
		$.each(filterKeys, function() {
			filters[this] = conFilters[this] !== null ? conFilters[this] : filters[this];
			
			// if its an array of filters, we need to handle it differently
			if ($.isArray(filters[this])) {
				var filtersArr = filters[this];
				filters[this] = function(result) {  
					var out = result;
					$.each(filtersArr, function() {
						out = this(out);
					});
					
					return out;
				};
			}
		});
	}
	
	var ind = ADCS.binaryIndexOf(ourADC);
	var ourADCInfo = ind !== -1 ? ADCS[ind] : null;
	
	ind = ADCS.binaryIndexOf(oppADC);
	var oppADCInfo = ind !== -1 ? ADCS[ind] : null;
	
	ind = SUPPORTS.binaryIndexOf(oppSupp);
	var oppSuppInfo = ind !== -1 ? SUPPORTS[ind] : null;
	
	var supportValues = { };
	for (var i = 0; i < SUPPORTS.length; ++i ) {
		supportValues[SUPPORTS[i].name] = 0.0;
	}
	
	supportValues.inc = function(champ, value) {
		if (supportValues[champ] !== null) {
			supportValues[champ] += value;
		}
	};
	
	supportValues.dec = function(champ, value) {
		if (supportValues[champ] !== null) {
			supportValues[champ] -= value;
		}
	};
	
	var updateSupports = function(champs) {
		var len = champs.length;
		len = Math.min(SSNS.EXPECTED_CHAMPS, len);
		var value = SSNS.EXPECTED_CHAMPS;
		
		for (var i = 0; i < len; ++i) {
	  		var supp = champs[i];
			console.log("Champ: " + supp.content 
					+ " : link=" + supp.href);
			
			supportValues.inc(supp.content, value--);
		}
	};
	
	// call 3 async grabs of info, update when we are done
	$.when(SSNS.getInformation(oppADCInfo, SEARCH_AREAS.counter, function(result) {
           var counterSupportsRAW = filters.oppADC(result);
           
           updateSupports(counterSupportsRAW);
    }), SSNS.getInformation(oppSuppInfo, SEARCH_AREAS.counter, function(result) {
			var counterSupportsRAW = filters.oppSupp(result);
			
			updateSupports(counterSupportsRAW);
	}), SSNS.getInformation(ourADCInfo, SEARCH_AREAS.supports, function(result) {
            var counterSupportsRAW = filters.oppADC(result);
            
            updateSupports(counterSupportsRAW);
    })).done(function() {
			var suppArray = [];
			$.each(SUPPORTS, function() {
				var value = supportValues[this.name];
				if (value <= 0) {
					return; // continue
				}
				
				var imgName = this.hasOwnProperty("imgName") && this.imgName !== null ? 
						this.imgName : this.selectName;
				
				suppArray.push({
					name : this.name, 
					value : value,
					url : "http://www.championselect.net/champ/" + this.selectName,
					image : "http://ddragon.leagueoflegends.com/cdn/3.10.3/img/champion/" + imgName + ".png"
				});
			});
			
			// sort highest first
			suppArray.sort(function(l, r) {
				return r.value - l.value;
			});
			
			var ind = 1;
			var result = [];
			$.each(suppArray, function() {
				var row = SSNS.createRow(this.value, this.name, 
						this.image, this.url);
				ind = (ind + 1 ) % 2;
				if (ind === 0) {
					$(row).css("background-color", "rgb(238, 238, 238)");
				}
				
				result.push(row);
			});
			
			onComplete(result);
			
			return result;
	});
	
	
};
