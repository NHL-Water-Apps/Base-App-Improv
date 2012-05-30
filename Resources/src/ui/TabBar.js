(function() {
	var TabBar = {
		// De tabgroep die de tabs controleert.
		tabGroup: Titanium.UI.createTabGroup(),
		
		// De drie tabs van de tabbalk.
		mapTab: Titanium.UI.createTab({
			title: VwApp.Config.MapTabTitle,
			icon:	VwApp.Config.MapTabIcon,
			window: VwApp.UI.MapWindow.window
		}),
	
		listTab: Titanium.UI.createTab({
			title: VwApp.Config.ListTabTitle,
			icon:	VwApp.Config.ListTabIcon,
			window: VwApp.UI.ListWindow.window
		}),
	
		settingsTab: Titanium.UI.createTab({
			title: VwApp.Config.SettingsTabTitle,
			icon:	VwApp.Config.SettingsTabIcon,
			window: VwApp.UI.SettingsWindow.window
		})
	};
	
	// Voeg de tabs toe aan de tabgroep
	TabBar.tabGroup.addTab(TabBar.mapTab);
	TabBar.tabGroup.addTab(TabBar.listTab);
	TabBar.tabGroup.addTab(TabBar.settingsTab);
	
	// Voeg TabBar toe aan de UI namespace voor gebruik buiten deze closure.
	VwApp.UI.TabBar = TabBar;
})();

