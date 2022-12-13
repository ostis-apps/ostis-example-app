/**
 * Paint panel.
 */
EnterComponent.PaintPanel = function (containerId) {
	this.containerId = containerId;
};

EnterComponent.PaintPanel.prototype = {

	init: function () {
		this._initMarkup(this.containerId);
	},

	_initMarkup: function (containerId) {
		var container = $('#' + containerId);
		var self = this;

		container.append('<div class="sc-no-default-cmd">Ввод данных:</div>');
		
		container.append(
			'<form>' +
				'<label for="element-search-input">Выберите элемент: </label>' + 
				'<div id="search-panel">' + 
					'<form role="search">' + 
						'<div class="form-group">' + 
							'<input id="element-search-input" type="text" class="typeahead form-control" x-webkit-speech sc_control_sys_idtf="ui_control_search_idtf_edit" style="width: 250px;" data-provide="typeahead" autocomplete="off">' + 
							'<input type="hidden" id="sysId" value="">' + 
						'</div>' + 
					'</form>' + 
				'</div>' + 
				'<label for="input_data">Что известно?</label>' + 
				'<select id="characteristic">' + 
    				'<option value="nrel_mass">Масса (в граммах)</option>' + 
    				'<option value="nrel_amount">Объём (в литрах)</option>' + 
    				'<option value="nrel_N">Количество атомов ( * 10^23)</option>' + 
    			'</select>' + 
				'<input type="text" id="input_data" name="input_data" pattern="\\d+(,\\d+)?">' + 
				'<button id="find" type="button">Найти химическое количество</button>' + 
			'</form>'
		);

		$('#element-search-input.typeahead').typeahead({
				minLength: 3,
				highlight: true,
			},
			{
				name: 'idtf',
				source: function (query, cb) {
					$('#element-search-input').addClass('search-processing');
					SCWeb.core.Server.findIdentifiersSubStr(query, function (data) {
						keys = [];

						var addValues = function (key) {
							var list = data[key];
							if (list) {
								for (idx in list) {
									var value = list[idx]
									keys.push({name: value[1], addr: value[0], group: key});
								}
							}
						}

						addValues('sys');
						addValues('main');
						addValues('common');

						cb(keys);
						$('#element-search-input').removeClass('search-processing');
					});
				},
				displayKey: 'name',
				templates: {
					suggestion: function (item) {
						var html = '';
						if (item.group === 'common') {
							return '<p class="sc-content">' + item.name + '</p>';
						} else {
							var cl = 'glyphicon glyphicon-user';
							if (item.group === 'sys') {
								cl = 'glyphicon glyphicon-globe';
							}
							return '<p><span class="tt-suggestion-icon ' + cl + '"></span>' + item.name + '</p>';
						}
						return '<p>' + item.name + '</p>';
					}
				}
			}
		).bind('typeahead:selected', function (evt, item, dataset) {
			if (item && item.addr) {
				$('#sysId').val([item.addr])
			}
		});
		
		$('#find').click(function () {
			var element = $("#sysId").val();
			console.log('element',element);
			var measur = $("#characteristic").val();
			console.log('measur',measur);
			var input_data = $("#input_data").val();
			console.log('input_data',input_data);
			if (input_data.search(/^\d+(,\d+)?$/g) != -1) {
				self._createElement(element, input_data, measur);
			} else {
				alert('Wrong input!');
			}
		});
	},

	_findChemicalAmount: function (system_idtf) {
		SCWeb.core.Server.resolveScAddr(["ui_menu_find_chemical_amount_of_substance"],
		function (data) {
			var cmd = data["ui_menu_find_chemical_amount_of_substance"];
			SCWeb.core.Main.doCommand(cmd, [system_idtf], function (result) {
				if (result.question != undefined) {
					SCWeb.ui.WindowManager.appendHistoryItem(result.question);
				}
			});
		});
	},

	_createElement: function (el, m, measur) {
		console.log('creating element');
		var self = this;
		var element = parseInt(el);

		window.sctpClient.create_node(sc_type_const).done(function (elementExample) {
			console.log('create node eleme example:',elementExample);
			window.sctpClient.create_link().done(function (linkName) {
				console.log('create link:',linkName);
				window.sctpClient.set_link_content(linkName, 'example_' + el);
				window.sctpClient.create_arc(sc_type_arc_common | sc_type_const, elementExample, linkName).done(function (commonArcOne) {
					console.log('create arc:',commonArcOne);
					window.sctpClient.create_arc(sc_type_arc_pos_const_perm, window.scKeynodes.nrel_system_identifier, commonArcOne);
					window.sctpClient.create_arc(sc_type_arc_pos_const_perm, element, elementExample);
					self._createValue(elementExample, m, measur);
				});
			});
		});
	},

	_createValue: function(elementExample, m, measur) {
		console.log('creating value');
		var self = this;
		if (measur === "nrel_mass") {
			SCWeb.core.Server.resolveScAddr(['value', 'nrel_mass', 'lang_ru'], function (keynodes) {
				var nrelMass = keynodes['nrel_mass'];
				var value = keynodes['value'];
				var lang = keynodes['lang_ru'];

				window.sctpClient.create_node(sc_type_const).done(function (val) {
					console.log('create node val:',val);
					window.sctpClient.create_arc(sc_type_arc_common | sc_type_const, elementExample, val).done(function (commonArcTwo) {
						window.sctpClient.create_arc(sc_type_arc_pos_const_perm, nrelMass, commonArcTwo);
						window.sctpClient.create_arc(sc_type_arc_pos_const_perm, value, val);
						self._createMassMeasurement(val, m, elementExample);
					});
				});
			});
		}
		if (measur === "nrel_amount") {
			SCWeb.core.Server.resolveScAddr(['value', 'nrel_amount', 'lang_ru'], function (keynodes) {
				var nrelAmount = keynodes['nrel_amount'];
				var value = keynodes['value'];
				var lang = keynodes['lang_ru'];

				window.sctpClient.create_node(sc_type_const).done(function (val) {
					console.log('create node val:',val);
					window.sctpClient.create_arc(sc_type_arc_common | sc_type_const, elementExample, val).done(function (commonArcTwo) {
						window.sctpClient.create_arc(sc_type_arc_pos_const_perm, nrelAmount, commonArcTwo);
						window.sctpClient.create_arc(sc_type_arc_pos_const_perm, value, val);
						self._createAmountMeasurement(val, m, elementExample);
					});
				});
			});
		}
		if (measur === "nrel_N") {
			SCWeb.core.Server.resolveScAddr(['value', 'nrel_N', 'lang_ru'], function (keynodes) {
				var nrelN = keynodes['nrel_N'];
				var value = keynodes['value'];
				var lang = keynodes['lang_ru'];

				window.sctpClient.create_node(sc_type_const).done(function (val) {
					console.log('create node val:',val);
					window.sctpClient.create_arc(sc_type_arc_common | sc_type_const, elementExample, val).done(function (commonArcTwo) {
						window.sctpClient.create_arc(sc_type_arc_pos_const_perm, nrelN, commonArcTwo);
						window.sctpClient.create_arc(sc_type_arc_pos_const_perm, value, val);
						self._createAtomsMeasurement(val, m, elementExample);
					});
				});
			});
		}
	},

	_createMassMeasurement: function (val, m, elementExample) {
		console.log('creating measurements');
		var self = this;    	

		SCWeb.core.Server.resolveScAddr(['nrel_measurement'], function (keynodes) {
			var nrelMeasurement = keynodes['nrel_measurement'];

			window.sctpClient.create_node(sc_type_const).done(function (meas) {
				console.log('create node meas:',meas);
				window.sctpClient.create_arc(sc_type_arc_common | sc_type_const, meas, val).done(function (commonArcThree) {
					window.sctpClient.create_arc(sc_type_arc_pos_const_perm, nrelMeasurement, commonArcThree);
					SCWeb.core.Server.resolveScAddr([m], function (key) {
						self._createMassNumber(m, meas, elementExample);
					});
				});
			});
		});
	},

	_createAtomsMeasurement: function (val, atoms, elementExample) {
		console.log('creating measurements');
		var self = this;    	

		SCWeb.core.Server.resolveScAddr(['nrel_measurement'], function (keynodes) {
			var nrelMeasurement = keynodes['nrel_measurement'];

			window.sctpClient.create_node(sc_type_const).done(function (meas) {
				console.log('create node meas:',meas);
				window.sctpClient.create_arc(sc_type_arc_common | sc_type_const, meas, val).done(function (commonArcThree) {
					window.sctpClient.create_arc(sc_type_arc_pos_const_perm, nrelMeasurement, commonArcThree);
					SCWeb.core.Server.resolveScAddr([atoms], function (key) {
						self._createNumber(atoms, meas, elementExample);
					});
				});
			});
		});
	},

	_createAmountMeasurement: function (val, amount, elementExample) {
		console.log('creating measurements');
		var self = this;    	

		SCWeb.core.Server.resolveScAddr(['nrel_measurement'], function (keynodes) {
			var nrelMeasurement = keynodes['nrel_measurement'];

			window.sctpClient.create_node(sc_type_const).done(function (meas) {
				console.log('create node meas:',meas);
				window.sctpClient.create_arc(sc_type_arc_common | sc_type_const, meas, val).done(function (commonArcThree) {
					window.sctpClient.create_arc(sc_type_arc_pos_const_perm, nrelMeasurement, commonArcThree);
					SCWeb.core.Server.resolveScAddr([amount], function (key) {
						self._createAmountNumber(amount, meas, elementExample);
					});
				});
			});
		});
	},

	_createNumber: function (m, meas, elementExample) {
		console.log('creating number');
		var self = this;    	

		SCWeb.core.Server.resolveScAddr(['number', 'lang_ru', 'lang_en'], function (keynodes) {
			var number = keynodes['number'];
			var lang_ru = keynodes['lang_ru'];
			var lang_en = keynodes['lang_en'];
		
			window.sctpClient.create_node(sc_type_const).done(function (num) {
				console.log('create node num:',num);
				window.sctpClient.create_link().done(function (numName) {
					console.log('create link numName:',numName);
					window.sctpClient.set_link_content(numName, m);
					window.sctpClient.create_arc(sc_type_arc_common | sc_type_const, num, numName).done(function (commonArcFour) {
						window.sctpClient.create_arc(sc_type_arc_pos_const_perm, window.scKeynodes.nrel_system_identifier, commonArcFour);
						window.sctpClient.create_arc(sc_type_arc_pos_const_perm, number, num);
						self._createMeasurement(meas, num, elementExample);
					});
				});
				window.sctpClient.create_link().done(function (link_addr) {
					window.sctpClient.set_link_content(link_addr, m);
					window.sctpClient.create_arc(sc_type_arc_common | sc_type_const, num, link_addr).done(function (arc_addr) {
						window.sctpClient.create_arc(sc_type_arc_pos_const_perm, lang_ru, link_addr);
						window.sctpClient.create_arc(sc_type_arc_pos_const_perm, lang_en, link_addr);
						window.sctpClient.create_arc(sc_type_arc_pos_const_perm, window.scKeynodes.nrel_main_idtf, arc_addr);
					});
				});
			});
		});
	},

	_createMassNumber: function (m, meas, elementExample) {
		console.log('creating number');
		var self = this;    	

		SCWeb.core.Server.resolveScAddr(['number', 'lang_ru', 'lang_en'], function (keynodes) {
			var number = keynodes['number'];
			var lang_ru = keynodes['lang_ru'];
			var lang_en = keynodes['lang_en'];
		
			window.sctpClient.create_node(sc_type_const).done(function (num) {
				console.log('create node num:',num);
				window.sctpClient.create_link().done(function (numName) {
					console.log('create link numName:',numName);
					window.sctpClient.set_link_content(numName, m);
					window.sctpClient.create_arc(sc_type_arc_common | sc_type_const, num, numName).done(function (commonArcFour) {
						window.sctpClient.create_arc(sc_type_arc_pos_const_perm, window.scKeynodes.nrel_system_identifier, commonArcFour);
						window.sctpClient.create_arc(sc_type_arc_pos_const_perm, number, num);
						self._createGramMeasurement(meas, num, elementExample);
					});
				});
				window.sctpClient.create_link().done(function (link_addr) {
					window.sctpClient.set_link_content(link_addr, m);
					window.sctpClient.create_arc(sc_type_arc_common | sc_type_const, num, link_addr).done(function (arc_addr) {
						window.sctpClient.create_arc(sc_type_arc_pos_const_perm, lang_ru, link_addr);
						window.sctpClient.create_arc(sc_type_arc_pos_const_perm, lang_en, link_addr);
						window.sctpClient.create_arc(sc_type_arc_pos_const_perm, window.scKeynodes.nrel_main_idtf, arc_addr);
					});
				});
			});
		});
	},

	_createAmountNumber: function (m, meas, elementExample) {
		console.log('creating number');
		var self = this;    	

		SCWeb.core.Server.resolveScAddr(['number', 'lang_ru', 'lang_en'], function (keynodes) {
			var number = keynodes['number'];
			var lang_ru = keynodes['lang_ru'];
			var lang_en = keynodes['lang_en'];
		
			window.sctpClient.create_node(sc_type_const).done(function (num) {
				console.log('create node num:',num);
				window.sctpClient.create_link().done(function (numName) {
					console.log('create link numName:',numName);
					window.sctpClient.set_link_content(numName, m);
					window.sctpClient.create_arc(sc_type_arc_common | sc_type_const, num, numName).done(function (commonArcFour) {
						window.sctpClient.create_arc(sc_type_arc_pos_const_perm, window.scKeynodes.nrel_system_identifier, commonArcFour);
						window.sctpClient.create_arc(sc_type_arc_pos_const_perm, number, num);
						self._createLiterMeasurement(meas, num, elementExample);
					});
				});
				window.sctpClient.create_link().done(function (link_addr) {
					window.sctpClient.set_link_content(link_addr, m);
					window.sctpClient.create_arc(sc_type_arc_common | sc_type_const, num, link_addr).done(function (arc_addr) {
						window.sctpClient.create_arc(sc_type_arc_pos_const_perm, lang_ru, link_addr);
						window.sctpClient.create_arc(sc_type_arc_pos_const_perm, lang_en, link_addr);
						window.sctpClient.create_arc(sc_type_arc_pos_const_perm, window.scKeynodes.nrel_main_idtf, arc_addr);
					});
				});
			});
		});
	},

	_createMeasurement: function (meas, numb, elementExample) {
		var self = this;
		console.log('creating grams for numb',numb);
		SCWeb.core.Server.resolveScAddr(['rrel_10_in_23'], function (keynodes) {
			var rrel_10_in_23 = keynodes['rrel_10_in_23'];
			window.sctpClient.create_arc(sc_type_arc_pos_const_perm, meas, numb).done(function (arcOne) {
				window.sctpClient.create_arc(sc_type_arc_pos_const_perm, rrel_10_in_23, arcOne).done(function () {
					self._findChemicalAmount(elementExample);
				});
			});
		});
	},

	_createGramMeasurement: function (meas, numb, elementExample) {
		var self = this;
		console.log('creating grams for numb',numb);
		SCWeb.core.Server.resolveScAddr(['rrel_gram'], function (keynodes) {
			var rrel_gram = keynodes['rrel_gram'];
			window.sctpClient.create_arc(sc_type_arc_pos_const_perm, meas, numb).done(function (arcOne) {
				window.sctpClient.create_arc(sc_type_arc_pos_const_perm, rrel_gram, arcOne).done(function () {
					self._findChemicalAmount(elementExample);
				});
			});
		});
	},

	_createLiterMeasurement: function (meas, numb, elementExample) {
		var self = this;
		console.log('creating grams for numb',numb);
		SCWeb.core.Server.resolveScAddr(['rrel_liter'], function (keynodes) {
			var rrel_liter = keynodes['rrel_liter'];
			window.sctpClient.create_arc(sc_type_arc_pos_const_perm, meas, numb).done(function (arcOne) {
				window.sctpClient.create_arc(sc_type_arc_pos_const_perm, rrel_liter, arcOne).done(function () {
					self._findChemicalAmount(elementExample);
				});
			});
		});
	}
};