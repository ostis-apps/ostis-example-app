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