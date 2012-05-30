var loaded 	 = false,
	onLoadFn = [];

/**
 * Voegt een functie toe aan de onload queue
 * 
 * @param {Object} fn
 * 		Een functie die uitgevoerd moet worden als de app geladen is.
 */
var addFn = function (fn) {
	if (!fn)
		return;
	
	onLoadFn.push(fn);
};

/**
 * Set de onload eenmalig op true, waardoor de queue met onload functies word
 * uitgevoerd. 		
 */
var setLoaded = function () {		
	if (loaded)
		return;
	
	// Loop door alle methodes in de que
	while (onLoadFn.length > 0) {
		var fn = onLoadFn.pop();
		// En voer ze uit
		fn();
	}
	
	loaded = true;
};

/**
 * Simpel booltje returnen.
 */
var isLoaded = function () {
	return loaded;
}

exports.addFn = 	addFn;
exports.setLoaded = setLoaded;
exports.isLoaded  = isLoaded;
