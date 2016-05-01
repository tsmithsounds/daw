"use strict";

(function() {

var
	mouseIsDown,
	oldTool,
	px = 0, py = 0
;

function setBackOldTool() {
	if ( oldTool ) {
		ui.selectTool( oldTool );
		oldTool = null;
	}
	mouseIsDown = false;
}

ui.jqWindow.blur( setBackOldTool );

ui.jqBody.on( {
	mousemove: function( e ) {
		if ( mouseIsDown ) {
			var fn = ui.tool[ ui.currentTool ].mousemove;
			if ( fn ) {
				fn( e, e.target.uisample, e.pageX - px, e.pageY - py );
			}
			px = e.pageX;
			py = e.pageY;
		}
	},
	mouseup: function( e ) {
		if ( mouseIsDown ) {
			var fn = ui.tool[ ui.currentTool ].mouseup;
			if ( fn ) {
				fn( e, e.target.uisample );
			}
			setBackOldTool();
		}
	}
});

ui.jqTrackLines.on( {
	contextmenu: false,
	mousedown: function( e ) {
		if ( !mouseIsDown ) {
			mouseIsDown = true;
			px = e.pageX;
			py = e.pageY;
			if ( e.button === 0 ) {
				if ( ui.currentTool === "hand" ) {
					ui.jqBody.addClass( "cursor-move" );
				}
			} else if ( e.button === 2 ) {
				oldTool = ui.currentTool;
				ui.selectTool( "delete" );
			}
			var fn = ui.tool[ ui.currentTool ].mousedown;
			if ( fn ) {
				fn( e, e.target.uisample );
			}
		}
	}
});

})();