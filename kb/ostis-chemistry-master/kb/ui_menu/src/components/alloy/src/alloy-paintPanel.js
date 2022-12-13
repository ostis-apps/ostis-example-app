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