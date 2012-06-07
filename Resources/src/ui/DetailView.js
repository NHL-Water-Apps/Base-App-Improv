(function () {
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
		
		// Wanneer er een foto beschikbaar is deze weergeven in een imageview
		ImageView : 	Ti.UI.createImageView({
			image:				'',
			height: 			'auto',
			width: 				'80%',
			top:				'2%'
		}),
		
		// Wanneer er geen foto beschikbaar is komt er een tekst te staan
		NoImage : Titanium.UI.createLabel({
			text : 			"",
			textAlign : 	"left",
			left: 			'3%',
			width : 		'auto',
			heigth : 		'auto',
			color:			VwApp.Config.TextColor
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
		
		// Hieronder staan de eigenschappen van de data
		Type : Titanium.UI.createLabel({
			text : 			"",
			textAlign : 	"left",
			left: 			'3 %',
			width : 		'auto',
			heigth : 		'auto',
			//top:			'2%',
			color:			VwApp.Config.TextColor
		}),
		
		// data hoogte label
		Hoogte : Titanium.UI.createLabel({
			text : 			"",
			textAlign : 	"left",
			left: 			'3 %',
			width : 		'auto',
			heigth : 		'auto',
			color:			VwApp.Config.TextColor
		}),
		
		// data breedte label
		Breedte : Titanium.UI.createLabel({
			text : 			"",
			textAlign : 	"left",
			left: 			'3 %',
			width : 		'auto',
			heigth : 		'auto',
			color:			VwApp.Config.TextColor
		}),
		
		// data bron label
		Bron : 	Titanium.UI.createLabel({
			text : 			"",
			textAlign : 	"left",
			left: 			'3 %',
			width : 		'auto',
			heigth : 		'auto',
			color:			VwApp.Config.TextColor
		}),
		
		// data adres label
		Adres : Titanium.UI.createLabel({
			text : 			"",
			textAlign : 	"left",
			left: 			'3 %',
			width : 		'auto',
			heigth : 		'auto',
			color:			VwApp.Config.TextColor
		}),
		
		// data postcode label
		Postcode : 	Titanium.UI.createLabel({
			text : 			"",
			textAlign : 	"left",
			left: 			'3 %',
			width : 		'auto',
			heigth : 		'auto',
			color:			VwApp.Config.TextColor
		}),
		
		// data stad label
		Stad : 	Titanium.UI.createLabel({
			text : 			"",
			textAlign : 	"left",
			left: 			'3 %',
			width : 		'auto',
			heigth : 		'auto',
			color:			VwApp.Config.TextColor
		}),
		
		// data oppervlakte label
		Oppervlakte : 	Titanium.UI.createLabel({
			text : 			"",
			textAlign : 	"left",
			left: 			'3 %',
			width : 		'auto',
			heigth : 		'auto',
			color:			VwApp.Config.TextColor
		}),
		
		// data code(term) label
		Code : 	Titanium.UI.createLabel({
			text : 			"",
			textAlign : 	"left",
			left: 			'3 %',
			width : 		'auto',
			heigth : 		'auto',
			color:			VwApp.Config.TextColor
		}),
			
		// de button om de brug op de kaart te tonen
		Toonkaart : Titanium.UI.createButton({
			top: 			40, 
			title:			Titanium.Platform.osname !== 'android' ? 'Toon op kaart' : '',
			image:			Titanium.Platform.osname === 'android' ? (Titanium.Platform.displayCaps.platformHeight > 700 ? 
								VwApp.Config.ShowOnMapGroter : VwApp.Config.ShowOnMap ) : '',
			height:			Titanium.Platform.osname !== 'android' ? 40 : 'auto',
			width:			Titanium.Platform.osname !== 'android' ? 120 : 'auto',
			position: 		'center',
	
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
		
		// image hoogte is 0%, dus niet zichtbaar
		DetailWindow.ImageView.height = '0%';
		
		
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
		if (data.TYPE == 'jachthavens') {
			DetailWindow.TypeData.setText(VwApp.Config.JachthavenDetail);
		} else if (data.TYPE == 'bruggen'){
			DetailWindow.TypeData.setText(VwApp.Config.BrugDetail);
		} else if (data.TYPE == 'ligplaatsen') {
			DetailWindow.TypeData.setText(VwApp.Config.LigplaatsenDetail);
		}
		

		// het weergeven van een afbeelding, of tekst wanneer er geen afbeelding beschikbaar is
		if (data.TYPE == 'ligplaatsen' || data.TYPE == 'bruggen') {
			// kijken of er een foto beschikbaar is en of het laten zien van foto's aangevinkt is in de settings.
			if (data.PICTURE && Titanium.App.Properties.getBool('laadData', true)) {
				// foto tonen voor bruggen
				if (data.TYPE == 'bruggen') {
					DetailWindow.ImageView.setImage(ChangeBridgeLink(data.PICTURE));
				}
				// foto tonen voor ligplaatsen
				if (data.TYPE == 'ligplaatsen') {
						DetailWindow.ImageView.setImage(ChangeMoorageLink(data.PICTURE));
				}
				// imagehoogte op automatisch zetten, en de tekst(wanneer er geen foto zou zijn) leeg maken
				DetailWindow.ImageView.height = 'auto';
				DetailWindow.NoImage.setText("");
			} else { 
				// else, in het geval wanneer er geen foto beschikbaar is
				 
				DetailWindow.NoImage.height = 'auto';
				// wanneer foto's laden ingeschakeld is en er is geen foto beschikbaar toon de tekst dat er geen foto beschikbaar is
				if (Titanium.App.Properties.getBool('laadData', true)) {     
					DetailWindow.NoImage.setText(VwApp.Config.NoPictureDetail);
				}	
				// als het laden van foto's uitgeschakeld is geef hierover een melding
				else {
					DetailWindow.NoImage.setText(VwApp.Config.PictureOffDetail);
				}
			}
			
			 
		}
		
		// het tonen van het adres, geldt alleen voor bepaalde types
		if (data.TYPE == 'jachthavens' || data.TYPE == 'bruggen') {
			DetailWindow.Adres.height = ('auto');
			
			if (data.ADRESS) {
				DetailWindow.Adres.setText(VwApp.Config.AdressDetail + data.ADRESS);
			} else {
				DetailWindow.Adres.setText(VwApp.Config.AdressDetail + "-");
			}
			
		}
	
		if (data.TYPE == 'bruggen') {
			
			//het tonen van de labels Hoogte, Breedte, Type en de bron van de data
			DetailWindow.Hoogte.height = 'auto';
			DetailWindow.Breedte.height = 'auto';
			DetailWindow.Type.height = 'auto';
			DetailWindow.Bron.height = 'auto';
			
			// de tekst van de hoogte veranderen
			if (data.HEIGHT || data.HEIGHT == 0) {
				DetailWindow.Hoogte.setText(VwApp.Config.HeigthDetail + data.HEIGHT + VwApp.Config.UnitDetail);
			} else {
				DetailWindow.Hoogte.setText(VwApp.Config.HeigthDetail + "-");
			}
			
			// de tekst van de breedte veranderen
			if (data.WIDTH || data.WIDTH == 0) {
				DetailWindow.Breedte.setText(VwApp.Config.WidthDetail + data.WIDTH + VwApp.Config.UnitDetail);
			} else {
				DetailWindow.Breedte.setText(VwApp.Config.WidthDetail +"-");
			}
			
			// de tekst van het brugtype veranderen
			if (data.BRIDGETYPE) {
				DetailWindow.Type.setText(VwApp.Config.TypeDetail + data.BRIDGETYPE);
			} else {
				DetailWindow.Type.setText(VwApp.Config.TypeDetail + "-");
			}
			
			// de tekst van het de bron veranderen
			if (data.SOURCE) {
				DetailWindow.Bron.setText(VwApp.Config.BronDetail + data.SOURCE);
			} else {
				DetailWindow.Bron.setText(VwApp.Config.BronDetail + "-");
			}
			
		}
		
		if (data.TYPE == 'jachthavens') {	
			
			// de labels van postcode, stad en oppervlakte in beeld brengen
			DetailWindow.Postcode.height = 'auto';
			DetailWindow.Stad.height = 'auto';
			DetailWindow.Oppervlakte.height = 'auto';
			
			// postcode tekst veranderen
			if (data.ZIPCODE) {
				DetailWindow.Postcode.setText(VwApp.Config.ZipcodeDetail + data.ZIPCODE);
			} else {
				DetailWindow.Postcode.setText(VwApp.Config.ZipcodeDetail + "-");
			}
			
			// de tekst van de stad veranderen
			if (data.CITY) {
				DetailWindow.Stad.setText(VwApp.Config.CityDetail + data.CITY);
			} else {
				DetailWindow.Stad.setText(VwApp.Config.CityDetail + "-");
			}
			
			// de tekst van het label oppervlakte veranderen
			if (data.SIZE) { 
				DetailWindow.Oppervlakte.setText(VwApp.Config.SizeDetail + data.SIZE + VwApp.Config.SquareUnitDetail);
			} else {
				DetailWindow.Oppervlakte.setText(VwApp.Config.SizeDetail + "-");
			}
		}
		
		if (data.TYPE == 'ligplaatsen') {
			
			// de labels type en code weergeven
			DetailWindow.Type.height = 'auto';
			DetailWindow.Code.height = 'auto';
			
			// het veranderen van de tekst van het label type
			if (data.MOORAGETYPE) { 
				DetailWindow.Type.setText(VwApp.Config.TypeDetail + data.MOORAGETYPE);
			} else {
				DetailWindow.Type.setText(VwApp.Config.TypeDetail + "-");
			}
			// het veranderen van de tekst van het label code
			if (data.CODE) {
				DetailWindow.Code.setText(VwApp.Config.CodeDetail + data.CODE);
			} else {
				DetailWindow.Code.setText(VwApp.Config.CodeDetail + "-");
			}
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
	
	/**
	 * De onnodige info van de link afhalen zodat deze in te laden is als image, toe te passen op de bruglinks
 	 * 
 	 * @param {string} [link]
 	 * 		Een link naar een afbeelding	
	 */
	function ChangeBridgeLink(link) {
		// inladen van de oude link
		var oldlink = link;
		
		// link die ontstaat uit de oude link  
		var newlink = ""; 
		
		//integer om het aantal '/' te tellen 
		var slash = 0;    
		
		// de oude link doorlopen, karakter voor karakter
		for (var i = 0; i < oldlink.length; i++) {
			
			// wanneer en een ',' voorkomt, stoppen met het maken van de nieuwe link
			if (oldlink[i] == ',')  
				return newlink;

			// het aantal '/' tellen
			if (oldlink[i] == '/') {  
				newlink = newlink + oldlink[i];
				slash++;
			}
			// bij de 6de slash
			if (slash == 6) { 
				slash++;
				
				// alles er tussenuithalen tot er een '=' komt
				while (oldlink[i] != '=') { 
					i++;
				}
			}
			// else de nieuwe link maken
			if (oldlink[i] != ',' && oldlink[i] != '/' && oldlink[i] != '=' && oldlink[i] != undefined) {
				newlink = newlink + oldlink[i];
			}
				
		}
	}
	
	/**
	 * Een functie die de link naar een marrekrite aanlegplaats
	 * 		klaarmaakt voor gebruik
	 * 
 	 * @param {Object} [oldlink]
 	 * 		De link naar de afbeelding zoals deze voorkomt in de annotaties data
 	 *		 
	 */
	function ChangeMoorageLink(oldlink) {
		
		// link die ontstaat uit de oude link
		var newlink = "";
		
		// integer om het aantal '/' te tellen
		var slash = 0;    	
		
		// de oude link doorlopen, karakter voor karakter
		for (var i = 0; i < oldlink.length; i++) {				
			if (oldlink[i] == '/') {
				slash++
			}
			
			// bij de 7de slash 
			if (slash == 7) {  				
				// stukje toevoegen aan de nieuwe link
				newlink = newlink + "/foto_marrekrite/";
				// de laatste 5 karakters plakken aan de nieuwe link
				for (var n = oldlink.length - 5; n < oldlink.length; n++) {				
					newlink = newlink + oldlink[n];
				}
				// fotonummer toevoegen aan de link, in dit geval altijd 1
				newlink = newlink + "_1.jpg";
				return newlink;
			}
			// newlink maken uit de oude link
			newlink = newlink + oldlink[i];				
		}
	 	
	}
	
	// wanneer er geklikt wordt op de button setlocation op map en open de map, mits lat en lon aanwezig
	DetailWindow.Toonkaart.addEventListener('click', function() {   
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
	DetailWindow.Container.add(DetailWindow.ImageView);
	DetailWindow.Container.add(DetailWindow.NoImage);
	DetailWindow.Container.add(DetailWindow.Type);	
	DetailWindow.Container.add(DetailWindow.Adres);
	DetailWindow.Container.add(DetailWindow.Stad);
	DetailWindow.Container.add(DetailWindow.Postcode);
	DetailWindow.Container.add(DetailWindow.Hoogte);
	DetailWindow.Container.add(DetailWindow.Breedte);
	DetailWindow.Container.add(DetailWindow.Oppervlakte);
	DetailWindow.Container.add(DetailWindow.Code);
	DetailWindow.Container.add(DetailWindow.Bron);
	// toonkaart hier pas toevoegen, anders komt deze bovenaan te staan
	DetailWindow.Container.add(DetailWindow.Toonkaart); 

	// scrollview met de labels toevoegen aan de window
	DetailWindow.window.add(DetailWindow.Container);
	
	
	VwApp.UI.DetailWindow = DetailWindow;
	VwApp.UI.changeDetailView = ChangeValue;
})();
