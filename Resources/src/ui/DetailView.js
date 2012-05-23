(function () {
//scrollview
var containerScrollView = {
	window: Titanium.UI.createWindow({
		top: 			0,
		layout: 		'vertical',
		height: 		'100%',
		width: 			'100%', 
		backgroundColor: VwApp.Config.ViewBackgroundColor,  
		contentHeight: 	'auto'
	}),

	//Hieronder staan de eigenschappen van de brug. Type, hoogte etc
	Type : Titanium.UI.createLabel({
		text : 			"",
		textAlign : 	"left",
		left: 			'3 %',
		width : 		'auto',
		heigth : 		'auto'
	}),
	Hoogte : Titanium.UI.createLabel({
		text : 			"",
		textAlign : 	"left",
		left: 			'3 %',
		width : 		'auto',
		heigth : 		'auto'
	}),
	Breedte : Titanium.UI.createLabel({
		text : 			"",
		textAlign : 	"left",
		left: 			'3 %',
		width : 		'auto',
		heigth : 		'auto'
	}),
	Adres : Titanium.UI.createLabel({
		text : 			"",
		textAlign : 	"left",
		left: 			'3 %',
		top: 			'2%',
		width : 		'auto',
		heigth : 		'auto'
	}),
	//de button om de brug op de kaart te tonen
	Toonkaart : Titanium.UI.createButton({
		top: 			80, 
		height: 		'auto',
		width: 			'auto', 
		title: 			VwApp.Config.ShowOnMapDetail,
		position: 		'center'
	}),
	LAT : Titanium.UI.createLabel({
		text : "",
		textAlign : 	"left",
		left: 			'3 %',
		top: 			'2%',
		width : 		'auto',
		heigth : 		'auto'
	}),
	LON : Titanium.UI.createLabel({
		text : "",
		textAlign : 	"left",
		left: 			'3 %',
		top: 			'2%',
		width : 		'auto',
		heigth : 		'auto'
	})
};

function ChangeValue(data) {
	if (!data) {
		return;
	}
	//alert(' got here');
	if (data.ADRESS) {
		containerScrollView.Adres.setText(VwApp.Config.AdressDetail + data.ADRESS);
	}
	else
		containerScrollView.Adres.setText("Er kon geen adres gevonden worden");
	if(data.Breedte)
		containerScrollView.Breedte.setText(VwApp.Config.WidthDetail + data.WIDTH + VwApp.Config.UnitDetail);
	else
		containerScrollView.Breedte.setText("er kon geen breedte gevonden worden");
	if(data.LON && data.LAT)
	{ 
		containerScrollView.LAT.setText(data.LAT);
	  	containerScrollView.LON.setText(data.LON);
	}
	else
	{ 
		containerScrollView.LAT.setText("");
	  	containerScrollView.LON.setText("");
	}
	
}
	
	//wanneer er geklikt wordt op de button setlocation op map en open de map, mits lat en lon aanwezig
	containerScrollView.Toonkaart.addEventListener('click', function(){   
	if(containerScrollView.LAT.text != "")
		{
			setLocation(containerScrollView.LAT.text, containerScrollView.LON.text, VwApp.Config.DefaultUserLocZoom)
			VwApp.UI.DetailView(VwApp.UI.TabBar.Mapwindow)
		}	
	});
	
	//toevoegen aan scrollview
	containerScrollView.window.add(containerScrollView.imagebridge),
	containerScrollView.window.add(containerScrollView.Type),
	containerScrollView.window.add(containerScrollView.Hoogte),
	containerScrollView.window.add(containerScrollView.Breedte), 
	containerScrollView.window.add(containerScrollView.Toonkaart), 

	VwApp.UI.DetailView = containerScrollView;
	VwApp.UI.changeDetailView = ChangeValue;
})();


