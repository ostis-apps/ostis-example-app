/* --- src/alloy-common.js --- */
var AlloyUIComponent = {};

function extend(child, parent) {
    var F = function () {
    };
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    child.superclass = parent.prototype;
}


/* --- src/alloy-paintPanel.js --- */
/**
 * Paint panel.
 */

AlloyUIComponent.PaintPanel = function (containerId) {
    this.containerId = containerId;
};

AlloyUIComponent.PaintPanel.prototype = {

    init: function () {
        this._initMarkup(this.containerId);
    },

    _initMarkup: function (containerId) {
        var container = $('#' + containerId);

        var self = this;
        container.append('<div class="sc-no-default-cmd">Сплавы</div></div>');
        container.append('<button id="newButton" type="button">Найти компоненты заданного сплава</button>');
        container.append('<button id="searchInfoButton" type="button">Посмотреть раздел Сплавы</button>');
        container.append('<button id="generateNodes" type="button">Посмотреть упражнения на Сплавы</button>');

        $('#newButton').click(function () {
			self._findAlloyComponent();
		});


		$('#searchInfoButton').click(function () {
			self._findSectionOfAlloys();
		});

		$('#generateNodes').click(function () {
			self._findAlloyExercises();
		});
    },
	_findAlloyComponent: function () {
		var addr;
		SCWeb.core.Server.resolveScAddr([SCWeb.core.Arguments._arguments[0]], function (keynodes) {
			console.log("key", keynodes);
			console.log("arguments", SCWeb.core.Arguments._arguments[0]);
			addr = SCWeb.core.Arguments._arguments[0];
			SCWeb.core.Server.resolveScAddr(["ui_menu_find_alloy_components"],
			function (data) {
				var cmd = data["ui_menu_find_alloy_components"];
				SCWeb.core.Main.doCommand(cmd,
				[addr], function (result) {
					if (result.question != undefined) {
						SCWeb.ui.WindowManager.appendHistoryItem(result.question);
					}
				});
			});
		});
	},

	_findSectionOfAlloys: function () {
		var addr;
		SCWeb.core.Server.resolveScAddr(['section_subject_domain_of_alloys'], function (keynodes) {
			addr = keynodes['section_subject_domain_of_alloys'];
			SCWeb.core.Server.resolveScAddr(["ui_menu_view_full_semantic_neighborhood"],
			function (data) {
				var cmd = data["ui_menu_view_full_semantic_neighborhood"];
				SCWeb.core.Main.doCommand(cmd,
				[addr], function (result) {
					if (result.question != undefined) {
						SCWeb.ui.WindowManager.appendHistoryItem(result.question);
					}
				});
			});
		});
    },

	_findAlloyExercises: function () {
		var addr;
		SCWeb.core.Server.resolveScAddr(['exercises_mixture'], function (keynodes) {
			addr = keynodes['exercises_mixture'];
			SCWeb.core.Server.resolveScAddr(["ui_menu_view_full_semantic_neighborhood"],
			function (data) {
				var cmd = data["ui_menu_view_full_semantic_neighborhood"];
				SCWeb.core.Main.doCommand(cmd,
				[addr], function (result) {
					if (result.question != undefined) {
						SCWeb.ui.WindowManager.appendHistoryItem(result.question);
					}
				});
			});
		});
    }

};

/* --- src/alloy-component.js --- */
/**
 * AlloyUIComponent component.
 */
AlloyUIComponent.DrawComponent = {
    ext_lang: 'alloy_ui_component',
    formats: ['format_alloy_json'],
    struct_support: true,
    factory: function (sandbox) {
        return new AlloyUIComponent.DrawWindow(sandbox);
    }
};

AlloyUIComponent.DrawWindow = function (sandbox) {
    this.sandbox = sandbox;
    this.paintPanel = new AlloyUIComponent.PaintPanel(this.sandbox.container);
    this.paintPanel.init();
    this.recieveData = function (data) {
        console.log("in recieve data" + data);
    };

    var scElements = {};

    function drawAllElements() {
        var dfd = new jQuery.Deferred();
            jQuery.each(scElements, function(j, val){
                var obj = scElements[j];
                if (!obj || obj.translated) return;
                if (obj.data.type & sc_type_arc_pos_const_perm) {
                    var begin = obj.data.begin;
                    var end = obj.data.end;
                }

        });
        SCWeb.ui.Locker.hide();
        dfd.resolve();
        return dfd.promise();
    }

    var self = this;
    this.needUpdate = false;
    this.requestUpdate = function () {
        var updateVisual = function () {
            var dfd1 = drawAllElements();
            dfd1.done(function (r) {
                return;
            });

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
    this.sandbox.eventDataAppend = $.proxy(this.receiveData, this);
    this.sandbox.eventStructUpdate = $.proxy(this.eventStructUpdate, this);
    this.sandbox.updateContent();
};
SCWeb.core.ComponentManager.appendComponentInitialize(AlloyUIComponent.DrawComponent);

