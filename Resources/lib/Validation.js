/**
 * Een functie die zal kijken of een van een textVeld kijkt wat het nummer hiervan is
 * 		- Controle of het ingevoerde valid is
 * 		- Indien deze waarde opslaan,
 * 			anders zal gekeken worden of er een valid iets in zat
 * 			dit zal dan opgeslagen worden en weergegeven worden in
 * 			het tekstvak
 * 		- Als er niets valids gevonden is in het textvak dan zal
 * 			de text in het textvak rood gemaakt worden
 * 
 * 	@param {Titanium.UI.textField} [fieldName] 
 * 			De textField die gecontroleerd dient te worden
 * 	@param {string} [saveName]
 * 			Mee te geven naam waarin de waarde (indien juist) zal worden opgeslagen	om zo 
 * 				later weer te gebruiken
 */
function checkField(fieldName, saveName){
	// Regualar expression die test voor juiste getallen
	var rExp  = /[0-9]+(\.[0-9]+)?/; 					
			
	// kijken of er een juist iets is ingevuld		
	if(fieldName.value === '' || rExp.test(fieldName.value)) 	
	{
		// kijken of er een getal uit de regular expression komt
		var temp = rExp.exec(fieldName.value); 				
		if(fieldName.value === '') { Titanium.App.Properties.setString( saveName, null); } 
		// kleine controle (gaf een error zonder vreemd genoeg)
		else if(temp !== null && temp.length > 0){			
			
			// anders het eerste getal uit de regular expression opslaan	
			Titanium.App.Properties.setString(saveName, temp[0]);
			 
			// deze waarde ook weer terug zetten
			fieldName.value = temp[0];	
			
			// de kleur van het tekstvak weer zwart maken							 
			fieldName.color = 'black';							 
		}
	}
	// indien de invoer niet valid is het textveld een andere kleur geven
	else{														
		fieldName.color = 'red';								
	}
}

// Functies publiekelijk beschikbaar maken
exports.checkField = checkField;