(function () {
	var SettingsWindow = {
		// Het window object van de settingswindow
		window: Titanium.UI.createWindow({
			title: 			  VwApp.Config.SettingsTabTitle,				
			backgroundColor:  VwApp.Config.ViewBackgroundColor,
			orientationModes: VwApp.Config.OrientationModes,
			navBarHidden: 	  true	
		}),
		
		// 	Dit wordt onze hoofd tabel, deze zal alle opties bevatten
		settingsView: Titanium.UI.createTableView({
			top: 	0,
			left: 	0,
			height: Titanium.Platform.osname === 'android' ? 
			// 	op android de hoogte absoluut zetten anders werkt hij niet en is hij weg :<
			(Titanium.Gesture.isPortrait ? Titanium.Platform.displayCaps.platformHeight : 
				Titanium.Platform.displayCaps.platformWidth) : 
					'100%',
			width: 	'100%',
			scrollable: false,
			style: 	Titanium.UI.iPhone.TableViewStyle.GROUPED
			// Data wordt onderaan toegevoegd
		}),
		
		// 	Een container waar we de tabel in te stoppen omdat op android de inputFields stuk gingen
		settingsScrollView: Titanium.UI.createScrollView({
			top: 			0,
			left: 			0,
			layout: 		'vertical',
			scrollType: 	'vertical',
			contentHeight: 	'auto',
			contentWidth: 	'auto',
			height: 		'100%',
			width: 			'100%'
		}),
		
		// 	Deze sectie bevat de mogelijkheid om het formaat van de boot in te geven
		boatDimensionSection: Titanium.UI.createTableViewSection({
			top: 			'5%',
			headerTitle: 	VwApp.Config.DimensionHeader,
			touchEnabled: 	false
		}),
		
		boatHeightRow: Titanium.UI.createTableViewRow({
			top: 			0,
			left: 			0,
			selectionStyle: 0,
			width: 			'auto',
			height: 		'auto'
		}),
		
		boatHeightLabel: Titanium.UI.createLabel({
			text: 			VwApp.Config.HeightText,
			top: 			Titanium.Platform.osname === 'android' ? '32%' : '6%',
			left: 			'5%',
			height: 		'auto',
			width: 			'auto',
			color:			VwApp.Config.TextColor,
			touchEnabled: 	false
		}),
		
		boatHeightInput: Titanium.UI.createTextField({
			height: 		'auto',
			width: 			'35%',
			focusable: 		true,
			value: 			Titanium.App.Properties.getString('height', null),
			right: 			'5%',
			keyboardType: 	Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
			returnKeyType: 	Titanium.UI.RETURNKEY_DONE,
			top: 			Titanium.Platform.osname === 'android' ? '5%' : '6%',
			hintText: 		VwApp.Config.HeightHintText,
			touchEnabled: 	true
		}),
		
		boatWidthRow: Titanium.UI.createTableViewRow({
			top: 			0,
			left: 			0,
			width: 			'100%',
			height: 		'auto',
			selectionStyle: 0
		}),
		
		boatWidthLabel: Titanium.UI.createLabel({
			text: 		VwApp.Config.WidthText,
			top: 		Titanium.Platform.osname === 'android' ? '32%' : '6%',
			left: 		'5%',
			touchEnabled: false,
			color:		VwApp.Config.TextColor,
			height: 	'auto',
			width: 		'auto'
		}),
		
		boatWidthInput: Titanium.UI.createTextField({
			height: 	'auto',
			width: 		'35%',
			right: 		'5%',
			keyboardType: Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
			returnKeyType: Titanium.UI.RETURNKEY_DONE,
			value: 		Titanium.App.Properties.getString('width', null),
			top: 		Titanium.Platform.osname === 'android' ? '5%' : '6%',
			hintText: 	VwApp.Config.WidthHintText
		}),
		
		// 	Deze sectie bevat de mogelijkheid om tussen verschillende types kaart te kiezen
		mapTypeSection: Titanium.UI.createTableViewSection({
			headerTitle: 	VwApp.Config.MapTypeHeader,
			touchEnabled: 	true,
			top: 			'1%'
		}),
		
		// Voor satelliet
		mapSateliteRow: Titanium.UI.createTableViewRow({
			title: 			VwApp.Config.MapSateliteText,
			className: 		"row",
			color:			VwApp.Config.TextColor,
			hasCheck: 		false,
			touchEnabled: 	false,
		}),
		
		// Voor de staten kaart
		mapStandardRow: Titanium.UI.createTableViewRow({
			title: 			VwApp.Config.MapStandardText,
			className: 		"row",
			color:			VwApp.Config.TextColor,
			hasCheck: 		false,
			touchEnabled: 	false
		}),
		
		// En voor de hybride kaart
		mapHybridRow: Titanium.UI.createTableViewRow({
			title: 			VwApp.Config.MapHybridText,
			className: 		"row",
			color:			VwApp.Config.TextColor,
			hasCheck: 		false,	
			touchEnabled: 	false
		}),
		
		// 	In deze sectie kunnen we er voor kiezen of we foto's well of niet laden van het
		//		internet
		dataUsageSection: Titanium.UI.createTableViewSection({
			headerTitle: 	VwApp.Config.DataUsageHeader,
			touchEnabled: 	false,
			top: 			'1%'
		}),
		
		loadPictureRow: Titanium.UI.createTableViewRow({
			top: 			0,
			left: 			0,
			width: 			'auto',
			selectionStyle:	0,
			height: 		'auto'
		}),
		
		loadPictureLabel: Titanium.UI.createLabel({
			text: 	VwApp.Config.LoadPicturesText,
			top: 	Titanium.Platform.osname === 'android' ? '33%' : '6%', 
			left: 	'23%',
			color:	VwApp.Config.TextColor,
			touchEnabled: false,
			height: 'auto',
			width: 	'auto'
		}),
		
		loadPictureCheckBox: Titanium.UI.createSwitch({
			style: 	Titanium.Platform.osname === 'android' ? Titanium.UI.Android.SWITCH_STYLE_CHECKBOX : 0,
			value: 	Titanium.App.Properties.getBool('laadData', false),
			left: 	'5%'
		})
		
	};
	
	/*	
	 * 		FUNCTIES
	 */
	
	/**
	 *	Om de tabel mee te schalen indien je hem scheef houdt (of recht zet) 
	 */
	Titanium.Gesture.addEventListener('orientationchange', function () {
		VwApp.UI.SettingsWindow.settingsView.height 	= '100%';
		VwApp.UI.SettingsWindow.settingsView.width 		= '100%';
	});

	// Ophalen van de opgeslagen waarde
	var mapType = Titanium.App.Properties.getString('mapType', 'map');
	// controle of de teruggegeven waarde valid is
	if(!(mapType === 'map' || mapType === 'satelite' || mapType === 'hybrid'))
	// zoniet dan instellen op de standaardwaarde van de kaart
		{ mapType = 'map'; Titanium.App.Properties.setString('mapType', 'map');	}  
	
	// Kijken welke waarde er opgeslagen stond en deze inladen
	// En tevens de kaart instellen op het juiste type
	if(mapType === 'map') { 
		SettingsWindow.mapStandardRow.hasCheck = true; 
		VwApp.UI.MapWindow.map.mapType = Titanium.Map.STANDARD_TYPE; }
	else if (mapType === 'satelite') { 
		SettingsWindow.mapSateliteRow.hasCheck = true; 
		VwApp.UI.MapWindow.map.mapType = Titanium.Map.SATELLITE_TYPE; }
	// Niet met een else if omdat er aan het begin al gechecked wordt
	else { SettingsWindow.mapHybridRow.hasCheck = true; VwApp.UI.MapWindow.map.mapType = Titanium.Map.HYBRID_TYPE; } 
	
	/**
	 * 	 Verschillende functies voor elk type kaart
 	 *  	- Elke functie zal all andere "vinkjes" weghalen en de juiste aanvinken
 	 * 		- De nieuwe waarde opslaan 
 	 * 		- De map opnieuw instellen zodat deze de juiste type kaart gebruikt
 	 */
	SettingsWindow.mapStandardRow.addEventListener('click', function(){
		SettingsWindow.mapStandardRow.hasCheck = true;					// De juiste aanvinken
		SettingsWindow.mapSateliteRow.hasCheck = false;				// De rest uitvinken
		if(Titanium.Platform.osname !== 'android'){	// Dit omdat deze het niet doet op android
			SettingsWindow.mapHybridRow.hasCheck = false;			
		}
		VwApp.UI.MapWindow.map.mapType = Titanium.Map.STANDARD_TYPE, // juiste kaart type instellen
		Titanium.App.Properties.setString('mapType', 'map'); // en opslaan
	});
	// idem
	SettingsWindow.mapSateliteRow.addEventListener('click', function(){
		SettingsWindow.mapStandardRow.hasCheck = false;
		SettingsWindow.mapSateliteRow.hasCheck = true;
		if(Titanium.Platform.osname !== 'android'){
			SettingsWindow.mapHybridRow.hasCheck = false;
		}
		VwApp.UI.MapWindow.map.mapType = Titanium.Map.SATELLITE_TYPE;
		Titanium.App.Properties.setString('mapType', 'satelite');
	});
	// idem maar omdat dit kaart type het niet doet op android staat er een if voor
	if(Titanium.Platform.osname !== 'android'){
		SettingsWindow.mapHybridRow.addEventListener('click', function(){
			SettingsWindow.mapStandardRow.hasCheck = false;
			SettingsWindow.mapSateliteRow.hasCheck = false;
			SettingsWindow.mapHybridRow.hasCheck = true;
			VwApp.UI.MapWindow.map.mapType = Titanium.Map.HYBRID_TYPE;
			Titanium.App.Properties.setString('mapType', 'hybrid');
		});
	}
	
	/**
	 * 	Eventlistener die ervoor zorgt dat de velden focus kwijtkunnen
	 */
	SettingsWindow.settingsView.addEventListener('click', function(){
		if(SettingsWindow.boatHeightInput.focus = true){
			SettingsWindow.boatHeightInput.blur();
		};
		if(SettingsWindow.boatWidthInput.focus = true){
			SettingsWindow.boatWidthInput.blur();
		};
	});
	
	//	Kopelen van de controle functies aan de inputvelden
	// 	indien we deze optie geven
	if(VwApp.Config.ShowHeight)	
	{	
		SettingsWindow.boatHeightInput.addEventListener('blur', function(){
			SettingsWindow.boatHeightInput.blur();
			// controle op dit veld aanroepen
			VwApp.Validation.checkField(SettingsWindow.boatHeightInput, 'height');
			
			// Vervolgens de kaart updaten
			//VwApp.UI.MapWindow.map.removeAllAnnotations();
			// Alle annotations toevoegen aan de kaart
			//VwApp.Map.annotationsArray(VwApp.Data.bruggen, VwApp.Config.BridgeGreenIcon, VwApp.Config.BridgeRedIcon);
			VwApp.UI.MapWindow.map.fireEvent('regionChanged');
		});
	}
	// 	indien we een breedte willen weergeven
	if(VwApp.Config.ShowWidth)
	{
		SettingsWindow.boatWidthInput.addEventListener('blur', function(){
			SettingsWindow.boatWidthInput.blur();
			
			// controle op dit veld aanroepen
			VwApp.Validation.checkField(SettingsWindow.boatWidthInput, 'width');
		});
	}
	
	/*
 	 * 	Eventlistener toevoegen die kijkt of er op het laden van afbeeldingen switch gedrukt is
 	 * 	Indien zo nieuwe waarde opslaan
 	 */
	SettingsWindow.loadPictureCheckBox.addEventListener('change', function(){
		// Het opslaan van de waarde van de switch
		Titanium.App.Properties.setBool('laadData', SettingsWindow.loadPictureCheckBox.value);
	});
	
	/*
 	 *		TOEVOEGEN VAN ALLES AAN DE WINDOW 
	 */
	if(VwApp.Config.ShowHeight){
		//	Het label en het inputfield toevoegen aan de hoogte rij
		SettingsWindow.boatHeightRow.add(SettingsWindow.boatHeightInput);
		SettingsWindow.boatHeightRow.add(SettingsWindow.boatHeightLabel);
		
		// Toevoegen aan de sectie
		SettingsWindow.boatDimensionSection.add(SettingsWindow.boatHeightRow);
	}
	
	if(VwApp.Config.ShowWidth){
		//	Zelfde voor de breedte
		SettingsWindow.boatWidthRow.add(SettingsWindow.boatWidthInput);
		SettingsWindow.boatWidthRow.add(SettingsWindow.boatWidthLabel);
		
		// Toevoegen aan de sectie
		SettingsWindow.boatDimensionSection.add(SettingsWindow.boatWidthRow);
	}
	
	// 	De verschillende types kaart toevoegen aan de sectie
	SettingsWindow.mapTypeSection.add(SettingsWindow.mapStandardRow);
	SettingsWindow.mapTypeSection.add(SettingsWindow.mapSateliteRow);
	if(Titanium.Platform.osname !== 'android') { SettingsWindow.mapTypeSection.add(SettingsWindow.mapHybridRow); }
	
	// 	De optie toevoegen om afbeeldingen te laden of niet
	SettingsWindow.loadPictureRow.add(SettingsWindow.loadPictureLabel);
	SettingsWindow.loadPictureRow.add(SettingsWindow.loadPictureCheckBox);
	SettingsWindow.dataUsageSection.add(SettingsWindow.loadPictureRow);
	
	// Sectie toevoegen aan de tabel
	// Maar alleen als we dit aangegeven hebben in de config (hoogte en breedte) anders niet
	if(VwApp.Config.ShowHeight || VwApp.Config.ShowWidth){
		SettingsWindow.settingsView.data = [SettingsWindow.boatDimensionSection, SettingsWindow.mapTypeSection, 
											SettingsWindow.dataUsageSection];
	}
	else{
		SettingsWindow.settingsView.data = [ SettingsWindow.mapTypeSection, 
											SettingsWindow.dataUsageSection];
	}
	
	// Tabel toevoegen aan de scrollView om ze een android bug te omzeilen
	SettingsWindow.settingsScrollView.add(SettingsWindow.settingsView);
	
	// Het geheel toevoegen aan de window
	SettingsWindow.window.add(SettingsWindow.settingsScrollView);
	
	// Voeg SettingsWindow toe aan de UI namespace voor gebruik buiten deze 
	// closure.
	VwApp.UI.SettingsWindow = SettingsWindow;
})();