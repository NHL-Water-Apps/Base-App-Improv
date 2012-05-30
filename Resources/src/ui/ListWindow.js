(function () {
	//sorteren van de data
 	VwApp.Data.jachthavens.sort(sortName);
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
			data: 			VwApp.Data.jachthavens,     
			zIndex: 		0,
		})
			
	};	
	
	//	Search toevoegen
	ListWindow.table.search = ListWindow.searchbar;
	
	if(Titanium.Platform.osname === 'iphone' || Titanium.Platform.osname === 'ipad'){
		ListWindow.window.add(ListWindow.searchbar); 
	}
	
	// Voeg alle UI onderdelen toe aan ListWindow.window
	ListWindow.window.add(ListWindow.table);
	
	//eventlistener	wanneer er geklikt wordt op een van de vakken in de lijst
	ListWindow.table.addEventListener('click', function(e){  
	//waardes van detailview veranderen
	//for(d in e){ Titanium.API.warn(d);	}
		 
		VwApp.UI.changeDetailView(e.rowData);
		VwApp.UI.TabBar.listTab.open(VwApp.UI.DetailWindow.window);
	});
	
	
	// Voeg ListWindow toe aan de UI namespace voor gebruik buiten deze closure.
	VwApp.UI.ListWindow = ListWindow;
})();


//sorteerfunctie
function sortName(thisObject,thatObject) { 
    if (thisObject.title > thatObject.title)
    {
        return 1;
    }
    else if (thisObject.title < thatObject.title)
    {
        return -1;
    }
    return 0;
  }
