/**
 * Paint panel.
 */
PencilComponent.PaintPanel = function (containerId) {
	this.containerId = containerId;
};

PencilComponent.PaintPanel.prototype = {

	init: function () {
		this._initMarkup(this.containerId);
	},

	_initMarkup: function (containerId) {
		var container = $('#' + containerId);
		var self = this;
		container.append('<div class="sc-no-default-cmd">Узнать информацию о составе</div>');
		self._createButtons(container);
	},

	_createButtons: function (container) {
		var self = this;
		var object_node, counter;
		console.log("create buttons");
		SCWeb.core.Server.resolveScAddr(['concept_object'], function (keynodes) {
			object_node = keynodes['concept_object'];
			counter = 0;
			window.sctpClient.iterate_elements(
				SctpIteratorType.SCTP_ITERATOR_3F_A_A, [
					object_node,
					sc_type_arc_pos_const_perm,
					0]).done(function(objects){
					var counter = 0;
					while (counter < objects.length) {
						console.log("search system idtf of:", objects[counter][2]);
						window.sctpClient.iterate_elements(
							SctpIteratorType.SCTP_ITERATOR_5F_A_A_A_F, [
								objects[counter][2],
								sc_type_arc_common | sc_type_const,
								sc_type_link,
								sc_type_arc_pos_const_perm,
								window.scKeynodes.nrel_system_identifier]).done(function(identifiers){  
									window.sctpClient.get_link_content(identifiers[0][2],'string').done(function(content){
										system_id = content;
									});         
								});

						console.log("search system idtf of:", objects[counter][2]);
						window.sctpClient.iterate_elements(
							SctpIteratorType.SCTP_ITERATOR_5F_A_A_A_F, [
								objects[counter][2],
								sc_type_arc_common | sc_type_const,
								sc_type_link,
								sc_type_arc_pos_const_perm,
								window.scKeynodes.nrel_main_idtf]).done(function(identifiers){  
									window.sctpClient.get_link_content(identifiers[0][2],'string').done(function(content){
										container.append('<a href="#" id="' + system_id + '" >' + content + '</a>');
										$('#' + system_id).click(function () {
											var name = $(this).attr('id');
											self._play(name);
										});
									});         
								});
						counter++;
					}
				});
		});
	},

	_play: function (name) {
		console.log("start agent for: ", name);
		var addr;
		SCWeb.core.Server.resolveScAddr([name], function (keynodes) {
			addr = keynodes[name];
			SCWeb.core.Server.resolveScAddr(["ui_menu_find_object_structure"], function (data) {
				var cmd = data["ui_menu_find_object_structure"];
				SCWeb.core.Main.doCommand(cmd, [addr], function (result) {
					if (result.question != undefined) {
						SCWeb.ui.WindowManager.appendHistoryItem(result.question);
					}
				});
			});
		});
	}
};