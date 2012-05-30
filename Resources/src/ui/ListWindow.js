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
			height: Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad' ? 43 : 55 
		}),

		//de data in de lijsten
		table : Titanium.UI.createTableView({    
			zIndex: 		0
		}),			
	};	

	var updateListData = function() {
		// Alle data toevoegen aan de lijst
		var tableData = [];
		
		VwApp.List.clearData();
		
		tableData = VwApp.List.addData(VwApp.Data.bruggen);
		tableData = VwApp.List.addData(VwApp.Data.jachthavens);
		tableData = VwApp.List.addData(VwApp.Data.ligplaatsen);
		
		tableData = VwApp.List.sortData(tableData);
		
		ListWindow.table.data = tableData;
	};
	
	VwApp.OnLoad.addFn(function() {
		
		
		//eventlistener	wanneer er geklikt wordt op een van de vakken in de lijst
		ListWindow.table.addEventListener('click', function(e){  
		//waardes van detailview veranderen		 
			VwApp.UI.changeDetailView(e.rowData.data);
			VwApp.UI.TabBar.listTab.open(VwApp.UI.DetailWindow.window);
		});
		
		
		/*Ti.Geolocation.addEventListener('location', function (e) {
			if (!e.coords)
				return;
			
			for (name in VwApp.Data) {
				if (VwApp.Data.hasOwnProperty(name)) {
					for (var i = 0; i < VwApp.Data[name].length; i++) {
						VwApp.Data[name][i].DISTANCE = VwApp.Map.distanceBetweenCoords(
							VwApp.Data[name][i].LON,
							VwApp.Data[name][i].LAT,
							e.coords.longitude,
							e.coords.latitude
						);
					}
				}
			}
			
			updateListData();
		}); */
		
		updateListData();
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
