var Config = require('Config');

// Locale variabelen.
var currentUserLocation
  , mapView
  , annotationsCount
  , annotationsArray = [];

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
var makeAnnotation = function(data, icon, subtitle) {
	var newAnnotation;
	
	// Check of de minimaal benodigde data om een annotatie te maken bestaat.
	if (!(data && data.LAT && data.LON && data.title)) {
		return;
	}
	
	return Titanium.Map.createAnnotation({
		animate:	false,
		
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
};

/**
 * Vergelijkt twee annotations met elkaar en returned boolean true als ze 
 * exact dezelfde zijn.
 * 
 * @param {object} [a]
 * 		Een annotation object om mee te vergelijken.
 * 
 * @param {object} [b]
 * 		Een annotation object om mee te vergelijken.
 * 
 * @return {bool}
 * 		True als A en B gelijk zijn, anders false.
 */
var isAnnotationEqual = function(a, b) {
	if (a && b && a.dataToPass && b.dataToPass && a.dataToPass.ID && a.dataToPass.TYPE) {
		return (a.dataToPass.ID === back.dataToPass.ID && a.dataToPass.TYPE === b.dataToPass.TYPE);
	} else if (a && b && a.ID && a.TYPE) {
		return (a.ID === b.ID && a.TYPE === b.TYPE);
	} 
	
	return false;
};

var getDistinctSet = function(a, b) {
	var source,
		dest,
		destLength;
		
	if (a.length > b.length) {
		source = b;
		dest   = a;
	} else {
		source = a;
		dest   = b;
	}
	
	destLength = dest.length;
	
	for (var i = 0; i < source.length; i++) {
		for (var j = 0; j < destLength; j++) {
			
		}
	}
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
 *	Een methode die de te tonen annotaties gaat filteren op afstand
 * 	
 * 	@param {Array} [annotationsData] 
 * 		An array contatianing the needed annotations
 * 	@param {Object} [region]
 * 		Een map regio waar we ons nu bevinden
 * 	@param {string} [iconGreen] 
 * 		Link naar de afbeelding die we moeten inladen bij normale weergave of 
 * 			wanneer we er wel onderdoor kunnen
 * 	@param {string} [iconRed]
 * 		Link naar de afbeelding die we moeten inladen wanneer we er niet onderdoor kunne
 */
var filterAnnotations = function(annotationsData, region, iconGreen, iconRed){
	// Controleren of we een regio meegekregen hebben
	if(!region || !annotationsData || !iconGreen) {
		Titanium.API.error('Meegegeven data komt niet overeen. Error vanuit filterAnnotations functie!');
		return;
	}
	// Kijken of we niet al te ver uitgezoomed zijn
	if((region.latitudeDelta > 0.1 && region.longitudeDelta  > 0.05 ) || 
		(region.longitudeDelta > 0.1 && region.latitudeDelta > 0.05)){
		// indien dan alle punten verwijderen 
		mapView.removeAllAnnotations();
		// en einde functie
		return;
	}
	
	/*
	 * REGION EIGENSCHAPPEN
	 *
	 * Properties:
	 *	latitude : Number
	 *		Latitude value for the center point of the map, in decimal degrees.
	 *	latitudeDelta : Number
	 *		The amount of north-to-south distance displayed on the map, measured in decimal degrees.
	 *	longitude : Number
	 *		Longitude value for the center point of the map, in decimal degrees.
	 *	longitudeDelta : Number
	 *		The amount of east-to-west distance displayed on the map, measured in decimal degrees.
	 */
	
	// Maak twee variabelen die we nodig hebben aan
	var toAddAnnotations = 	[];
	var counter = 			0;
	// Opgeslagen hoogte inlezen
	var height = parseFloat(Titanium.App.Properties.getString('height', null));
	// Coordinaten berekenen (lat en long worden vanuit het midden meegegeven)
	// De boven waarden
	var top	=		region.latitude - (region.latitudeDelta / 2);
	var bottom = 	region.latitude + (region.latitudeDelta / 2);
	// En de onder waarden
	var left = 		region.longitude - (region.longitudeDelta / 2);
	var right = 	region.longitude + (region.longitudeDelta / 2);
	
	Titanium.API.warn('top: ' + top + ' Bottom: ' + bottom + ' left: ' + left + ' right: ' +  right);
	// Kijken welke we dienen toe te voegen aan de array
	for(var i = 0; i < annotationsData.length; i++){
		// Kijken of het binnen ons bereik ligt
		if(annotationsData[i].LAT > top && annotationsData[i].LAT < bottom && 
			annotationsData[i].LON > left && annotationsData[i].LON < right){
			// indoen we voldoen het onderschrift maken
			var subtitle = '';
			if(annotationsData[i].HEIGHT){
				subtitle += Config.AnnotationSubHeight + annotationsData[i].HEIGHT + '\t';
			}
			if(annotationsData[i].WIDTH){
				subtitle += Config.AnnotationSubWidth + annotationsData[i].WIDTH;
			}
			
			var icon = (annotationsData[i].HEIGHT && height && iconRed && annotationsData[i].HEIGHT < height) ?
								iconRed : iconGreen;
			// Maak een annotatie (Hij valt binnen de waarden dus zou op de kaart moeten komen)
			toAddAnnotations[counter] = makeAnnotation(annotationsData[i], icon, subtitle);
			
			// 1 aangemaakt teller verhogen
			counter++;
		}	// Bereik controle
	}
	
	// Kijken hoeveel we er nu hebben
	//annotationsCount = counter + annotationsCount;
	
	// Indien dit meer is dan toegestaan de kaart leeg gooien
	//if(annotationsCount > Config.maxAnnotations){
	//	// Punten verwijderen
	//	removeAnnotations(annotationsArray);
	//	// En de counter opnieuw instellen
	//	annotationsArray = [];
	//	annotationsCount = counter;
	//}
	// For testing :D
	//removeAnnotations(annotationsArray);
	mapView.removeAllAnnotations();
	
	Titanium.API.warn('Aantal: ' + counter + ' uit de mogelijke ' + annotationsData.length);
	// Voeg alle annotaties toe aan de kaart
	annotationsArray = toAddAnnotations;
	mapView.addAnnotations(toAddAnnotations);
	mapView.addAnnotations(trailers);
};

var concat = function(destination, source){
	for(var i = 0; i < source.length; i++){
		destination[destination.length] = source[i];
	}
	return destination
};

var removeAnnotations = function(toRemove){
	Titanium.API.warn('Annotaties op de kaart: ' + toRemove.length);
	for(var i = 0; i < toRemove.length; i++){
		mapView.removeAnnotation(toRemove[i]);
	}
	annotationsArray = [];
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
		
		// Locatie updaten
		updateGeolocation();
		
		// En uitlezen
		var location = getUserLocation();
		
		// Kijken of dit iets terug gaf en of we bewegen
		if(location && location.speed && location.speed > 0)
		{		
			
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
exports.makeAnnotation =	makeAnnotation;
exports.annotationsArray = 	annotationsArray;
exports.showTrail = 		showTrail;
exports.filterAnnotations = filterAnnotations;
//exports.removeAnnotations = removeAnnotations;
