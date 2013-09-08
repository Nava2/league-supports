/**
 * 
 */

window.SSNS = window.SSNS || { };

SSNS.EXPECTED_CHAMPS = 4;

/**
 * Container class for Champion information
 * @param selectName
 * @param name
 * @param imgName
 * @returns {SSNS.Champion}
 */
SSNS.Champion = function(selectName, name, imgName) {
	this.selectName = selectName;
	this.name = name;
	this.imgName = !imgName ? selectName : imgName;
};

SSNS.Champion.prototype.valueOf = function() {
	return this.selectName;
};

SSNS.Champion.prototype.toString = function() {
	var out = ["Champion{ name : \"", this.name, "\", selectName : \"",
	           this.selectName, "\", imgName : \"", this.imgName, "\" }"];
	return out.join("");
};

SSNS.Champion.ALL = function() {
	var result = {};

	var adcs = [ new SSNS.Champion("Ashe", "Ashe"),
	             new SSNS.Champion("Caitlyn", "Caitlyn"), 
	             new SSNS.Champion("Corki", "Corki"), 
	             new SSNS.Champion("Ezreal", "Ezreal"),
	             new SSNS.Champion("Graves", "Graves"), 
	             new SSNS.Champion("Kennen", "Kennen"), 
	             new SSNS.Champion("KogMaw", "Kog'Maw"), 
	             new SSNS.Champion("Miss-Fortune", "Miss Fortune", "MissFortune"),
	             new SSNS.Champion("Sivir", "Sivir"),
	             new SSNS.Champion("Quinn", "Quinn"), 
	             new SSNS.Champion("Tristana", "Tristana"), 
	             new SSNS.Champion("Twitch", "Twitch"), 
	             new SSNS.Champion("Urgot", "Urgot"),
	             new SSNS.Champion("Varus", "Varus")
	];

	var supports = [ new SSNS.Champion("Blitzcrank", "Blitzcrank"),
	                 new SSNS.Champion("Fiddlesticks", "FiddleSticks", "FiddleSticks"),
	                 new SSNS.Champion("Janna", "Janna"), 
	                 new SSNS.Champion("Karma", "Karma"), 
	                 new SSNS.Champion("Leona", "Leona"), 
	                 new SSNS.Champion("Lulu", "Lulu"), 
	                 new SSNS.Champion("Lux", "Lux"), 
	                 new SSNS.Champion("Morgana", "Morgana"), 
	                 new SSNS.Champion("Nami", "Nami"), 
	                 new SSNS.Champion("Nunu", "Nunu"), 
	                 new SSNS.Champion("Nidalee", "Nidalee"), 
	                 new SSNS.Champion("Sona", "Sona"), 
	                 new SSNS.Champion("Soraka", "Soraka"), 
	                 new SSNS.Champion("Taric", "Taric"), 
	                 new SSNS.Champion("Thresh", "Thresh"),
	                 new SSNS.Champion("Zilean", "Zilean"), 
	                 new SSNS.Champion("Zyra", "Zyra") 
	];

	result["adcs"] = adcs;
	result["supports"] = supports;
	result["all"] = adcs + supports;
	
	return result;
};

SSNS.searchAreas = function() {
	return { "supports" : {
  		    	"area" : "Goodwiths", 
  		    	"query" : "select * from html where " +
  		    			"url='http://www.championselect.net/champ/%%CHAMP%%' " +
  		    			"and xpath='//div[@class=\\'Goodwiths\\']//div/h3/a'",
  		    	"result" : "supports"
  			},
  			"counter" : { 
  				"area" : "Counters",
  				"query" : "select * from html where " +
  						"url='http://www.championselect.net/champ/%%CHAMP%%' " +
  						"and xpath='//div[@class=\\'Counters\\']//div[div/div[@class=\\'champinfo_tag\\']/span/@id = \\'tag_bottom\\' " +
  						"or div/div[@class=\\'champinfo_tag\\']/span/@id = \\'tag_general\\' ]/h3/a'",
  				"result" : "counter"
  			},
  			"avoid" : {
  				"area" : "Badpicks",
  				"query" : "select * from html where url='http://www.championselect.net/champ/%%CHAMP%%' " +
  						"and xpath='//div[@class=\\'Badpicks\\']//div[div/div[@class=\\'champinfo_tag\\']/span/@id = \\'tag_bottom\\' " +
  						"or div/div[@class=\\'champinfo_tag\\']/span/@id = \\'tag_general\\' ]/h3/a'",
  				"result" : "avoid"
  			}
	};
};