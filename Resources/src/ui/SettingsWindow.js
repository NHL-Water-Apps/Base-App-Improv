(function () {
		
	var SettingsWindow = {
		// Het window object van de settingswindow
		window: Titanium.UI.createWindow({
			title: 			  VwApp.Config.SettingsTabTitle,				
			backgroundColor:  VwApp.Config.ViewBackgroundColor,
			orientationModes: VwApp.Config.OrientationModes	
		}),
		
		settingsView: Titanium.UI.createTableView({
			top: 	0,
			left: 	0,
			height: Titanium.Platform.osname === 'android' ? 
			// op android de hoogte absoluut zetten anders werkt hij niet en is hij weg :<
			(Titanium.Gesture.isPortrait ? Titanium.Platform.displayCaps.platformHeight : Titanium.Platform.displayCaps.platformWidth) : 
					'100%',
			width: 	'100%',
			scrollable: false,
			//data: 	tableData,
			style: 	Titanium.UI.iPhone.TableViewStyle.GROUPED
		}),
		
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
		
		mapTypeSection: Titanium.UI.createTableViewSection({
			headerTitle: 	VwApp.Config.MapTypeHeader,
			touchEnabled: 	true,
			top: 			'1%'
		}),
		
		mapSateliteRow: Titanium.UI.createTableViewRow({
			title: 			VwApp.Config.MapSateliteText,
			className: 		"row",
			color:			VwApp.Config.TextColor,
			hasCheck: 		false,
			touchEnabled: 	false,
		}),
		
		mapStandardRow: Titanium.UI.createTableViewRow({
			title: 			VwApp.Config.MapStandardText,
			className: 		"row",
			color:			VwApp.Config.TextColor,
			hasCheck: 		false,
			touchEnabled: 	false
		}),
		
		mapHybridRow: Titanium.UI.createTableViewRow({
			title: 			VwApp.Config.MapHybridText,
			className: 		"row",
			color:			VwApp.Config.TextColor,
			hasCheck: 		false,	
			touchEnabled: 	false
		}),
		
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
	
	//	Het label en het inputfield toevoegen aan de hoogte rij
	SettingsWindow.boatHeightRow.add(SettingsWindow.boatHeightInput);
	SettingsWindow.boatHeightRow.add(SettingsWindow.boatHeightLabel);
	
	//	Zelfde voor de breedte
	SettingsWindow.boatWidthRow.add(SettingsWindow.boatWidthInput);
	SettingsWindow.boatWidthRow.add(SettingsWindow.boatWidthLabel);
	
	// 	Deze beide toevoegen aan de sectie
	SettingsWindow.boatDimensionSection.add(SettingsWindow.boatHeightRow);
	SettingsWindow.boatDimensionSection.add(SettingsWindow.boatWidthRow);
	
	// 	De verschillende types kaart toevoegen aan de sectie
	SettingsWindow.mapTypeSection.add(SettingsWindow.mapStandardRow);
	SettingsWindow.mapTypeSection.add(SettingsWindow.mapSateliteRow);
	if(Titanium.Platform.osname !== 'android') { SettingsWindow.mapTypeSection.add(SettingsWindow.mapHybridRow); }
	
	// 	De optie toevoegen om afbeeldingen te laden of niet
	SettingsWindow.loadPictureRow.add(SettingsWindow.loadPictureLabel);
	SettingsWindow.loadPictureRow.add(SettingsWindow.loadPictureCheckBox);
	SettingsWindow.dataUsageSection.add(SettingsWindow.loadPictureRow);
	
	// Sectie toevoegen aan de tabel
	SettingsWindow.settingsView.data = [SettingsWindow.boatDimensionSection, SettingsWindow.mapTypeSection, 
											SettingsWindow.dataUsageSection];
	
	// Tabel toevoegen aan de scrollView om ze een android bug te omzeilen
	SettingsWindow.settingsScrollView.add(SettingsWindow.settingsView);
	
	// Het geheel toevoegen aan de window
	SettingsWindow.window.add(SettingsWindow.settingsScrollView);
	
	// Voeg SettingsWindow toe aan de UI namespace voor gebruik buiten deze 
	// closure.
	VwApp.UI.SettingsWindow = SettingsWindow;
})();
