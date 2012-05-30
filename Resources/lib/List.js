var tableData = [];

var makeRow = function(data) {
	var title = "";
	
	if (data.title) {
		title += data.title;
	}
	
	if (data.DISTANCE) {
		title += " (" + data.DISTANCE + " km)";
	}	
	
	return Titanium.UI.createTableViewRow({
		title: title,
		data : data
	});
};

var addData = function(data) {
	if (!data)
		return;
		
	for (var i = 0; i < data.length; i++) {
		tableData.push(makeRow(data[i]));
	}
	
	return tableData;
};

var sortData = function(data) {
	if (!data) {
		return;
	}
	
	data.sort(function(a, b) {
		if (a.title < b.title)
			return -1;
		if (a.title > b.title)
			return 1;
			
		return 0;
	});	
	
	return data;
};

var clearData = function() {
	tableData = [];
};

exports.makeRow = makeRow;
exports.addData = addData;
exports.sortData = sortData;
exports.clearData = clearData;