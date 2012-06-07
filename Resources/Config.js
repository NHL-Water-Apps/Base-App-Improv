var Config = {

	/*
	 * Data bestanden
	 * 
	 * GEEN .JS extensie toevoegen aan het pad.
	 */
	DataToLoad: {
		'bruggen' : 'Data/Bruggen.lwd',
		'jachthavens' : 'Data/Jachthavens.lwd',
		'ligplaatsen' : 'Data/Ligplaatsen.lwd'
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
	AnnotationSubHeight: 	'H: ',
	AnnotationSubWidth:		'B: ',
	AnnotationUnit:			' m',
	
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
	
	// Text voor de verschillende types kaart
	MapSateliteText: 'Satelliet',
	MapStandardText: 'Kaart',
	MapHybridText:	 'Hybride',
	
	// Text voor het data gebruik
	DataUsageHeader: 'Datagebruik:',
	LoadPicturesText: 'Afbeeldingen laden',
	
	// Data opties weergeven
	DataOptions: 	 true,
	
	// voor het detailscherm

	// Text weer te geven als er geen foto is
	NoPictureDetail: 'Geen foto beschikbaar',
	// Text weer te geven als het laden van foto's is uitgeschakeld
	PictureOffDetail: 'Het laden van afbeeldingen is uitgeschakeld, schakel deze in bij de instellingen.',
	
	// Text voor als er geen coordinaten gevonden zijn
	//		bij het klikken op de knop
	LatLonNotFound : "Geen coordinaten gevonden..",
	
	/*
	 * Icoontjes / button / plaatjes
	 */
	MapTabIcon:	 	 '/images/map.png',
	ListTabIcon: 	 '/images/list.png',
	SettingsTabIcon: '/images/settings.png',
	
	// Icoontje voor op de kaart (brug hier)
	BridgeGreenIcon: 	'/images/BrugGroen.png',
	BridgeRedIcon: 		'/images/BrugRood.png',
	
	AanlegPlaatsIcon:   '/images/Aanleg.png',
	JachtHavenIcon:		'/images/Aanlegstijger.png',
	
	
	// Trailing lijn
	TraillingLineIcon: 	'/images/trailstip.png',
	
	// Icoontje voor de locatie van de gebruiker
	UserLocateIcon:  	'/images/location.png',
	
	// Android icoontje voor 'ga naar details' op de map annotations
	AndroidrightButton: '/images/rightbutton.png',
	
	//icoontje voor 'ga naar de kaart' in het detailscherm
	ShowOnMap:			'/images/ToonOpKaart.png',
	ShowOnMapGroter:	'/images/ToonOpKaart@2x.png',
	ShowOnMapText:		'Toon op kaart',
	
	/*
	 * Kleuren opties
	 */
	
	// Achtergrond kleur van alle views
	ViewBackgroundColor:   '#f9f9f9',
	
	// Achtergrond kleur van de zoekbalkjes
	SearchBackgroundColor: '#000000',
	
	// Text kleur
	TextColor: 			'#000000',
	TextColorIPhone: 	'#000000',


	/*	- - - - - - - - - - 
	 * 	   DETAIL
	 *	- - - - - - - - - -
	 */ 

	 // Text weer te geven als er geen foto is
	 NoPictureDetail: 'Geen foto beschikbaar',
	 // 
	 PictureOffDetail: 'Het laden van afbeeldingen is uitgeschakeld, schakel deze in bij de instellingen.',
	 //detailview eigenschappen
	 HeigthDetail : 	"Hoogte:	  ",
	 WidthDetail : 		"Breedte:  ",
	 TypeDetail : 		"Type:	      ",
	 AdressDetail : 	"Adres:      ",
	 UnitDetail: 		" m",
 	 SquareUnitDetail:  " m²",
	 BronDetail: 		"Bron: 		  ",
	 ZipcodeDetail: 	"Postcode:    ",
	 CityDetail:   		"Stad: 		  ",
	 SizeDetail: 		"Oppervlakte: ",
	 CodeDetail:		"Code:       ",
	 BrugDetail:		"Brug",
	 JachthavenDetail:	"Jachthaven",
	 LigplaatsenDetail:	"Ligplaats",
	 //titel van de toon op kaart knop
	 LatLonNotFound : "Geen coordinaten gevonden..",

	 
	/*
	 * Overige instellingen
	 */
	
	
	// De regio waar de app op terugvalt als het de locatie van de gebruiker
	// niet gevonden kan worden. In dit geval een overzicht van Friesland.
	DefaultRegion: {
		latitude:  		53.20239,
		longitude: 		5.814075,
		latitudeDelta:	0.05, 
		longitudeDelta:	0.05
	},
	
	// De hoeveelheid zoom uitgedrukt in deltaX dat de kaart inzoomt als er op
	// de button voor de positie van de gebruiker word gedrukt.
	DefaultUserLocZoom: 0.005,
	
	// Bool value die aangeeft of deze app trail moet laden of niet
	ShowTrail:		true,
	// Instellingen voor de trail achter de persoon aan (in miliseconden)
	TrailerTimeout: 1000, // 1 seconde	
	
	// Minimale hoogte voor annotaties
	regionDeltaHorizontal:	0.1,
	regionDeltaVertical: 	0.05,
	
	
	// De verschillende orientaties modes aan elk window meegeven
	OrientationModes: [ 
		Titanium.UI.PORTRAIT,
		Titanium.UI.UPSIDE_PORTRAIT,
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT
	]
};

module.exports = Config;