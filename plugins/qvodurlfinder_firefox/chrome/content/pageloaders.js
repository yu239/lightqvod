const STATE_START = Components.interfaces.nsIWebProgressListener.STATE_START;
const STATE_STOP = Components.interfaces.nsIWebProgressListener.STATE_STOP;

var myListener =
    {
	QueryInterface: function(aIID)
	{
	    if (aIID.equals(Components.interfaces.nsIWebProgressListener) ||
		aIID.equals(Components.interfaces.nsISupportsWeakReference) ||
		aIID.equals(Components.interfaces.nsISupports))
		return this;
	    throw Components.results.NS_NOINTERFACE;
	},
	
	onStateChange: function(aWebProgress, aRequest, aFlag, aStatus)
	{
	    // If you use myListener for more than one tab/window, use
	    // aWebProgress.DOMWindow to obtain the tab/window which triggers the state change
	    aFlag=aWebProgress.DOMWindow
	    
	    if(aFlag & STATE_START)
	    {
		// This fires when the load event is initiated
		//alert("start");
	    }
	    if(aFlag & STATE_STOP)
	    {
		// This fires when the load finishes
		//alert("stop");
		myExtension.doSomething(aWebProgress);
	    }
	    return 0;
	},
	
	onLocationChange: function(aProgress, aRequest, aURI)
	{
	    // This fires when the location bar changes; i.e load event is confirmed
	    // or when the user switches tabs. If you use myListener for more than one tab/window,
	    // use aProgress.DOMWindow to obtain the tab/window which triggered the change.
	    
	    myExtension.doSomething(aProgress);
	    return 0;
	},
	
	// For definitions of the remaining functions see XULPlanet.com
	onProgressChange: function() {return 0;},
	onStatusChange: function() {return 0;},
	onSecurityChange: function() {return 0;},
	onLinkIconAvailable: function() {return 0;}
    }

var myExtension = {
    init: function() {
	// Listen for webpage loads
	gBrowser.addProgressListener(myListener,
				     Components.interfaces.nsIWebProgress.NOTIFY_STATE_DOCUMENT);
    },
    
    uninit: function() {
	gBrowser.removeProgressListener(myListener);
    },
    
    doSomething: function(aProgress) {
	var doc = aProgress.DOMWindow.document;
	
	function keyDown(e)
	{
	    var keycode = e.which;
	    var realkey = String.fromCharCode(e.which);
	    
	    if (e.ctrlKey && keycode == 69)
	    {
		startsearch(doc);
	    }
	    
	}
	
	document.onkeydown = keyDown;
    }
};

window.addEventListener("load", function() {myExtension.init()}, false);
window.addEventListener("unload", function() {myExtension.uninit()}, false);

