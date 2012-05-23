var Config = {

	/*
	 * Data bestanden
	 */
	DataToLoad: {
		'bruggen' : 'Data/Bruggen.json'
	},

	/*
	 * Text opties
	 */
	
	// Titels van de tab knoppen.
	MapTabTitle: 	  'Kaart',
	ListTabTitle:	  'Lijst',
	SettingsTabTitle: 'Opties',
	
	// Placeholder text van de zoekbalkjes
	SearchBarText:	'Zoek',
	
	// De reden die de app weergeeft als de app gaat proberen de gps functie
	// in te schakelen.
	GeolocationIntent: 'GPS moet aan staan om de locatie te kunnen bepalen',
	NoGeolocationMsg:  'Kon de huidige locatie niet bepalen, GPS is niet beschikbaar',
	
	// Voor de subtitel van een annotation
	AnnotationSubHeight: 	'h: ',
	AnnotationSubWidth:		'w: ',
	
	// Settings view:
	// Sectie afmetingen van de boot: 
	DimensionHeader: 'Boot eigenschappen',
	
	// Alle eigenschappen vna de hoogte 
	ShowHeight:		 true,
	HeightText:		 'Hoogte(m):',
	HeightHintText:  'Hoogte',
	
	// Alle eigenschappen van de breedte
	ShowWidth:		 true,		 
	WidthText:		 'Breedte(m):',
	WidthHintText:   'Breedte',
	
	// Sectie kaart type
	MapTypeHeader:   'Kaart eigenschappen',
	
	MapSateliteText: 'Satelliet',
	MapStandardText: 'Kaart',
	MapHybridText:	 'Hybride',
	
	DataUsageHeader: 'Datagebruik:',
	LoadPicturesText: 'Internet afbeeldingen laden',
	
	
	/*
	 * Icoontjes / button / plaatjes
	 */
	MapTabIcon:	 	 '/images/map.png',
	ListTabIcon: 	 '/images/list.png',
	SettingsTabIcon: '/images/settings.png',
	
	// Icoontje voor op de kaart (brug hier)
	BridgeGreenIcon: 	'/images/BrugGroen.png',
	BridgeRedIcon: 		'/images/BrugRood.png',
	
	// Trailing lijn
	TraillingLineIcon: 	'/images/trailstip.png',
	
	// Icoontje voor de locatie van de gebruiker
	UserLocateIcon:  '/images/location.png',
	
	// Android icoontje voor 'ga naar details' op de map annotations
	AndroidrightButton: '/images/rightbutton.png',
	
	
	/*
	 * Kleuren opties
	 */
	
	// Achtergrond kleur van alle views
	ViewBackgroundColor:   '#EEEEEE',
	
	// Achtergrond kleur van de zoekbalkjes
	SearchBackgroundColor: '#000000',
	
	// Text kleur
	TextColor: 	'#000000',
		/*	- - - - - - - - - - 
	 * 	   DETAIL
	 *	- - - - - - - - - -
	 */ 
	 // Text weer te geven als er geen foto is
	 NoPictureDetail: 'Geen foto beschikbaar',
	 // 
	 PictureOffDetail: 'Het laden van afbeeldingen is uitgeschakeld, schakel deze in bij de instellingen.',
	 //detailview eigenschappen
	 HeigthDetail : "Hoogte: ",
	 WidthDetail : "Breedte: ",
	 TypeDetail : "Type: ",
	 AdressDetail : "Adres: ",
	 UnitDetail : " Meter",
	 //titel van de toon op kaart knop
	 ShowOnMapDetail : "Toon op kaart",
	 
	/*
	 * Overige instellingen
	 */
	
	
	// De regio waar de app op terugvalt als het de locatie van de gebruiker
	// niet gevonden kan worden. In dit geval een overzicht van Friesland.
	DefaultRegion: {
		latitude:  		53.1337,
		longitude: 		5.85,
		latitudeDelta:	0.9, 
		longitudeDelta:	0.9
	},
	
	// De hoeveelheid zoom uitgedrukt in deltaX dat de kaart inzoomt als er op
	// de button voor de positie van de gebruiker word gedrukt.
	DefaultUserLocZoom: 0.005,
	
	// Instellingen voor de trail achter de persoon aan
	TrailerTimeout: 1000, // 1 seconde
	// Aantal stipjes trail op de kaart
	AmountOfTrail: 10,
	
	// De maximale hoeveelheid annotaties die we kunnen toevoegen
	maxAnnotations: 20,
	
	OrientationModes: [ 
		Titanium.UI.PORTRAIT,
		Titanium.UI.UPSIDE_PORTRAIT,
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT
	]
};

module.exports = Config;