var loaded 	 = false,
	onLoadFn = [];

/**
 * Voegt een functie toe aan de onload queue
 * 
 * @param {Object} fn
 * 		Een functie die uitgevoerd moet worden als de app geladen is.
 */
var onload = function (fn) {
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
		
	while (onloadFn.length > 0) {
		var fn = onLoadFn.pop();
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

exports.onload    = onload;
exports.setLoaded = setLoaded;
exports.isLoaded  = isLoaded;
