"use strict";

ui.settingsPopup = {
	init() {
		ui.idElements.settings.onclick = ui.settingsPopup.show;
		ui.idElements.settingsPopupWrap.onclick = ui.settingsPopup.hide;
		ui.idElements.settingsPopupForm.onsubmit = ui.settingsPopup._onsubmit;
		ui.idElements.settingsPopup.onclick = function( e ) { e.stopPropagation(); };
		ui.settingsPopup.inputs = ui.idElements.settingsPopupForm.querySelectorAll( "input" );
	},
	show() {
		var inp = ui.settingsPopup.inputs;

		inp[ +settings.clockSteps ].checked = true;
		inp[ 2 ].value = gs.currCmp.name;
		inp[ 3 ].value = gs.currCmp.bpm;
		inp[ 4 ].value = gs.currCmp.beatsPerMeasure;
		inp[ 5 ].value = gs.currCmp.stepsPerBeat;
		ui.idElements.settingsPopupWrap.classList.remove( "hidden" );
	},
	hide() {
		ui.idElements.settingsPopupWrap.classList.add( "hidden" );
	},

	// private:
	_onsubmit() {
		var x,
			dawChange = {},
			cmpChange = {},
			cmp = gs.currCmp,
			inp = ui.settingsPopup.inputs;

		inp[ +settings.clockSteps ].checked || ( dawChange.clockSteps = !settings.clockSteps );
		( x =  inp[ 2 ].value ) !== cmp.name && ( cmpChange.name = x );
		( x = +inp[ 3 ].value ) !== cmp.bpm && ( cmpChange.bpm = x );
		( x = +inp[ 4 ].value ) !== cmp.beatsPerMeasure && ( cmpChange.beatsPerMeasure = x );
		( x = +inp[ 5 ].value ) !== cmp.stepsPerBeat && ( cmpChange.stepsPerBeat = x );
		for ( x in dawChange ) { gs.changeSettings( dawChange ); break; }
		for ( x in cmpChange ) { gs.pushCompositionChange( cmpChange ); break; }
		ui.settingsPopup.hide();
		return false;
	}
};
