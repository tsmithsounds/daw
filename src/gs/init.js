"use strict";

gs.init = function() {
	ui.init();
	gs.history = [];
	gs.historyInd = 0;
	gs.currCmp = null;
	gs.currCmpSaved = true;
	gs.localStorage.getAll().forEach( function( cmp ) {
		ui.cmps.push( cmp.id );
		ui.cmps.update( cmp.id, cmp );
	} );
};
