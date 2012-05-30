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
}


exports.makeRow = makeRow;