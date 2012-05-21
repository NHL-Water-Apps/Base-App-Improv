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

	// Maak alvast namespaces aan voor (..)
	UI: {}
};

// Laad alle andere code in.
Titanium.include('src/ui/MapWindow.js');
Titanium.include('src/ui/ListWindow.js');
Titanium.include('src/ui/SettingsWindow.js');
Titanium.include('src/ui/TabBar.js');


// Start de app
VwApp.UI.TabBar.tabGroup.open();