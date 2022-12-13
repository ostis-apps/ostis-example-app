
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



