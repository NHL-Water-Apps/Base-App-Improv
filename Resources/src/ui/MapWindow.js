(function () {	
	var MapWindow = {
		// Window object
		window: Titanium.UI.createWindow({
			title: 			  VwApp.Config.MapTabTitle,				
			backgroundColor:  VwApp.Config.ViewBackgroundColor,
			orientationModes: VwApp.Config.OrientationModes,
			navBarHidden:	  true			
		}),
		
		// Object met Google Maps kaart
		map: Titanium.Map.createView({
			animate: 	  true, 
			mapType: 	  Titanium.Map.STANDARD_TYPE, 
			region: 	  VwApp.Config.DefaultRegion,
			regionFit: 	  true, 
			userLocation: true,
		}),
			
		// De button waarmee je naar je eigen locatie gaat.
		locationButton: Titanium.UI.createButton({
			image:  VwApp.Config.UserLocateIcon,
			right:  '3%', 
			bottom: 5,
			height: 'auto',
			width: 	'auto',
		}),
		
		// Een variable die we gebruiken voor het aangeven of we nu de annotaties
		// 	kunnen wegschrijven (false wanneer we bewegen op de kaart)
		drawAnnotations: true,
		regionChanged: 0
	};
	
	/**
	 *  SPECIFIEK VOOR ANDROID
	 */
	if (Titanium.Platform.osname === 'android') {
		// Zoekbalk is default onzichtbaar. (voor android)
		//MapWindow.searchbar.setVisible(false);

		// Event listener op orientation change, om de hoogte van de searchbar
		// consistent te houden tussen landschap en portret mode 
		Titanium.Gesture.addEventListener('orientationchange', function () {
			var height = Titanium.Gesture.isPortrait() ? '12%' : '20%';
			//MapWindow.searchbar.setHeight(height);
		});
		
		// Bij het laden alvast een keer kunstmatig bovenstaande event-
		// listener aanroepen.
		Titanium.Gesture.fireEvent('orientationchange');
	}
	
	// Stel de huidige mapview in als mapview te gebruiken door de Map module.
	VwApp.Map.setMapView(MapWindow.map);
		
	// Een aantal dingen die we niet gelijk nodig hebben stoppen we in de onload
	// queue.
	VwApp.OnLoad.addFn(function() {
		
		/**
		 * De eventhandler voor de knop die de locatie van de gebruiker moet vinden.
		 */
		MapWindow.locationButton.addEventListener('click', function() {
			var location;
			
			VwApp.Map.updateGeolocation();
			location = VwApp.Map.getUserLocation();
			if (location) {
				VwApp.Map.setLocation(location.latitude, location.longitude, VwApp.Config.DefaultUserLocZoom);
			} 
		});
		
		/**
		 *	Eventlisener die aangeroepen wordt als de map wordt verplaats of ingezoomt
		 * 		deze roept de functie aan die alle annotaties op de kaart aanmaakt 
		 */
		MapWindow.map.addEventListener('regionChanged', function(e){
			clearTimeout(MapWindow.regionChanged);
			
			MapWindow.regionChanged = setTimeout(function() {			
				if(VwApp.UI.MapWindow.drawAnnotations){
					VwApp.Map.filterAnnotations(e, VwApp.Data);
				}
			}, 400);		
		});
		
		/**
	 	 *	Fucntie die draait op het moment dat er op een punt in de kaart geklikt wordt
	 	 * 	Als hierop geklikt is zal er gekeken "waar" er op de item geklikt is en als dat
	 	 * 		op het knopje is, zal er een nieuw venster geopend worden naar een detailview	 
	 	 */
		MapWindow.map.addEventListener('click', function(e){
			// Kijken waar er gedrukt is
			if(e.clicksource === 'rightButton' || e.clicksource === 'rightPane')
			{
				VwApp.UI.changeDetailView(e.annotation.dataToPass);
				VwApp.UI.TabBar.mapTab.open(VwApp.UI.DetailWindow.window, {animate: true});
			}
		});
		
		
		// Indien we een locatie krijgen gaan we gelijk naar deze locatie bij het starten van de app		
		VwApp.Map.updateGeolocation();
		location = VwApp.Map.getUserLocation();
		
		if (location) {
			VwApp.Map.setLocation(location.latitude, location.longitude, VwApp.Config.DefaultUserLocZoom);
		}
		
		// Het loggen van de trail starten
		VwApp.Map.showTrail(0);
	});
	
	// Voeg alle onderdelen toe aan MapWindow.window
	MapWindow.window.add(MapWindow.map);
	//MapWindow.window.add(MapWindow.searchbar);
	
	MapWindow.window.add(MapWindow.locationButton);	
					
	// Voeg MapWindow toe aan de UI namespace voor gebruik buiten deze closure.
	VwApp.UI.MapWindow = MapWindow;
	
	
})();