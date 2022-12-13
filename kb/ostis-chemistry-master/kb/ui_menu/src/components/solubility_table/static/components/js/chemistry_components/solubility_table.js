/* --- src/solubility_table-common.js --- */
var SolubilityTableComponent = {};

function extend(child, parent) {
    var F = function () {
    };
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    child.superclass = parent.prototype;
}


/* --- src/ui_solubility_table.js --- */

SolubilityTableComponent.PaintPanel = function (containerId) {
    this.containerId = containerId;
};

SolubilityTableComponent.PaintPanel.prototype = {

    init: function () {
        this._initMarkup(this.containerId);
    },

    _initMarkup: function (containerId) {
        var container = $('#' + containerId);
        var ids = ["anion", "cation"];

        cations.forEach(function(elem){
            ids.push(elem.elem_id);
        });
	anions.forEach(function(elem){
            ids.push(elem.elem_id);
        });
        var self = this;
        SCWeb.core.Server.resolveScAddr(ids, function (keynodes) {
            self._initTable(container, keynodes);
        });

    },

    _initTable: function (container, keynodes) {

        var result = "";

	var res = `
			<tr>
				<th class="solubility-table-anion-header" rowspan="2">
					<div class="solubility-table-cell-container" sc_addr="${keynodes["anion"]}">Анион</div>
				</th>
				<th class="solubility-table-cation-header" colspan="23">
					<div class="solubility-table-cell-container" sc_addr="${keynodes["cation"]}">Катион</div>
				</th>
			</tr>`.trim();

	var row = "";
	cations.forEach(function(cation){
		row += `<td class="solubility-table-cation">
				<div class="solubility-table-cell-container" sc_addr="${keynodes[cation.elem_id]}">${cation.elem_sign}<div>
			</td>`.trim();
	});
	res += `<tr>${row}</tr>`;
	anions.forEach(function(anion){
		row = `<td class="solubility-table-anion">
				<div class="solubility-table-cell-container" sc_addr="${keynodes[anion.elem_id]}">${anion.elem_sign}</div>
			</td>`.trim();
		cations.forEach(function(cation){
			var cellData = anion.values[cation.elem_id]
			row += `<td class="${cellData.className}" title="${cellData.title}">${cellData.text}</td>`;
		});
		res += `<tr>${row}</tr>`;
	});

	result = `<h4 class="solubility-table-title">Таблица растворимости кислот, солей и оснований в воде</h4>
		<table class="solubility-table">${res}</table>`;

        container.html(result);
    	},

	setDataToPatternByArray(arrayData, pattern) {
		var result = "";
		arrayData.forEach(function(data){
			result += self.setDataToPattern(data, pattern);
		});
		return result;
	},

	setDataToPattern(params, pattern) {
		let result = pattern;
		Object.keys(params).forEach(function(key){
			result = result.replace(new RegExp(key, 'g'), params[key]);
		});
		return result;
	}

};





/* --- src/ui_solubility_table_data.js --- */
var SOLUBLE = {
	text: "Р",
	className: "soluble",
	title: "Вещество растворимо в воде"
};
var SLIGHTLY_SOLUBLE = {
	text: "М",
	className: "slightly-soluble",
	title: "Вещество малорастворимо в воде"
};
var INSOLUBLE = {
	text: "Н",
	className: "insoluble",
	title: "Вещество не растворимо в воде"
};
var HYDROLYZED = {
	text: "Г",
	className: "hydrolyzed",
	title: "Вещество гидролизуется"
};
var DOES_NOT_EXIST = {
	text: "-",
	className: "does-not-exist",
	title: "Вещество не существует"
};

