var Config = require('Config');

// Locale variabelen.
var currentUserLocation
  , mapView;

/**
 * Stelt de reden in waarom de app de huidige locatie van de gebruiker wil 
 * opvragen.
 */
Titanium.Geolocation.purpose = Config.GelocationIntent;

/**
 * Stelt een locale referentie in naar de mapview die in de app wordt gebruikt.
 * 
 * De rest van de module is onbruikbaar als setMapView niet voor de tijd een 
 * keer correct aangeroepen is. 
 * 
 * @param {Titanium.Map.View} [mapview]
 * 		Een Titaniium.Map.View die door de module moet worden gebruikt.
 */
var setMapView = function(mapview) {
	mapView = mapview;
};

/**
 * Wrapper functie om de mapview.setLocation functie. Aan de hand van een 
 * lat/long coordinaat en een zoomniveau word de map naar de opgegeven 
 * locatie geanimeerd.
 * 
 * @param {number} [latitude]
 * 		De latitude van de locatie.
 * @param {number} [longitude]
 * 		De longitude van de locatie.
 * @param {number} [zoom] 
 * 		Het niveau van inzoomen in de vorm van lat/longDelta
 * 
 */
var setLocation = function(latitude, longitude, zoom) {	
	mapView.setLocation({
		latitude: 		latitude,
		longitude: 		longitude,
		latitudeDelta: 	zoom,
		longitudeDelta: zoom,
		animate:		true
	});
};

/**
 * Ververst de huidige locatie van de gebruiker.
 */
var updateGeolocation = function() {
	if (Ti.Geolocation.locationServicesEnabled) {
		Titanium.Geolocation.getCurrentPosition(function(e) {
	        if (e.error) {
	            Ti.API.error('Error: ' + e.error);
	        } else {
	            currentUserLocation = e.coords;
	        }
	    });
	} else {
		alert(Config.NoGeolocationMsg);
	}   
};

/**
 * Geeft de huidige locatie van de gebruiker als object.
 * 
 * @returns {Object} 
 * 		De huidige locatie van de gebruiker als object met lat/long.
 */
var getUserLocation = function() {
	if (!currentUserLocation) {
		updateGeolocation;
	}
	
	return currentUserLocation;
};

/**
 * Een wrapper om de orginele addAnnotation functie.
 * 
 * @param {Object} [data]
 * 		Het data object dat de gegevens bevat van de annotatie.
 * 
 * @param {string} [icon]
 * 		Een string die de locatie van het icoontje dat de annotatie moet 
 * 		gebruiken aangeeft.
 * 
 * @param {string} [subtitle]
 * 		De ondertitel van de annotatie.
 */
var addAnnotation = function(data, icon, subtitle) {
	var newAnnotation;
	
	// Check of de minimaal benodigde data om een annotatie te maken bestaat.
	if (!(data && data.LAT && data.LON && data.title)) {
		return;
	}
	
	newAnnotation = Titanium.Map.createAnnotation({
		animate:	true,
		
		dataToPass: data,
		
		latitude: 	data.LAT,
		longitude: 	data.LON,
		
		title:		data.title,
		subtitle: 	subtitle,
		
		pincolor:	Titanium.Map.ANNOTATION_GREEN,
		image: 		icon,
		
		rightButton: Titanium.Platform.osname === 'android' ? 
			Config.AndroidrightButton : Titanium.UI.iPhone.SystemButton.DISCLOSURE
	});
	
	mapView.addAnnotation(newAnnotation);
};

/**
 *	Alle annotations toevoegen aan de map uit de meegegeven array en met de 
 * 		juiste iconen (Gemaakt voor de bruggen)
 * 	@param {array} [dataArray]
 * 		De array aan data dat dient te worden toegevoegd
 * 
 * 	@param {string} [iconGreen]
 * 		Het incoontje dat gebruikt dient te worden wanneer we er onderdoor
 * 			te kunnen.
 * 	@param {string} [iconRed]
 * 		Het incoontje dat gebruikt dient te worden wanneer we er NIET onderdoor
 * 			kunnen.
 */
var annotationsArray = function(dataArray, iconGreen, iconRed){
	// Kijken of er een hoogte ingeven is
	var height = parseFloat(Titanium.App.Properties.getString('height', null));
	// Loop door alle data
	for(var i = 0; i < dataArray.length; i++)
	{
		// Subtitel opbouwen uit de hoogte en breedte
		var subtitle = Config.AnnotationSubHeight + dataArray[i].HEIGTH + '\t' 
				+ Config.AnnotationSubWidth + dataArray[i].WIDTH;
		// Kijken of we er onderdoor kunnen
		if(!height || dataArray[i].HEIGTH > height ) {
			addAnnotation(dataArray[i], iconGreen, subtitle );
		}
		// en anders
		else{
			addAnnotation(dataArray[i], iconRed, subtitle );
		}
	}
};

/**
 * 	De onderstaande functie zal annotaions toevoegen op de kaart om zo een trail
 * 		te maken.
 * 	Indien er al x aantal annotaions op de kaart staan zal hij de als eerste
 * 		toegevoegde annotation weghalen.
 * 
 * 	@param {int} [plaats] 
 * 		De postite om op te beginnen met loggen	
 */
var trailers = [];
function showTrail(plaats){
	// Controle of we niet al teveel annotaions op de kaart hebben
	// Als we al we te veel hebben zetten we de pointer op 0 (en dan opnieuw eroverheen)
	if(plaats > Config.AmountOfTrail) { plaats = 0; }
	
	// Kijken of we een positie kunnen krijg
	if(Titanium.Geolocation.getLocationServicesEnabled()){
		updateGeolocation();
		var location = getUserLocation();
		//for(naam in location) { Titanium.API.warn(naam); }
		//Titanium.API.warn(location.speed);
		if(location && location.speed)
		{
			// Kijken of we bewegen
			if(location.speed > 0){		
				// Indien dan zal er een nieuwe annotaion gemaakt worden maar eerst zullen we een oude annotation verwijderen
				if(trailers[plaats])
				{
					mapView.removeAnnotation(trailers[plaats]);
				}
				// Darna maken we een nieuw annotion aan op deze lokatie in de array
				trailers[plaats] = Titanium.Map.createAnnotation({
					latitude:	location.latitude,
					longitude:	location.longitude,
					title:		'',
					opacity: 	1,
					duration: 	3000,
					image: '/images/trailstip.png'
				});
				// Daarna deze annotatie toeveogen aan de kaart					
				mapView.addAnnotation(trailers[plaats]);			
			}
		}
	}
	// Toevoegen en verwijderen is klaar
	// Functie opnieuw aanroepen na een timout (en pointer met 1 verhogen)
	setTimeout(function(){
 		showTrail(plaats + 1)}, Config.TrailerTimeout);
}

// Maak een aantal functies van de module publiek beschikbaar.
exports.setMapView = 		setMapView;
exports.setLocation = 		setLocation;
exports.updateGeolocation = updateGeolocation;
exports.getUserLocation = 	getUserLocation;
exports.addAnnotation =		addAnnotation;
exports.annotationsArray = 	annotationsArray;
exports.showTrail = 		showTrail;
