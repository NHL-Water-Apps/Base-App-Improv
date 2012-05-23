(function () {
	//scrollview
	var DetailWindow = {
		window: Titanium.UI.createWindow({
			top: 			0,
			//layout: 		'vertical',
			height: 		'100%',
			width: 			'100%', 
			backgroundColor: VwApp.Config.ViewBackgroundColor,  
			contentHeight: 	'auto'
		}),
		
		// Een container waar we alles in stoppen
		Container: Titanium.UI.createScrollView({
			height:			'100%',
			width:			'100%',
			layout:			'vertical' 
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
		DetailWindow.Adres.setText(VwApp.Config.AdressDetail + data.ADRESS);
	}
	else
		DetailWindow.Adres.setText("Er kon geen adres gevonden worden");
	if(data.Breedte)
		DetailWindow.Breedte.setText(VwApp.Config.WidthDetail + data.WIDTH + VwApp.Config.UnitDetail);
	else
		DetailWindow.Breedte.setText("er kon geen breedte gevonden worden");
	if(data.LON && data.LAT)
	{ 
		DetailWindow.LAT.setText(data.LAT);
	  	DetailWindow.LON.setText(data.LON);
	}
	else
	{ 
		DetailWindow.LAT.setText("");
	  	DetailWindow.LON.setText("");
	}
	
}
	
	//wanneer er geklikt wordt op de button setlocation op map en open de map, mits lat en lon aanwezig
	DetailWindow.Toonkaart.addEventListener('click', function(){   
	if(DetailWindow.LAT.text != "")
		{
			setLocation(DetailWindow.LAT.text, DetailWindow.LON.text, VwApp.Config.DefaultUserLocZoom)
			VwApp.UI.DetailWindow(VwApp.UI.TabBar.Mapwindow)
		}	
	});
	
	//toevoegen aan scrollview
	//DetailWindow.Container.add(DetailWindow.imagebridge); Bestaat nog niet?
	DetailWindow.Container.add(DetailWindow.Type);
	DetailWindow.Container.add(DetailWindow.Hoogte);
	DetailWindow.Container.add(DetailWindow.Breedte); 
	DetailWindow.Container.add(DetailWindow.Toonkaart); 
	DetailWindow.window.add(DetailWindow.Container);
	
	VwApp.UI.DetailWindow = DetailWindow;
	VwApp.UI.changeDetailView = ChangeValue;
})();


