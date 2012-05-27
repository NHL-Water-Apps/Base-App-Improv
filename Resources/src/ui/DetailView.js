(function () {
	//scrollview
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
		
		//Hieronder staan de eigenschappen van de brug. Type, hoogte etc
		NoImagebridge : Titanium.UI.createLabel({
			text : 			"",
			textAlign : 	"left",
			left: 			'3 %',
			top: 			'0%',
			width : 		'auto',
			heigth : 		'auto',
			color:			VwApp.Config.TextColor
		}),
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
		Adres : Titanium.UI.createLabel({
			text : 			"",
			textAlign : 	"left",
			left: 			'3 %',
			top: 			'5%',
			width : 		'auto',
			heigth : 		'auto',
			color:			VwApp.Config.TextColor
		}),
		Imagebridge : 	Ti.UI.createImageView({
			url:				'',  //dummylink voor foto, dit kan dataToPass zijn
			height: 			'35%',
			width : 			Titanium.Gesture.isPortrait() ? '90%' :'60%',
			top: 				'2%',
			}),
		//de button om de brug op de kaart te tonen
		Toonkaart : Titanium.UI.createButton({
			top: 			80, 
			height: 		'auto',
			width: 			'auto', 
			title: 			VwApp.Config.ShowOnMapDetail,
			position: 		'center'
		}),		
};
//variabelen voor de lat en de lon
var Lat = "";
var Lon = "";

//changevalue wanneer er iets aangeklikt wordt in de lijst		
function ChangeValue(data) {
	//wanneer er geen data is gevonden, niks doen.
	if (!data) {
		return;
	}
	//title
	if (data.title)
	{DetailWindow.window.setTitle(data.title)}
	else
	{DetailWindow.window.setTitle("-")}
	
	//lengte
	if (data.ADRESS) 
		{DetailWindow.Adres.setText(VwApp.Config.AdressDetail + data.ADRESS);}
	else
		{DetailWindow.Adres.setText(VwApp.Config.AdressDetail + "-");}
	//hoogte
	if(data.HEIGHT || data.HEIGHT == 0)
		{DetailWindow.Hoogte.setText(VwApp.Config.HeigthDetail + data.HEIGHT + VwApp.Config.UnitDetail);}
	else
		{DetailWindow.Hoogte.setText(VwApp.Config.HeigthDetail + "-");}
	//breedte
	if(data.WIDTH || data.WIDTH == 0)
		{DetailWindow.Breedte.setText(VwApp.Config.WidthDetail + data.WIDTH + VwApp.Config.UnitDetail);}
	else
		{DetailWindow.Breedte.setText(VwApp.Config.WidthDetail +"-");}
	//type
	if(data.BRIDGETYPE)
		{DetailWindow.Type.setText(VwApp.Config.TypeDetail + data.BRIDGETYPE);}
	else
	{DetailWindow.Type.setText(VwApp.Config.TypeDetail + "-")}
	
	if(data.LON && data.LAT)
	{ 
	    Lat = data.LAT;
	  	Lon = data.LON;
	}
	else
	{ 
		Lat = "";
	  	Lon = "";
	}
	//afbeelding
	//kijken of er een foto beschikbaar is en of het laten zien van foto's aangevinkt is in de settings.
	if(data.PICTURE && Titanium.App.Properties.getBool('laadData', true))   
	{
	//foto van de brug tonen
			DetailWindow.Imagebridge.setUrl(ChangeLink(data.PICTURE));
			DetailWindow.Imagebridge.setHeight('35%');
			DetailWindow.Imagebridge.setWidth(Titanium.Gesture.isPortrait() ? '90%' :'60%');
			DetailWindow.NoImagebridge.setText("");
	}
	else   //geen foto beschikbaar
	{   
		if(Titanium.App.Properties.getBool('laadData', true))     //wanneer foto's laden ingeschakeld is en er is geen foto beschikbaar toon de tekst dat er geen foto beschikbaar is
			{
				DetailWindow.Imagebridge.setHeight('0%');  //image hoogte is 0%, dus niet zichtbaar
				DetailWindow.NoImagebridge.setText(VwApp.Config.NoPictureDetail);
			}
		else //als het laden van foto's uitgeschakeld is geef hierover een melding
			{
				DetailWindow.Imagebridge.setHeight('0%'); //image hoogte is 0%, dus niet zichtbaar
				DetailWindow.NoImagebridge.setText(VwApp.Config.PictureOffDetail);
			}
	}
	}
function ChangeLink(link)
	{
		var oldlink = link;  //inladen van de oude link
		var newlink = "";  //link die ontstaat uit de oude link
		var slash = 0;    //integer to count the number of '/'	
		for(var i = 0; i < oldlink.length; i++)
			{
				if(oldlink[i] == ',')   //wanneer en een ',' voorkomt, stoppen met het maken van de nieuwe link(voor de snelheid, deze if is niet noodzakelijk, wordt later afgevangen
				{i = oldlink.length}

				if(oldlink[i] == '/')  //het aantal '/' tellen
				{	
					newlink = newlink + oldlink[i];
					slash++;
				}
				if(slash == 6)  //bij de 6de slash
				{
					slash++;
					while(oldlink[i] != '=') //alles er tussenuithalen tot er een '=' komt
					{i++}
				}
	
				if(oldlink[i] != ',' && oldlink[i] != '/' && oldlink[i] != '=' && oldlink[i] != undefined) //else de nieuwe link maken
				{
				newlink = newlink + oldlink[i];
				}
				
			}
	 	return newlink;
	}

	//wanneer er geklikt wordt op de button setlocation op map en open de map, mits lat en lon aanwezig
	DetailWindow.Toonkaart.addEventListener('click', function(){   
	if(Lat != "")		
	{
		VwApp.Map.setLocation(Lat, Lon, VwApp.Config.DefaultUserLocZoom);
		VwApp.UI.TabBar.tabGroup.setActiveTab(VwApp.UI.TabBar.mapTab);
		VwApp.UI.DetailWindow.window.close();
	}
	else {
		alert (VwApp.Config.LatLonNotFound);
	}	
	});
	
	//toevoegen aan scrollview
	DetailWindow.Container.add(DetailWindow.Imagebridge)
	DetailWindow.Container.add(DetailWindow.NoImagebridge)
	DetailWindow.Container.add(DetailWindow.Adres);
	DetailWindow.Container.add(DetailWindow.Type);
	DetailWindow.Container.add(DetailWindow.Hoogte);
	DetailWindow.Container.add(DetailWindow.Breedte); 
	DetailWindow.Container.add(DetailWindow.Toonkaart); 
	DetailWindow.window.add(DetailWindow.Container);
	
	
	VwApp.UI.DetailWindow = DetailWindow;
	VwApp.UI.changeDetailView = ChangeValue;
})();
	

