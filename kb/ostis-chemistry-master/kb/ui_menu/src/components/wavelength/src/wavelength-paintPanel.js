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