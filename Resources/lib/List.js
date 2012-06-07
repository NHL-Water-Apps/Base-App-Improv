// Ervoor zorgen dat de config variablen ook beschikbaar zjin in deze
//	module
var Config = require('/Config');

var tableData = [];

/**
 * Maakt een tableRow van een dataobject
 * 
 * @param {Object} data
 * 		Een data object.
 */
var makeRow = function(data) {	
	
	return Titanium.UI.createTableViewRow({
		title: data.title,
		data : data,
		color : Config.TextColor
	});
};

/**
 * Voegt een array van data objecten toe aan de tableData array als tableRows.
 * 
 * @param {Object} data
 * 		Een array van data objecten.
 */
var addData = function(data) {
	if (!data)
		return;
		
	for (var i = 0; i < data.length; i++) {
		tableData.push(makeRow(data[i]));
	}
};

/**
 * Sorteert de huidige data.
 */
var sortData = function() {
	
	tableData.sort(function(a, b) {
		if (!a.title)
			return 1;
			
		if (!b.title)
			return -1;
		
		if (a.title < b.title)
			return -1;
		if (a.title > b.title)
			return 1;
			
		return 0;
	});	
};

/**
 * Verwijdert alle tableData
 */
var clearData = function() {
	tableData = [];
};

/**
 * Returned alle table data als array.
 */
var getData = function() {
	return tableData;
};

exports.addData = addData;
exports.sortData = sortData;
exports.clearData = clearData;
exports.getData = getData;