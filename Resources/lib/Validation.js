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
	var rExp  = /[0-9]+(\.[0-9]+)?/; 							// Regualar expression die test voor juiste getallen
	if(fieldName.value === '' || rExp.test(fieldName.value)) 	// kijken of er een juist iets is ingevuld
	{
		var temp = rExp.exec(fieldName.value); 				// kijken of er een getal uit de regular expression komt
		if(fieldName.value === '') { Titanium.App.Properties.setString( saveName, null); } 
		else if(temp !== null && temp.length > 0){				// kleine controle (gaf een error zonder vreemd genoeg)
			Titanium.App.Properties.setString(saveName, temp[0]); // anders het eerste getal uit de regular expression opslaan
			fieldName.value = temp[0];							 // deze waarde ook weer terug zetten
			fieldName.color = 'black';							 // de kleur van het tekstvak weer zwart maken	
		}
	}
	else{														// indien de invoer niet valid is
		fieldName.color = 'red';								// het textveld een andere kleur geven
	}
}

// Functies publiekelijk beschikbaar maken
exports.checkField = checkField;