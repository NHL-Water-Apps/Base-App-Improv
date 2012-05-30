(function () {
	//Detailwindow en zijn elementen
	var DetailWindow = {
		window: Titanium.UI.createWindow({
			top: 			0,
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
		
		//wanneer er een foto beschikbaar is deze weergeven in een imageview
		Imagebridge : 	Ti.UI.createImageView({
			image:				'',
			height: 			'auto',
			width: 				'80%',
			top: 				'2%',
			bottom:				'5%'
		}),
		
		// Wanneer er geen foto beschikbaar is komt er een tekst te staan
		NoImagebridge : Titanium.UI.createLabel({
			text : 			"",
			textAlign : 	"left",
			left: 			'3 %',
			bottom: 		'5%', 
			width : 		'auto',
			heigth : 		'auto',
			color:			VwApp.Config.TextColor
		}),
		
		//Type van de data
		TypeData : Titanium.UI.createLabel({
			text : 			"",
			textAlign : 	"left",
			left: 			'3 %',
			width : 		'auto',
			heigth : 		13,
			top:			'2%',
			color:			VwApp.Config.TextColor
		}),
		
		//Hieronder staan de eigenschappen van de data
		Type : Titanium.UI.createLabel({
			text : 			"",
			textAlign : 	"left",
			left: 			'3 %',
			width : 		'auto',
			heigth : 		'auto',
			color:			VwApp.Config.TextColor
		}),
		
		Hoogte : Titanium.UI.createLabel({
			text : 			"",
			textAlign : 	"left",
			left: 			'3 %',
			width : 		'auto',
			heigth : 		'auto',
			color:			VwApp.Config.TextColor
		}),
		
		Breedte : Titanium.UI.createLabel({
			text : 			"",
			textAlign : 	"left",
			left: 			'3 %',
			width : 		'auto',
			heigth : 		'auto',
			color:			VwApp.Config.TextColor
		}),
		
		Bron : 	Titanium.UI.createLabel({
			text : 			"",
			textAlign : 	"left",
			left: 			'3 %',
			width : 		'auto',
			heigth : 		'auto',
			color:			VwApp.Config.TextColor
		}),
		
		Adres : Titanium.UI.createLabel({
			text : 			"",
			textAlign : 	"left",
			left: 			'3 %',
			width : 		'auto',
			heigth : 		'auto',
			color:			VwApp.Config.TextColor
		}),
		
		Postcode : 	Titanium.UI.createLabel({
			text : 			"",
			textAlign : 	"left",
			left: 			'3 %',
			width : 		'auto',
			heigth : 		'auto',
			color:			VwApp.Config.TextColor
		}),
		
		Stad : 	Titanium.UI.createLabel({
			text : 			"",
			textAlign : 	"left",
			left: 			'3 %',
			width : 		'auto',
			heigth : 		'auto',
			color:			VwApp.Config.TextColor
		}),
		
		Oppervlakte : 	Titanium.UI.createLabel({
			text : 			"",
			textAlign : 	"left",
			left: 			'3 %',
			width : 		'auto',
			heigth : 		'auto',
			color:			VwApp.Config.TextColor
		}),
		
		Code : 	Titanium.UI.createLabel({
			text : 			"",
			textAlign : 	"left",
			left: 			'3 %',
			width : 		'auto',
			heigth : 		'auto',
			color:			VwApp.Config.TextColor
		}),
			
		//de button om de brug op de kaart te tonen
		Toonkaart : Titanium.UI.createButton({
			top: 			60, 
			image:			VwApp.Config.ShowOnMap,
			position: 		'center'
		})	
	};
	
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
		// title
		if (data.title) {
			DetailWindow.window.setTitle(data.title);
		} else {
			DetailWindow.window.setTitle("-");
		}

		//het type data bovenaan zetten
		if(data.TYPE == 'jachthavens') {
			DetailWindow.TypeData.setText(VwApp.Config.JachthavenDetail);
		}
		
		if(data.TYPE == 'bruggen'){
			DetailWindow.TypeData.setText(VwApp.Config.BrugDetail);
		}
		if(data.TYPE == 'ligplaatsen') {
			DetailWindow.TypeData.setText(VwApp.Config.LigplaatsenDetail);
		}
		
		DetailWindow.Container.add(DetailWindow.NoImagebridge);

		//afbeelding
		if (data.TYPE == 'ligplaatsen' || data.TYPE == 'bruggen') {
			//kijken of er een foto beschikbaar is en of het laten zien van foto's aangevinkt is in de settings.
			if (data.PICTURE && Titanium.App.Properties.getBool('laadData', true)) {
				// foto tonen
				if (data.TYPE == 'bruggen') {
					DetailWindow.Imagebridge.setImage(ChangeBridgeLink(data.PICTURE));
				}
				
				if (data.TYPE == 'ligplaatsen') {
						DetailWindow.Imagebridge.setImage(ChangeMoorageLink(data.PICTURE));
				}

				DetailWindow.Imagebridge.setHeight('auto');
				DetailWindow.NoImagebridge.setText("");
			} else { 
				// geen foto beschikbaar
				 
				// wanneer foto's laden ingeschakeld is en er is geen foto beschikbaar toon de tekst dat er geen foto beschikbaar is
				if (Titanium.App.Properties.getBool('laadData', true)) {     
						DetailWindow.Imagebridge.setHeight('0%');  //image hoogte is 0%, dus niet zichtbaar
						DetailWindow.NoImagebridge.setText(VwApp.Config.NoPictureDetail);
				}	
				// als het laden van foto's uitgeschakeld is geef hierover een melding
				else {
					// image hoogte is 0%, dus niet zichtbaar
					DetailWindow.Imagebridge.setHeight('0%'); 
					DetailWindow.NoImagebridge.setText(VwApp.Config.PictureOffDetail);
				}
			}
			
			DetailWindow.Container.add(DetailWindow.Imagebridge);
			DetailWindow.Container.add(DetailWindow.NoImagebridge); 
		}
		
		// adres, geldt alleen voor bepaalde types
		if (data.TYPE == 'jachthavens' || data.TYPE == 'bruggen') {
			if (data.ADRESS) {
				DetailWindow.Adres.setText(VwApp.Config.AdressDetail + data.ADRESS);
			} else {
				DetailWindow.Adres.setText(VwApp.Config.AdressDetail + "-");
			}
			
			DetailWindow.Container.add(DetailWindow.Adres);
		}
	
		if (data.TYPE == 'bruggen') {
			// hoogte
			if (data.HEIGHT || data.HEIGHT == 0) {
				DetailWindow.Hoogte.setText(VwApp.Config.HeigthDetail + data.HEIGHT + VwApp.Config.UnitDetail);
			} else {
				DetailWindow.Hoogte.setText(VwApp.Config.HeigthDetail + "-");
			}
			
			// breedte
			if (data.WIDTH || data.WIDTH == 0) {
				DetailWindow.Breedte.setText(VwApp.Config.WidthDetail + data.WIDTH + VwApp.Config.UnitDetail);
			} else {
				DetailWindow.Breedte.setText(VwApp.Config.WidthDetail +"-");
			}
			
			// type
			if (data.BRIDGETYPE) {
				DetailWindow.Type.setText(VwApp.Config.TypeDetail + data.BRIDGETYPE);
			} else {
				DetailWindow.Type.setText(VwApp.Config.TypeDetail + "-");
			}
			
			// bron
			if (data.SOURCE) {
				DetailWindow.Type.setText(VwApp.Config.BronDetail + data.SOURCE);
			} else {
				DetailWindow.Type.setText(VwApp.Config.BronDetail + "-");
			}
			
			DetailWindow.Container.add(DetailWindow.Type);
			DetailWindow.Container.add(DetailWindow.Hoogte);
			DetailWindow.Container.add(DetailWindow.Breedte);
			DetailWindow.Container.add(DetailWindow.Bron);
		}
		
		if (data.TYPE == 'jachthavens') {	
			// postcode
			if(data.ZIPCODE) {
				DetailWindow.Postcode.setText(VwApp.Config.ZipcodeDetail + data.ZIPCODE);
			} else {
				DetailWindow.Postcode.setText(VwApp.Config.ZipcodeDetail + "-");
			}
			
			// stad
			if (data.CITY) {
				DetailWindow.Stad.setText(VwApp.Config.CityDetail + data.CITY);
			} else {
				DetailWindow.Stad.setText(VwApp.Config.CityDetail + "-");
			}
			
			// oppervlakte
			if (data.SIZE) { 
				DetailWindow.Oppervlakte.setText(VwApp.Config.SizeDetail + data.SIZE + VwApp.Config.SquareUnitDetail);
			} else {
				DetailWindow.Oppervlakte.setText(VwApp.Config.SizeDetail + "-");
			}
	
			DetailWindow.Container.add(DetailWindow.Stad);
			DetailWindow.Container.add(DetailWindow.Postcode);
			DetailWindow.Container.add(DetailWindow.Oppervlakte);
		}
		
		if (data.TYPE == 'ligplaatsen') {
			if (data.MOORAGETYPE) { 
				DetailWindow.Type.setText(VwApp.Config.TypeDetail + data.MOORAGETYPE);
			} else {
				DetailWindow.Type.setText(VwApp.Config.TypeDetail + "-");
			}
			
			if (data.CODE) {
				DetailWindow.Code.setText(VwApp.Config.CodeDetail + data.CODE);
			} else {
				DetailWindow.Code.setText(VwApp.Config.CodeDetail + "-");
			}
			
			DetailWindow.Container.add(DetailWindow.Type);
			DetailWindow.Container.add(DetailWindow.Code);
		}
		
		if (data.LON && data.LAT) { 
		    Lat = data.LAT;
		  	Lon = data.LON;
		} else { 
			Lat = "";
		  	Lon = "";
		}
	
		// toonkaart hier pas toevoegen, anders komt deze bovenaan te staan
		DetailWindow.Container.add(DetailWindow.Toonkaart); 
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
					i++
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
		
	// toevoegen aan scrollview
	DetailWindow.window.add(DetailWindow.Container);
	
	
	VwApp.UI.DetailWindow = DetailWindow;
	VwApp.UI.changeDetailView = ChangeValue;
})();
