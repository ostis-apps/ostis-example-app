/* --- src/salt-common.js --- */
var SaltUIComponent = {};

function extend(child, parent) {
    var F = function () {
    };
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    child.superclass = parent.prototype;
}


/* --- src/salt-paintPanel.js --- */
SaltUIComponent.PaintPanel = function (containerId) {
    this.containerId = containerId;
};

SaltUIComponent.PaintPanel.prototype = {

    init: function () {
        this._initMarkup(this.containerId);
    },

    _initMarkup: function (containerId) {
        var container = $('#' + containerId);

        var self = this;
        container.append('<div class="sc-no-default-cmd"><h2>Соли</h2><hr></div></div>');
        container.append('<ul>');
        container.append('<li class="sc-element" id="goto-section">Перейти к разделу Соли</li>');
        container.append('<li class="sc-element" id="goto-exercises">Перейти к упражнениям на Соли</li>');
        container.append('<li class="sc-element" id="goto-main">Вернуться на главную</li>');
        container.append('</ul>');

		$('#goto-section').click(function () {
			self._findSectionOfSalts();
		});

		$('#goto-exercises').click(function () {
			self._findSaltExercises();
		});

		$('#goto-main').click(function () {
			self._findMainPage();
		});
    },
	_findSectionOfSalts: function () {
		var addr;
		SCWeb.core.Server.resolveScAddr(['section_subject_domain_of_salts'], function (keynodes) {
			addr = keynodes['section_subject_domain_of_salts'];
			SCWeb.core.Server.resolveScAddr(["ui_menu_view_full_semantic_neighborhood"],
			function (data) {
				var cmd = data["ui_menu_view_full_semantic_neighborhood"];
				SCWeb.core.Main.doCommand(cmd,
				[addr], function (result) {
					// waiting for result
					if (result.question != undefined) {
						// append in history
						SCWeb.ui.WindowManager.appendHistoryItem(result.question);
					}
				});
			});
		});
    },

	_findSaltExercises: function () {
		var addr;
		SCWeb.core.Server.resolveScAddr(['exercises_salts'], function (keynodes) {
			addr = keynodes['exercises_salts'];
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

    _findMainPage: function () {
		var addr;
		SCWeb.core.Server.resolveScAddr(['section_subject_domain_of_chemistry'], function (keynodes) {
			addr = keynodes['section_subject_domain_of_chemistry'];
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

/* --- src/salt-component.js --- */
/**
 * SaltUIComponent component.
 */
SaltUIComponent.DrawComponent = {
    ext_lang: 'salt_component',
    formats: ['format_salt_json'],
    struct_support: true,
    factory: function (sandbox) {
        return new SaltUIComponent.DrawWindow(sandbox);
    }
};

SaltUIComponent.DrawWindow = function (sandbox) {
    this.sandbox = sandbox;
    this.paintPanel = new SaltUIComponent.PaintPanel(this.sandbox.container);
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
SCWeb.core.ComponentManager.appendComponentInitialize(SaltUIComponent.DrawComponent);