var cations = [
	{
		"elem_id": "hydrogen_ion",
		"elem_sign": "H<sup>+</sup>",
	},
	{
		"elem_id": "lithium_ion",
		"elem_sign": "Li<sup>+</sup>",
	},
	{
		"elem_id": "potassium_ion",
		"elem_sign": "K<sup>+</sup>"
	},
	{
		"elem_id": "sodium_ion",
		"elem_sign": "Na<sup>+</sup>"
	},
	{
		"elem_id": "ammonium_ion",
		"elem_sign": "NH<sub>4</sub><sup>+</sup>"
	},
	{
		"elem_id": "magnesium_ion",
		"elem_sign": "Mg<sup>2+</sup>"
	},
	{
		"elem_id": "calcium_ion",
		"elem_sign": "Ca<sup>2+</sup>"
	},
	{
		"elem_id": "barium_ion",
		"elem_sign": "Ba<sup>2+</sup>"
	},
	{
		"elem_id": "strontium_ion",
		"elem_sign": "Sr<sup>2+</sup>"
	},
	{
		"elem_id": "aluminium_ion",
		"elem_sign": "Al<sup>3+</sup>"
	},
	{
		"elem_id": "chromium_ion",
		"elem_sign": "Cr<sup>3+</sup>"
	},
	{
		"elem_id": "ferrous_ion",
		"elem_sign": "Fe<sup>2+</sup>"
	},
	{
		"elem_id": "ferric_ion",
		"elem_sign": "Fe<sup>3+</sup>"
	},
	{
		"elem_id": "zinc_ion",
		"elem_sign": "Zn<sup>2+</sup>"
	},
	{
		"elem_id": "argentous_ion",
		"elem_sign": "Ag<sup>+</sup>"
	},
	{
		"elem_id": "plumbous_ion",
		"elem_sign": "Pb<sup>2+</sup>"
	},
	{
		"elem_id": "cupric_ion",
		"elem_sign": "Cu<sup>2+</sup>"
	},
	{
		"elem_id": "mercurous_ion",
		"elem_sign": "Hg<sup>+</sup>"
	},
	{
		"elem_id": "mercuric_ion",
		"elem_sign": "Hg<sup>2+</sup>"
	},
	{
		"elem_id": "manganese_ion",
		"elem_sign": "Mn<sup>2+</sup>"
	},
	{
		"elem_id": "stannous_ion",
		"elem_sign": "Sn<sup>2+</sup>"
	},
	{
		"elem_id": "nickel_ion",
		"elem_sign": "Ni<sup>2+</sup>"
	},
	{
		"elem_id": "cobalt_ion",
		"elem_sign": "Co<sup>2+</sup>"
	},
];

