;(() => {

	'use strict';

	// (optional) tell jshint about globals (they should remain commented out)
	/* globals someGlobalVar */ //Tell jshint someGlobalVar exists as global var

	// define semi-globals (variables that are "global" in this file's anounymous function's scope)
	// prefix them with sg so we can distinguish them from normal function-scope vars
	// var sgSomeVar = '';


	/**
	* initialize all
	* @param {string} varname Description
	* @returns {undefined}
	*/
	const init = function() {
		
	};

	// kick of the script when all dom content has loaded
	document.readyState === 'loading' ? document.addEventListener(DOMContentLoaded, init) : init();
})();
