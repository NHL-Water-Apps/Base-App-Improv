/**
 * 	Deze functie leest een bestand in het geheugen.
 * 
 * 	@param {string} [filename]
 * 		De naam van het bestand.
 * 
 * 	@returns {object | null} 
 * 		Een object met twee properties, 'file' en 'blob'. 'file' is een 
 *  	Titanium.Filesystem.File object, 'blob' is de data van het bestand.
 * 		De functie returned null als het mislukt om de file te lezen.
 */
var getFile = function(filename) {
	var file = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, filename)
	  , blob;
	
	// Leest het bestand in het geheugen
	if (file && file.exists()) {
		blob = file.read();
	} else { // Als het fout gaat
		file = null;
	  	blob = null;
		Titanium.API.warn('Functie Data.getFile: Het bestand \'' + filename +'\' bestaat niet');
		return null;
	}
	
	// Als blob nu nog null is, dan is er iets mis gegaan.
	if (!blob) {
		file = null;
		Titanium.API.warn('Functie Data.getFile: Het inlezen van het bestand \'' + filename +'\' is mislukt');
		return null
	}
	
	return {
		file: file
	  , blob: blob
	}; 	
}

/**
 * 	Deze functie leest en parsed een XML bestand uit de Resources/XML folder.
 *  
 * 	@param {string} [filename]
 * 		De naam van het XML bestand.
 * 
 * 	@returns {Titanium.XML.Document | null}
 * 		Een Titanium.XML.Document object met de data geladen uit het aangegeven 
 *      XML bestand. 
 *      De functie returned null als het laden en/of parsen van het XML bestand 
 *      fout is gegaan.
 * 
 * 	@example :: Het bestand 'data.xml' laden en parsen
 * 		var XMLdata = Data.getXML('data.xml');
 */
var getXML = function(filename) {
	var XMLDIR    = 'XML/'
	  , XMLdata
	  , XMLdocument	  
	
	// Check of er een geldige filename is opgegeven, anders geef fout.
	if (!filename) {
		Titanium.API.warn('Functie Data.getXML: parameter filename mag niet null/undefined zijn');
		return null;
	}	
	
	// Probeer het bestand in het geheugen te halen.	
	XMLdata = getFile(XMLDIR + filename);	
		
	// Probeer het XMLbestand te parsen, als het mislukt cleanup doen en null returnen 
	if (XMLdata && XMLdata.blob) {
		try {
			XMLdocument = Titanium.XML.parseString(XMLdata.blob.text);
		} catch (e) {
			Titanium.API.warn('Functie Data.getXML: Het parsen van het XML bestand \'' + XMLDIR + filename +'\' is mislukt')
			XMLdata.file = null;
			XMLdata.blob = null;
			return null;
		}		
	} else {
		Titanium.API.warn('Functie Data.getXML: Het is mislukt om \'' + XMLDIR + filename + '\' uit te lezen');
		return null;
	}
	
	// Als alles goed is gegaan, dan hebben we nu een XML.Document object, die returnen we.
	return XMLdocument;  
};

/**
 * 	Deze functie leest en parsed een JSON bestand uit de Resources/JSON folder.
 *  
 * 	@param {string} [filename] 
 * 		De naam van het JSON bestand.
 * 
 * 	@returns {object | null}
 * 		Een object met de data geladen uit het aangegeven JSON bestand. 
 *      De functie returned null als het laden en/of parsen van het JSON bestand 
 *      fout is gegaan.
 * 
 * 	@example :: Het bestand 'data.json' laden en parsen
 * 		var JSONdata = Data.getJSON('data.json');
 */
var getJSON = function(filename) {
	var JSONDIR  = 'JSON/'
      , JSONdata
      , JSONobject;
      
	if (!filename) {
		Titanium.API.warn('Functie Data.getJSON: parameter filename mag niet null/undefined zijn');
		return null;
    }
    
    // Probeer het bestand in het geheugen te halen.	
    JSONdata = getFile(JSONDIR + filename)
    
    // Probeer de JSON te parsen, als het mislukt cleanup doen en null returnen 
    if (JSONdata && JSONdata.blob) {
    	try {
    		JSONobject = JSON.parse(JSONdata.blob.text);
    	} catch (e) {
    		Titanium.API.warn('Functie Data.getJSON: Het parsen van het JSON bestand \'' + JSONDIR + filename +'\' is mislukt');
    		JSONdata.file = null;
    		JSONdata.blob = null;
    		return null;
    	}	
    } else {
    	Titanium.API.warn('Functie Data.getJSON: Het is mislukt om \'' + JSONDIR + filename +'\' uit te lezen');
    	return null;
    }
    
    return JSONdata;
}; 

exports.getFile = getFile;
exports.getXML  = getXML;
exports.getJSON = getJSON;