(function () {
		
	var ListWindow = {
		window: Titanium.UI.createWindow({
			title: 			  VwApp.Config.ListTabTitle,				
			backgroundColor:  VwApp.Config.ViewBackgroundColor,
			orientationModes: VwApp.Config.OrientationModes
				
		}),
		
		searchbar: Titanium.UI.createSearchBar({
			barColor: 		 '#000000',   
			filterAttribute: 'title',  			
   			hintText: 		 VwApp.Config.SearchBarText,  
   			showCancel:		 false, 			  
   			top:			 0, 			
			zIndex: 		 9,
			height: Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad' ? 43 : 55 
		}),
		
		table : Titanium.UI.createTableView({
			data: 	VwApp.Data.bruggen.blob,       
			zIndex: 0 
			})
	};
	
	//for(var i in VwApp.Data.bruggen.blob[0]) { Titanium.API.warn(i); }
	alert(VwApp.Data.bruggen);
	//var data = VwApp.Data.bruggen; //implementatie data.
	
	//	Search toevoegen? Maybe
	ListWindow.table.search = ListWindow.searchbar;
	
	
	// Voeg alle UI onderdelen toe aan ListWindow.window
	ListWindow.window.add(ListWindow.table);
	
	
	// Voeg ListWindow toe aan de UI namespace voor gebruik buiten deze closure.
	VwApp.UI.ListWindow = ListWindow;
})();
