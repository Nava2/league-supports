/**
 * 
 */

window.SSNS = window.SSNS || { };

SSNS.Characters = function() {
	var result = {};

	var adcs = [ {
			"selectName" : "Ashe",
			"name" : "Ashe"
		}, {
			"selectName" : "Caitlyn",
			"name" : "Caitlyn"
		}, {
			"selectName" : "Corki",
			"name" : "Corki"
		}, {
			"selectName" : "Ezreal",
			"name" : "Ezreal"
		}, {
			"selectName" : "Graves",
			"name" : "Graves"
		}, {
			"selectName" : "Kennen",
			"name" : "Kennen"
		}, {
			"selectName" : "KogMaw",
			"name" : "Kog'Maw"
		}, {
			"selectName" : "Miss-Fortune",
			"name" : "Miss Fortune"
		}, {
			"selectName" : "Tristana",
			"name" : "Tristana"
		}, {
			"selectName" : "Twitch",
			"name" : "Twitch"
		}, {
			"selectName" : "Sivir",
			"name" : "Sivir"
		}, {
			"selectName" : "Urgot",
			"name" : "Urgot"
		} 
	];

	var supports = [ 
	    {
	    	"selectName" : "Blitzcrank",
	    	"name" : "Blitzcrank"
	    }, {
			"selectName" : "Fiddlesticks",
			"name" : "Fiddlesticks"
		}, {
			"selectName" : "Janna",
			"name" : "Janna"
		}, {
			"selectName" : "Karma",
			"name" : "Karma"
		}, {
			"selectName" : "Leona",
			"name" : "Leona"
		}, {
			"selectName" : "Lulu",
			"name" : "Lulu"
		}, {
			"selectName" : "Lux",
			"name" : "Lux"
		}, {
			"selectName" : "Morgana",
			"name" : "Morgana"
		}, {
			"selectName" : "Nami",
			"name" : "Nami"
		}, {
			"selectName" : "Nunu",
			"name" : "Nunu"
		}, {
			"selectName" : "Nidalee",
			"name" : "Nidalee"
		}, {
			"selectName" : "Sona",
			"name" : "Sona"
		}, {
			"selectName" : "Soraka",
			"name" : "Soraka"
		}, {
			"selectName" : "Taric",
			"name" : "Taric"
		}, {
			"selectName" : "Thresh",
			"name" : "Thresh"
		}, {
			"selectName" : "Zilean",
			"name" : "Zilean"
		}, {
			"selectName" : "Zyra",
			"name" : "Zyra"
		} 
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