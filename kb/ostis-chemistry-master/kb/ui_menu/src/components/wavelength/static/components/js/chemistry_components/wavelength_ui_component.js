/* --- src/wavelength-common.js --- */
var WavelengthUIComponent = {};

function extend(child, parent) {
    var F = function () {
    };
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    child.superclass = parent.prototype;
}


/* --- src/wavelength-paintPanel.js --- */
/**
 * Paint panel.
 */

WavelengthUIComponent.PaintPanel = function (containerId) {
    this.containerId = containerId;
};

WavelengthUIComponent.PaintPanel.prototype = {

    init: function () {
        this._initMarkup(this.containerId);
    },

    _initMarkup: function (containerId) {
        var container = $('#' + containerId);

        var self = this;
        //container.append('<div class="sc-no-default-cmd">Сплавы</div></div>');
        container.append('<button id="newButton" type="button">Найти длину волны</button>');
        container.append('<button id="newButton2" type="button">Найти длину волны с обьяснением </button>');
       // container.append('<button id="searchInfoButton" type="button">Посмотреть раздел Сплавы</button>');
        //container.append('<button id="generateNodes" type="button">Посмотреть упражнения на Сплавы</button>');
        //If you don't want to make default command - add class="sc-no-default-cmd" to button

        $('#newButton').click(function () {
			self._findWavelengthComponent();
		});


		$('#newButton2').click(function () {
			self._findSectionOfWavelengths();
		});
    },


	_findWavelengthComponent: function () {
		SCWeb.core.Server.resolveScAddr(["ui_menu_finding_wavelength_when_going_from_one_level"],
			function (data) {
				// Get command of ui_menu_view_full_semantic_neighborhood
				var cmd = data["ui_menu_finding_wavelength_when_going_from_one_level"];
								SCWeb.core.Main.doCommand(cmd,
				[SCWeb.core.Arguments._arguments[0],SCWeb.core.Arguments._arguments[1]], function (result) {
					if (result.question != undefined) {
						SCWeb.ui.WindowManager.appendHistoryItem(result.question);
					}
				});
			});
	},

	_findSectionOfWavelengths: function () {
		SCWeb.core.Server.resolveScAddr(["ui_menu_finding_wavelength_when_going_from_one_level_by_step"],
			function (data) {
				// Get command of ui_menu_view_full_semantic_neighborhood
				var cmd = data["ui_menu_finding_wavelength_when_going_from_one_level_by_step"];
								SCWeb.core.Main.doCommand(cmd,
				[SCWeb.core.Arguments._arguments[0],SCWeb.core.Arguments._arguments[1]], function (result) {
					if (result.question != undefined) {
						SCWeb.ui.WindowManager.appendHistoryItem(result.question);
					}
				});
			});
    }

};

/* --- src/wavelength-component.js --- */
/**
 * WavelengthUIComponent component.
 */
WavelengthUIComponent.DrawComponent = {
    ext_lang: 'wavelength_ui_component',
    formats: ['format_wavelength_json'],
    struct_support: true,
    factory: function (sandbox) {
        return new WavelengthUIComponent.DrawWindow(sandbox);
    }
};

WavelengthUIComponent.DrawWindow = function (sandbox) {
    this.sandbox = sandbox;
    this.paintPanel = new WavelengthUIComponent.PaintPanel(this.sandbox.container);
    this.paintPanel.init();
    this.recieveData = function (data) {
        console.log("in recieve data" + data);
    };

    var scElements = {};

    function drawAllElements() {
        var dfd = new jQuery.Deferred();
       // for (var addr in scElements) {
            jQuery.each(scElements, function(j, val){
                var obj = scElements[j];
                if (!obj || obj.translated) return;
// check if object is an arc
                if (obj.data.type & sc_type_arc_pos_const_perm) {
                    var begin = obj.data.begin;
                    var end = obj.data.end;
                    // logic for component update should go here
                }

        });
        SCWeb.ui.Locker.hide();
        dfd.resolve();
        return dfd.promise();
    }

// resolve keynodes
    var self = this;
    this.needUpdate = false;
    this.requestUpdate = function () {
        var updateVisual = function () {
// check if object is an arc
            var dfd1 = drawAllElements();
            dfd1.done(function (r) {
                return;
            });


/// @todo: Don't update if there are no new elements
            window.clearTimeout(self.structTimeout);
            delete self.structTimeout;
            if (self.needUpdate)
                self.requestUpdate();
            return dfd1.promise();
        };
        self.needUpdate = true;
        if (!self.structTimeout) {
            self.needUpdate = false;
            SCWeb.ui.Locker.show();
            self.structTimeout = window.setTimeout(updateVisual, 1000);
        }
    }
    
    this.eventStructUpdate = function (added, element, arc) {
        window.sctpClient.get_arc(arc).done(function (r) {
            var addr = r[1];
            window.sctpClient.get_element_type(addr).done(function (t) {
                var type = t;
                var obj = new Object();
                obj.data = new Object();
                obj.data.type = type;
                obj.data.addr = addr;
                if (type & sc_type_arc_mask) {
                    window.sctpClient.get_arc(addr).done(function (a) {
                        obj.data.begin = a[0];
                        obj.data.end = a[1];
                        scElements[addr] = obj;
                        self.requestUpdate();
                    });
                }
            });
        });
    };
// delegate event handlers
    this.sandbox.eventDataAppend = $.proxy(this.receiveData, this);
    this.sandbox.eventStructUpdate = $.proxy(this.eventStructUpdate, this);
    this.sandbox.updateContent();
};
SCWeb.core.ComponentManager.appendComponentInitialize(WavelengthUIComponent.DrawComponent);

