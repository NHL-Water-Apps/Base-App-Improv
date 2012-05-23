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
		
		// Object van de zoekbalk op de kaart.
		searchbar: Titanium.UI.createSearchBar({
			barColor: 	VwApp.Config.SearchBackgroundColor, 
			showCancel: false, 
			focusable: 	false, 
			hintText: 	VwApp.Config.SearchBarText, 
			top : 0
		}),
		
		// De button waarmee je naar je eigen locatie gaat.
		locationButton: Titanium.UI.createButton({
			image:  VwApp.Config.UserLocateIcon,
			right:  '3%', 
			bottom: 5,
			height: 'auto',
			width: 	'auto',
		})
	};
	
	/**
	 *  SPECIFIEK VOOR ANDROID
	 */
	if (Titanium.Platform.osname === 'android') {
		// Zoekbalk is default onzichtbaar. (voor android)
		MapWindow.searchbar.setVisible(false);

		// Event listener op orientation change, om de hoogte van de searchbar
		// consistent te houden tussen landschap en portret mode 
		Titanium.Gesture.addEventListener('orientationchange', function () {
			var height = Titanium.Gesture.isPortrait() ? '12%' : '20%';
			MapWindow.searchbar.setHeight(height);
		});
		
		// Bij het laden alvast een keer kunstmatig bovenstaande event-
		// listener aanroepen.
		Titanium.Gesture.fireEvent('orientationchange');
		
		// Event listener die de zoekbalk toont/verbergt wanneer er op de search 
		// soft-button van het android toestel word gedrukt.
		MapWindow.window.addEventListener('android:search', function () {
			if (MapWindow.searchbar.visible === true) {
				MapWindow.searchbar.setVisible(false, {animated: true});
			} else {
				MapWindow.searchbar.setVisible(true, {animated: true});
			}
		});
	}
	
	// Stel de huidige mapview in als mapview te gebruiken door de Map module.
	VwApp.Map.setMapView(MapWindow.map);
	
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
 	 *	Fucntie die draait op het moment dat er op een punt in de kaart geklikt wordt
 	 * 	Als hierop geklikt is zal er gekeken "waar" er op de item geklikt is en als dat
 	 * 		op het knopje is, zal er een nieuw venster geopend worden naar een detailview	 
 	 */
	MapWindow.map.addEventListener('click', function(e){
		if(e.clicksource === 'rightButton' || e.clicksource === 'rightPane')
		{
			VwApp.UI.changeDetailView(e.annotation.dataToPass);
			VwApp.UI.TabBar.mapTab.open(VwApp.UI.DetailWindow.window, {animate: true});
		}
	});
	
	// Alle annotations toevoegen aan de kaart
	VwApp.Map.annotationsArray(VwApp.Data.bruggen, VwApp.Config.BridgeGreenIcon, VwApp.Config.BridgeRedIcon);
	
	// Indien we een locatie krijgen gaan we gelijk naar deze locatie bij het starten van de app
	VwApp.Map.updateGeolocation();
	location = VwApp.Map.getUserLocation();
	if (location) {
		VwApp.Map.setLocation(location.latitude, location.longitude, VwApp.Config.DefaultUserLocZoom);
	}
	
	// Het loggen van de trail starten
	VwApp.Map.showTrail(0);
	
	// Voeg alle onderdelen toe aan MapWindow.window
	MapWindow.window.add(MapWindow.map);
	MapWindow.window.add(MapWindow.searchbar);
	
	if (Titanium.Platform.osname === 'android') {
		MapWindow.window.add(MapWindow.locationButton);
	}
			
	// Voeg MapWindow toe aan de UI namespace voor gebruik buiten deze closure.
	VwApp.UI.MapWindow = MapWindow;
})();