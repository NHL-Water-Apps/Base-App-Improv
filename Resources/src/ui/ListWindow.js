(function () {
	//listwindow
	var ListWindow = {
		window: Titanium.UI.createWindow({
			title: 			  VwApp.Config.ListTabTitle,				
			backgroundColor:  VwApp.Config.ViewBackgroundColor,
			orientationModes: VwApp.Config.OrientationModes,	
			navBarHidden:	  true
		}),
		
		//Searchbar die zoekt op title
		searchbar: Titanium.UI.createSearchBar({   
			barColor: 		 VwApp.Config.SearchBackgroundColor,   
			filterAttribute: 'title',  			
   			hintText: 		 VwApp.Config.SearchBarText,  
   			showCancel:		 false, 
   			focusable: 		 false, 			  
   			top:			 0, 			
			zIndex: 		 9,
			height: Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad' ? 43 : 65 
		}),

		//de data in de lijsten
		table : Titanium.UI.createTableView({    
			zIndex: 		0
		}),
		
		refresh: false			
	};	
	
	/**
	 *  Deze functie update de data en voegt deze data toe aan de table/list.
	 */
	var updateListData = function() {		
		VwApp.List.clearData();
		
		data = [];
		
		// Alle data sets als tabledata toevoegen
		for (name in VwApp.Data) {
			if (VwApp.Data.hasOwnProperty(name)) {
				data = data.concat(VwApp.Data[name]);
			}
		}
		
		// Sorteren
		data = VwApp.List.sortData(data);
		
		// Stop alles in de table
		ListWindow.table.setData(data);
	};
	
	VwApp.OnLoad.addFn(function() {
		// Update de table list.
		updateListData();
		
		//eventlistener	wanneer er geklikt wordt op een van de vakken in de lijst
		ListWindow.table.addEventListener('click', function(e){  
		//waardes van detailview veranderen		 
			VwApp.UI.changeDetailView(e.rowData.data);
			VwApp.UI.TabBar.listTab.open(VwApp.UI.DetailWindow.window);
		});
	});
	
	// Wanneer de searchbar wordt aangeraakt komt de cancelButton niet tevoorschijn (iphone only)
	ListWindow.searchbar.addEventListener('focus', function(){
		ListWindow.searchbar.setShowCancel(false);
	});
	
	//	Search toevoegen
	ListWindow.table.search = ListWindow.searchbar;
	
	if(Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad'){
		ListWindow.window.add(ListWindow.searchbar); 
	}
	
	// Voeg alle UI onderdelen toe aan ListWindow.window
	ListWindow.window.add(ListWindow.table);
	
	
	// Voeg ListWindow toe aan de UI namespace voor gebruik buiten deze closure.
	VwApp.UI.ListWindow = ListWindow;
})();