var anions = [
	{
		"elem_id": "hydroxide_ion",
		"elem_sign": "OH<sup>-</sup>",
		values: {
			hydrogen_ion: SOLUBLE,
			lithium_ion: SOLUBLE,
			potassium_ion: SOLUBLE,
			sodium_ion: SOLUBLE,
			ammonium_ion: SOLUBLE,
			magnesium_ion: INSOLUBLE,
			calcium_ion: SLIGHTLY_SOLUBLE,
			barium_ion: SOLUBLE,
			strontium_ion: SLIGHTLY_SOLUBLE,
			aluminium_ion: INSOLUBLE,
			chromium_ion: INSOLUBLE,
			ferrous_ion: INSOLUBLE,
			ferric_ion: INSOLUBLE,
			zinc_ion: INSOLUBLE,
			argentous_ion: DOES_NOT_EXIST,
			plumbous_ion: SLIGHTLY_SOLUBLE,
			cupric_ion: INSOLUBLE,
			mercurous_ion: DOES_NOT_EXIST,
			mercuric_ion: DOES_NOT_EXIST,
			manganese_ion: INSOLUBLE,
			stannous_ion: INSOLUBLE,
			nickel_ion: SLIGHTLY_SOLUBLE,
			cobalt_ion: INSOLUBLE
		}
	},
	{
		"elem_id": "fluoride_ion",
		"elem_sign": "F<sup>-</sup>",
		values: {
			hydrogen_ion: SOLUBLE,
			lithium_ion: SLIGHTLY_SOLUBLE,
			potassium_ion: SOLUBLE,
			sodium_ion: SOLUBLE,
			ammonium_ion: SOLUBLE,
			magnesium_ion: SLIGHTLY_SOLUBLE,
			calcium_ion: INSOLUBLE,
			barium_ion: SLIGHTLY_SOLUBLE,
			strontium_ion: SLIGHTLY_SOLUBLE,
			aluminium_ion: SLIGHTLY_SOLUBLE,
			chromium_ion: SOLUBLE,
			ferrous_ion: SLIGHTLY_SOLUBLE,
			ferric_ion: SLIGHTLY_SOLUBLE,
			zinc_ion: SOLUBLE,
			argentous_ion: SOLUBLE,
			plumbous_ion: SLIGHTLY_SOLUBLE,
			cupric_ion: SOLUBLE,
			mercurous_ion: HYDROLYZED,
			mercuric_ion: HYDROLYZED,
			manganese_ion: SOLUBLE,
			stannous_ion: SOLUBLE,
			nickel_ion: SOLUBLE,
			cobalt_ion: SOLUBLE
		}
	},
	{
		"elem_id": "chloride_ion",
		"elem_sign": "Cl<sup>-</sup>",
		values: {
			hydrogen_ion: SOLUBLE,
			lithium_ion: SOLUBLE,
			potassium_ion: SOLUBLE,
			sodium_ion: SOLUBLE,
			ammonium_ion: SOLUBLE,
			magnesium_ion: SOLUBLE,
			calcium_ion: SOLUBLE,
			barium_ion: SOLUBLE,
			strontium_ion: SOLUBLE,
			aluminium_ion: SOLUBLE,
			chromium_ion: SLIGHTLY_SOLUBLE,
			ferrous_ion: SOLUBLE,
			ferric_ion: SOLUBLE,
			zinc_ion: SOLUBLE,
			argentous_ion: INSOLUBLE,
			plumbous_ion: SLIGHTLY_SOLUBLE,
			cupric_ion: SOLUBLE,
			mercurous_ion: INSOLUBLE,
			mercuric_ion: SOLUBLE,
			manganese_ion: SOLUBLE,
			stannous_ion: HYDROLYZED,
			nickel_ion: SOLUBLE,
			cobalt_ion: SOLUBLE
		}
	},
	{
		"elem_id": "bromide_ion",
		"elem_sign": "Br<sup>-</sup>",
		values: {
			hydrogen_ion: SOLUBLE,
			lithium_ion: SOLUBLE,
			potassium_ion: SOLUBLE,
			sodium_ion: SOLUBLE,
			ammonium_ion: SOLUBLE,
			magnesium_ion: SOLUBLE,
			calcium_ion: SOLUBLE,
			barium_ion: SOLUBLE,
			strontium_ion: SOLUBLE,
			aluminium_ion: SOLUBLE,
			chromium_ion: SOLUBLE,
			ferrous_ion: SOLUBLE,
			ferric_ion: SOLUBLE,
			zinc_ion: SOLUBLE,
			argentous_ion: INSOLUBLE,
			plumbous_ion: SLIGHTLY_SOLUBLE,
			cupric_ion: SOLUBLE,
			mercurous_ion: INSOLUBLE,
			mercuric_ion: SLIGHTLY_SOLUBLE,
			manganese_ion: SOLUBLE,
			stannous_ion: HYDROLYZED,
			nickel_ion: SOLUBLE,
			cobalt_ion: SOLUBLE
		}
	},
	{
		"elem_id": "iodide_ion",
		"elem_sign": "I<sup>-</sup>",
		values: {
			hydrogen_ion: SOLUBLE,
			lithium_ion: SOLUBLE,
			potassium_ion: SOLUBLE,
			sodium_ion: SOLUBLE,
			ammonium_ion: SOLUBLE,
			magnesium_ion: SOLUBLE,
			calcium_ion: SOLUBLE,
			barium_ion: SOLUBLE,
			strontium_ion: SOLUBLE,
			aluminium_ion: SOLUBLE,
			chromium_ion: SOLUBLE,
			ferrous_ion: SOLUBLE,
			ferric_ion: DOES_NOT_EXIST,
			zinc_ion: SOLUBLE,
			argentous_ion: INSOLUBLE,
			plumbous_ion: SLIGHTLY_SOLUBLE,
			cupric_ion: DOES_NOT_EXIST,
			mercurous_ion: INSOLUBLE,
			mercuric_ion: SLIGHTLY_SOLUBLE,
			manganese_ion: SOLUBLE,
			stannous_ion: SLIGHTLY_SOLUBLE,
			nickel_ion: SOLUBLE,
			cobalt_ion: SOLUBLE
		}
	},
	{
		"elem_id": "sulfide_ion",
		"elem_sign": "S<sup>2-</sup>",
		values: {
			hydrogen_ion: SOLUBLE,
			lithium_ion: SOLUBLE,
			potassium_ion: SOLUBLE,
			sodium_ion: SOLUBLE,
			ammonium_ion: SOLUBLE,
			magnesium_ion: HYDROLYZED,
			calcium_ion: HYDROLYZED,
			barium_ion: SOLUBLE,
			strontium_ion: INSOLUBLE,
			aluminium_ion: HYDROLYZED,
			chromium_ion: HYDROLYZED,
			ferrous_ion: INSOLUBLE,
			ferric_ion: HYDROLYZED,
			zinc_ion: INSOLUBLE,
			argentous_ion: INSOLUBLE,
			plumbous_ion: INSOLUBLE,
			cupric_ion: INSOLUBLE,
			mercurous_ion: DOES_NOT_EXIST,
			mercuric_ion: INSOLUBLE,
			manganese_ion: SLIGHTLY_SOLUBLE,
			stannous_ion: INSOLUBLE,
			nickel_ion: INSOLUBLE,
			cobalt_ion: SLIGHTLY_SOLUBLE
		}
	},
	{
		"elem_id": "sulfite_ion",
		"elem_sign": "SO<sub>3</sub><sup>2-</sup>",
		values: {
			hydrogen_ion: SOLUBLE,
			lithium_ion: SOLUBLE,
			potassium_ion: SOLUBLE,
			sodium_ion: SOLUBLE,
			ammonium_ion: SOLUBLE,
			magnesium_ion: INSOLUBLE,
			calcium_ion: INSOLUBLE,
			barium_ion: INSOLUBLE,
			strontium_ion: INSOLUBLE,
			aluminium_ion: DOES_NOT_EXIST,
			chromium_ion: DOES_NOT_EXIST,
			ferrous_ion: HYDROLYZED,
			ferric_ion: DOES_NOT_EXIST,
			zinc_ion: INSOLUBLE,
			argentous_ion: INSOLUBLE,
			plumbous_ion: INSOLUBLE,
			cupric_ion: DOES_NOT_EXIST,
			mercurous_ion: DOES_NOT_EXIST,
			mercuric_ion: INSOLUBLE,
			manganese_ion: INSOLUBLE,
			stannous_ion: DOES_NOT_EXIST,
			nickel_ion: INSOLUBLE,
			cobalt_ion: INSOLUBLE
		}
	},
	{
		"elem_id": "sulfate_ion",
		"elem_sign": "SO<sub>4</sub><sup>2-</sup>",
		values: {
			hydrogen_ion: SOLUBLE,
			lithium_ion: SOLUBLE,
			potassium_ion: SOLUBLE,
			sodium_ion: SOLUBLE,
			ammonium_ion: SOLUBLE,
			magnesium_ion: SOLUBLE,
			calcium_ion: SLIGHTLY_SOLUBLE,
			barium_ion: INSOLUBLE,
			strontium_ion: SLIGHTLY_SOLUBLE,
			aluminium_ion: SOLUBLE,
			chromium_ion: SOLUBLE,
			ferrous_ion: SOLUBLE,
			ferric_ion: SOLUBLE,
			zinc_ion: SOLUBLE,
			argentous_ion: SLIGHTLY_SOLUBLE,
			plumbous_ion: SLIGHTLY_SOLUBLE,
			cupric_ion: SOLUBLE,
			mercurous_ion: SLIGHTLY_SOLUBLE,
			mercuric_ion: HYDROLYZED,
			manganese_ion: SOLUBLE,
			stannous_ion: HYDROLYZED,
			nickel_ion: SOLUBLE,
			cobalt_ion: SOLUBLE
		}
	},
	{
		"elem_id": "phosphate_ion",
		"elem_sign": "PO<sub>4</sub><sup>3-</sup>",
		values: {
			hydrogen_ion: SOLUBLE,
			lithium_ion: SLIGHTLY_SOLUBLE,
			potassium_ion: SOLUBLE,
			sodium_ion: SOLUBLE,
			ammonium_ion: HYDROLYZED,
			magnesium_ion: INSOLUBLE,
			calcium_ion: INSOLUBLE,
			barium_ion: INSOLUBLE,
			strontium_ion: INSOLUBLE,
			aluminium_ion: INSOLUBLE,
			chromium_ion: INSOLUBLE,
			ferrous_ion: INSOLUBLE,
			ferric_ion: INSOLUBLE,
			zinc_ion: INSOLUBLE,
			argentous_ion: INSOLUBLE,
			plumbous_ion: INSOLUBLE,
			cupric_ion: SLIGHTLY_SOLUBLE,
			mercurous_ion: INSOLUBLE,
			mercuric_ion: INSOLUBLE,
			manganese_ion: INSOLUBLE,
			stannous_ion: INSOLUBLE,
			nickel_ion: INSOLUBLE,
			cobalt_ion: INSOLUBLE
		}
	},
	{
		"elem_id": "carbonate_ion",
		"elem_sign": "CO<sub>3</sub><sup>2-</sup>",
		values: {
			hydrogen_ion: SOLUBLE,
			lithium_ion: SOLUBLE,
			potassium_ion: SOLUBLE,
			sodium_ion: SOLUBLE,
			ammonium_ion: SOLUBLE,
			magnesium_ion: SLIGHTLY_SOLUBLE,
			calcium_ion: INSOLUBLE,
			barium_ion: INSOLUBLE,
			strontium_ion: SLIGHTLY_SOLUBLE,
			aluminium_ion: DOES_NOT_EXIST,
			chromium_ion: DOES_NOT_EXIST,
			ferrous_ion: INSOLUBLE,
			ferric_ion: DOES_NOT_EXIST,
			zinc_ion: INSOLUBLE,
			argentous_ion: SLIGHTLY_SOLUBLE,
			plumbous_ion: INSOLUBLE,
			cupric_ion: HYDROLYZED,
			mercurous_ion: INSOLUBLE,
			mercuric_ion: DOES_NOT_EXIST,
			manganese_ion: INSOLUBLE,
			stannous_ion: DOES_NOT_EXIST,
			nickel_ion: INSOLUBLE,
			cobalt_ion: INSOLUBLE
		}
	},
	{
		"elem_id": "metasilicate_ion",
		"elem_sign": "SiO<sub>3</sub><sup>2-</sup>",
		values: {
			hydrogen_ion: INSOLUBLE,
			lithium_ion: INSOLUBLE,
			potassium_ion: SOLUBLE,
			sodium_ion: SOLUBLE,
			ammonium_ion: DOES_NOT_EXIST,
			magnesium_ion: HYDROLYZED,
			calcium_ion: INSOLUBLE,
			barium_ion: INSOLUBLE,
			strontium_ion: INSOLUBLE,
			aluminium_ion: HYDROLYZED,
			chromium_ion: HYDROLYZED,
			ferrous_ion: HYDROLYZED,
			ferric_ion: HYDROLYZED,
			zinc_ion: HYDROLYZED,
			argentous_ion: DOES_NOT_EXIST,
			plumbous_ion: HYDROLYZED,
			cupric_ion: HYDROLYZED,
			mercurous_ion: DOES_NOT_EXIST,
			mercuric_ion: DOES_NOT_EXIST,
			manganese_ion: HYDROLYZED,
			stannous_ion: HYDROLYZED,
			nickel_ion: HYDROLYZED,
			cobalt_ion: HYDROLYZED
		}
	},
	{
		"elem_id": "nitrate_ion",
		"elem_sign": "NO<sub>3</sub><sup>-</sup>",
		values: {
			hydrogen_ion: SOLUBLE,
			lithium_ion: SOLUBLE,
			potassium_ion: SOLUBLE,
			sodium_ion: SOLUBLE,
			ammonium_ion: SOLUBLE,
			magnesium_ion: SOLUBLE,
			calcium_ion: SOLUBLE,
			barium_ion: SOLUBLE,
			strontium_ion: SOLUBLE,
			aluminium_ion: SOLUBLE,
			chromium_ion: SOLUBLE,
			ferrous_ion: SOLUBLE,
			ferric_ion: SOLUBLE,
			zinc_ion: SOLUBLE,
			argentous_ion: SOLUBLE,
			plumbous_ion: SOLUBLE,
			cupric_ion: SOLUBLE,
			mercurous_ion: HYDROLYZED,
			mercuric_ion: SOLUBLE,
			manganese_ion: SOLUBLE,
			stannous_ion: SOLUBLE,
			nickel_ion: SOLUBLE,
			cobalt_ion: SOLUBLE
		}
	},
	{
		"elem_id": "acetate_ion",
		"elem_sign": "CH<sub>3</sub>COO<sup>-</sup>",
		values: {
			hydrogen_ion: SOLUBLE,
			lithium_ion: SOLUBLE,
			potassium_ion: SOLUBLE,
			sodium_ion: SOLUBLE,
			ammonium_ion: SOLUBLE,
			magnesium_ion: SOLUBLE,
			calcium_ion: SOLUBLE,
			barium_ion: SOLUBLE,
			strontium_ion: SOLUBLE,
			aluminium_ion: HYDROLYZED,
			chromium_ion: SOLUBLE,
			ferrous_ion: SOLUBLE,
			ferric_ion: HYDROLYZED,
			zinc_ion: SOLUBLE,
			argentous_ion: SOLUBLE,
			plumbous_ion: SOLUBLE,
			cupric_ion: SOLUBLE,
			mercurous_ion: SLIGHTLY_SOLUBLE,
			mercuric_ion: SOLUBLE,
			manganese_ion: SOLUBLE,
			stannous_ion: SOLUBLE,
			nickel_ion: SOLUBLE,
			cobalt_ion: SOLUBLE
		}
	},
	{
		"elem_id": "chromate_ion",
		"elem_sign": "CrO<sub>4</sub><sup>2-</sup>",
		values: {
			hydrogen_ion: SOLUBLE,
			lithium_ion: SOLUBLE,
			potassium_ion: SOLUBLE,
			sodium_ion: SOLUBLE,
			ammonium_ion: SOLUBLE,
			magnesium_ion: SOLUBLE,
			calcium_ion: SLIGHTLY_SOLUBLE,
			barium_ion: INSOLUBLE,
			strontium_ion: SLIGHTLY_SOLUBLE,
			aluminium_ion: HYDROLYZED,
			chromium_ion: HYDROLYZED,
			ferrous_ion: HYDROLYZED,
			ferric_ion: HYDROLYZED,
			zinc_ion: INSOLUBLE,
			argentous_ion: INSOLUBLE,
			plumbous_ion: INSOLUBLE,
			cupric_ion: INSOLUBLE,
			mercurous_ion: INSOLUBLE,
			mercuric_ion: INSOLUBLE,
			manganese_ion: INSOLUBLE,
			stannous_ion: HYDROLYZED,
			nickel_ion: INSOLUBLE,
			cobalt_ion: INSOLUBLE
		}
	},
	{
		"elem_id": "chlorate_ion",
		"elem_sign": "CIO<sub>4</sub><sup>-</sup>",
		values: {
			hydrogen_ion: SOLUBLE,
			lithium_ion: SOLUBLE,
			potassium_ion: SOLUBLE,
			sodium_ion: SOLUBLE,
			ammonium_ion: SOLUBLE,
			magnesium_ion: SOLUBLE,
			calcium_ion: SOLUBLE,
			barium_ion: SOLUBLE,
			strontium_ion: SOLUBLE,
			aluminium_ion: SOLUBLE,
			chromium_ion: SOLUBLE,
			ferrous_ion: SOLUBLE,
			ferric_ion: SOLUBLE,
			zinc_ion: SOLUBLE,
			argentous_ion: SOLUBLE,
			plumbous_ion: SOLUBLE,
			cupric_ion: SOLUBLE,
			mercurous_ion: SOLUBLE,
			mercuric_ion: SOLUBLE,
			manganese_ion: SOLUBLE,
			stannous_ion: SOLUBLE,
			nickel_ion: SOLUBLE,
			cobalt_ion: SOLUBLE
		}
	},
];


/* --- src/solubility_table-component.js --- */
/**
 * Solubility table component.
 */
SolubilityTableComponent.DrawComponent = {
    ext_lang: 'ui_solubility_table',
    formats: ['format_ui_solubility_table_json'],
    struct_support: true,
    factory: function (sandbox) {
        return new SolubilityTableComponent.DrawWindow(sandbox);
    }
};

SolubilityTableComponent.DrawWindow = function (sandbox) {
    this.sandbox = sandbox;
    this.paintPanel = new SolubilityTableComponent.PaintPanel(this.sandbox.container);
    this.paintPanel.init();
    this.recieveData = function (data) {
        console.log("in recieve data" + data);
    };

    var scElements = {};

    function drawAllElements() {
        var dfd = new jQuery.Deferred();
        // for (var addr in scElements) {
        jQuery.each(scElements, function (j, val) {
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
SCWeb.core.ComponentManager.appendComponentInitialize(SolubilityTableComponent.DrawComponent);


