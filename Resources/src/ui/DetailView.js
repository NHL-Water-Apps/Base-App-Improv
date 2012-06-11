(function () {

	// de button om de brug op de kaart te tonen
	var	Toonkaart = Titanium.UI.createButton({
			top: 			40,
			image:			Titanium.Platform.osname === 'android' ? (Titanium.Platform.displayCaps.platformHeight > 700 ?
								VwApp.Config.ShowOnMapGroter : VwApp.Config.ShowOnMap ) : '',
			title:			Titanium.Platform.osname === 'android' ? '': VwApp.Config.ShowOnMapText,
			position: 		'center'
		});

	// Detailwindow en zijn elementen
	var DetailWindow = {
		window: Titanium.UI.createWindow({
			top: 			0,
			height: 		'100%',
			width: 			'100%',
			backgroundColor: VwApp.Config.ViewBackgroundColor,
			contentHeight: 	'auto',
			navBarHidden: 	false,
		}),

		// Een container waar we alles in stoppen
		Container: Titanium.UI.createScrollView({
			height:			'100%',
			width:			'100%',
			layout:			'vertical',
			scrollType:		'vertical',
			contentHeight: 	'auto',
			contentWidth: 	'auto'
		}),

		// Type van de data
		TypeData : Titanium.UI.createLabel({
			text : 			"",
			textAlign: 		'center',
			left: 			'3 %',
			width : 		'auto',
			heigth : 		18,
			top:			'2%',
			color:			VwApp.Config.TextColor
		}),


		Stad : 	Titanium.UI.createLabel({
			text : 			"",
			textAlign : 	"left",
			left: 			'3 %',
			width : 		'100%',
			heigth : 		'auto',
			top:			'2%',
			color:			VwApp.Config.TextColor

		})
	};

	/**
	 * 	Bij de ipad de button wel een hoogte en breedte meegeven
	 */
	//if (Titanium.Platform.osname === 'ipad' || Titanium.Platform.osname === 'iphone') {
	//			DetailWindow.Toonkaart.height 	= 40;
	//			DetailWindow.Toonkaart.width 	= 120;
	//}

	// variabelen voor de lat en de lon
	var Lat = "";
	var Lon = "";

	/**
	 *	Een functie die de meegegeven data zal omzetten naar
	 * 		de nieuwe informatie voor de detailView
	 *
	 *	@param {Object} [data]
	 * 		De meegegeven informatie over een annotatie
	 */
	function ChangeValue(data) {
		// wanneer er geen data is gevonden, niks doen.
		if (!data) {
			return;
		}

		// elke tekst in de labels op 0% zetten zodat er weer met een lege pagina begonnen wordt
		for (text in DetailWindow) {
			if (DetailWindow.hasOwnProperty(text) && DetailWindow[text].setText) {
				DetailWindow[text].height = 0;
				}
			}

		// window en container op 100% zetten
		DetailWindow.window.Height = '100%';
		DetailWindow.Container.Height = '100%';

		// title van de pagina instellen
		if (data.title) {
			DetailWindow.window.setTitle(data.title);
		} else {
			DetailWindow.window.setTitle("-");
		}

		// data type weergeven door de hoogte auto te zetten
		DetailWindow.TypeData.height = 'auto';

		// het type data bovenaan zetten
		DetailWindow.TypeData.setText(VwApp.Config.VisStekDetail);


		// het label stad weergeven
		DetailWindow.Stad.height = 'auto';

		// de tekst van de stad veranderen
		if (data.CITY) {
			DetailWindow.Stad.setText(VwApp.Config.CityDetail + data.CITY);
		} else {
			DetailWindow.Stad.setText(VwApp.Config.CityDetail + "-");
		}


		//kijken of de data een lat en lon heeft en deze variabelen daarop aanpassen
		if (data.LON && data.LAT) {
		    Lat = data.LAT;
		  	Lon = data.LON;
		} else {
			Lat = "";
		  	Lon = "";
		}
	}

	// wanneer er geklikt wordt op de button setlocation op map en open de map, mits lat en lon aanwezig
	Toonkaart.addEventListener('click', function() {
		if (Lat != "") {
			VwApp.Map.setLocation(Lat, Lon, VwApp.Config.DefaultUserLocZoom);
			VwApp.UI.TabBar.tabGroup.setActiveTab(VwApp.UI.TabBar.mapTab);
			VwApp.UI.DetailWindow.window.close();
		}
	});


	// Alle labels toevoegen aan de scrollview
	// Bij het aanroepen van een change method zal overal
	// de juiste data in komen te staan
	// In eerste instantie worden die labels allemaal op hoogte 0% gezet
	// verder in die methode worden ze dan weergeven wanneer dit van toepassing is
	DetailWindow.Container.add(DetailWindow.TypeData);
	DetailWindow.Container.add(DetailWindow.Stad);
	// toonkaart hier pas toevoegen, anders komt deze bovenaan te staan
	DetailWindow.Container.add(Toonkaart);

	// scrollview met de labels toevoegen aan de window
	DetailWindow.window.add(DetailWindow.Container);


	VwApp.UI.DetailWindow = DetailWindow;
	VwApp.UI.changeDetailView = ChangeValue;
})();
