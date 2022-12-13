/**
 * Paint panel.
 */

SolutionUIComponent.PaintPanel = function (containerId) {
    this.containerId = containerId;
};

SolutionUIComponent.PaintPanel.prototype = {

    init: function () {
        this._initMarkup(this.containerId);
    },

    _initMarkup: function (containerId) {
        var container = $('#' + containerId);

        var self = this;
        container.append('<div class="sc-no-default-cmd"><h2>Растворы</h2><hr></div></div>');
        container.append('<ul>');
        container.append('<li class="sc-element" id="goto-section">Перейти к разделу Растворы</li>');
        container.append('<li class="sc-element" id="goto-exercises">Перейти к упражнениям на Растворы</li>');
        container.append('<li class="sc-element" id="goto-main">Вернуться на главную</li>');
        container.append('</ul>');
        //If you don't want to make default command - add class="sc-no-default-cmd" to button

		$('#goto-section').click(function () {
			self._findSectionOfSolutions();
		});

		$('#goto-exercises').click(function () {
			self._findSolutionExercises();
		});

		$('#goto-main').click(function () {
			self._findMainPage();
		});
    },

    /* Call agent of searching semantic neighborhood,
	send ui_main_menu node as parameter and add it in web window history
	*/
	_findSectionOfSolutions: function () {
		var addr;
		// Resolve sc-addr. Get sc-addr of ui_main_menu node
		SCWeb.core.Server.resolveScAddr(['section_subject_domain_of_solutions'], function (keynodes) {
			addr = keynodes['section_subject_domain_of_solutions'];
			// Resolve sc-addr of ui_menu_view_full_semantic_neighborhood node
			SCWeb.core.Server.resolveScAddr(["ui_menu_view_full_semantic_neighborhood"],
			function (data) {
				// Get command of ui_menu_view_full_semantic_neighborhood
				var cmd = data["ui_menu_view_full_semantic_neighborhood"];
				// Simulate click on ui_menu_view_full_semantic_neighborhood button
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

	_findSolutionExercises: function () {
		var addr;
		// Resolve sc-addr. Get sc-addr of ui_main_menu node
		SCWeb.core.Server.resolveScAddr(['exercises_solutions'], function (keynodes) {
			addr = keynodes['exercises_solutions'];
			// Resolve sc-addr of ui_menu_view_full_semantic_neighborhood node
			SCWeb.core.Server.resolveScAddr(["ui_menu_view_full_semantic_neighborhood"],
			function (data) {
				// Get command of ui_menu_view_full_semantic_neighborhood
				var cmd = data["ui_menu_view_full_semantic_neighborhood"];
				// Simulate click on ui_menu_view_full_semantic_neighborhood button
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

    _findMainPage: function () {
		var addr;
		// Resolve sc-addr. Get sc-addr of ui_main_menu node
		SCWeb.core.Server.resolveScAddr(['section_subject_domain_of_chemistry'], function (keynodes) {
			addr = keynodes['section_subject_domain_of_chemistry'];
			// Resolve sc-addr of ui_menu_view_full_semantic_neighborhood node
			SCWeb.core.Server.resolveScAddr(["ui_menu_view_full_semantic_neighborhood"],
			function (data) {
				// Get command of ui_menu_view_full_semantic_neighborhood
				var cmd = data["ui_menu_view_full_semantic_neighborhood"];
				// Simulate click on ui_menu_view_full_semantic_neighborhood button
				SCWeb.core.Main.doCommand(cmd,
				[addr], function (result) {
					// waiting for result
					if (result.question != undefined) {
						// append in history
						//SCWeb.ui.WindowManager.appendHistoryItem(result.question);
					}
				});
			});
		});
    }

};