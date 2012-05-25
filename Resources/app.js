/**
 * Alle variabelen en modules gaan in de VwApp namespace
 *
 * Dit zorgt ervoor dat de app niet vol komt te staan met losse variabelen in
 * de globale namespace.
 */
var VwApp = {

	// Laad een aantal modules en voeg ze toe aan de namespace.
	Config: require('Config'),
	Map:	require('lib/Map'),
	Utils:  require('lib/Utils'),
	IO:	require('lib/IO'),
	Validation: require('lib/Validation'),

	// Maak alvast namespaces aan voor (..)
	UI: {},
	Data: {}
};

// Laad data in.
(function() {
	var data,
		name;
	
	// Loopt door alle bestanden aangegeven in de Config.js
	// Als Vwapp.Config.DataToLoad.bruggen = 'Data/Bruggon' dan word
	// VwApp.Data.bruggen een array dat alle data uit het bestand bevat.
	for (name in VwApp.Config.DataToLoad) {
		if (VwApp.Config.DataToLoad.hasOwnProperty(name)) {
			VwApp.Data[name] = require(VwApp.Config.DataToLoad[name]);
			
			// Geef elke item een uniek ID.
			// En geeft elk object ook het type data.
			for (var i = 0; i < VwApp.Data[name].length; i++) {
				VwApp.Data[name][i].ID = i;
				VwApp.Data[name][i].TYPE = name;					
			}
		}
	}
})();

// Laad alle andere code in.
Titanium.include('src/ui/MapWindow.js');
Titanium.include('src/ui/DetailView.js');
Titanium.include('src/ui/ListWindow.js');
Titanium.include('src/ui/SettingsWindow.js');
Titanium.include('src/ui/TabBar.js');

// Start de app
VwApp.UI.TabBar.tabGroup.open();