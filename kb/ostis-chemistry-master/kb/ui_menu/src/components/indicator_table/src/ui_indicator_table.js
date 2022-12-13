
IndicatorTableComponent.PaintPanel = function (containerId) {
    this.containerId = containerId;
};

IndicatorTableComponent.PaintPanel.prototype = {

    init: function () {
        this._initMarkup(this.containerId);
    },

    _initMarkup: function (containerId) {
        var container = $('#' + containerId);
        var ids = ["indicator", "litmus", "methyl_orange", "phenolphthalein", "color_red", "color_purple", "color_blue", "color_pink", "color_orange", "color_yellow", "no_color", "color_crimson"];
        var self = this;
        SCWeb.core.Server.resolveScAddr(ids, function (keynodes) {
            self._initTable(container, keynodes);
        });
	
    	},

	_initTable: function (container, keynodes) {
        
	var result = "";

	var res = `
<table>
		<thead style="background-color: beige">
    <tr>
      <th width="20%"></th>
      <th colspan="3">Среда</th>
    </tr>
    <tr>
      <th>Индикаторы</th>
      <th>Кислая</th>
      <th>Нейтральная</th>
      <th>Щелочная</th>
    </tr>
  </thead>
  <tbody>
   <tr>
      <th class="left-colors" sc_addr="${keynodes["litmus"]}">Лакмус</a></th>
      <td style="background-color: red" sc_addr="${keynodes["color_red"]}"> красный</td>
      <td style="background-color: purple" sc_addr="${keynodes["color_purple"]}"> фиолетовый</td>
      <td style="background-color: blue" sc_addr="${keynodes["color_blue"]}"> синий</td>
    </tr>
    <tr>
      <th class="left-colors" sc_addr="${keynodes["methyl_orange"]}"> Метилоранж</th>
      <td style="background-color: pink" sc_addr="${keynodes["color_pink"]}"> розовый</td>
      <td style="background-color: orange" sc_addr="${keynodes["color_orange"]}"> оранжевый</td>
      <td style="background-color: yellow" sc_addr="${keynodes["color_yellow"]}"> желтый</td>
    </tr>
    <tr>
      <th class="left-colors" sc_addr="${keynodes["phenolphthalein"]}"> Фенолфталеин</th>
      <td class="colorless" sc_addr="${keynodes["no_color"]}"> бесцветный</td>
      <td class="colorless" sc_addr="${keynodes["no_color"]}"> бесцветный</td>
      <td style="background-color: crimson" sc_addr="${keynodes["color_crimson"]}"> малиновый</td>
    </tr>
    <tr>
      <th class="left-colors">ph-водородный показатель</th>
      <td class="colorless">pH < 7</td>
      <td class="colorless">pH = 7</td>
      <td class="colorless">pH > 7</td>
    </tr>
  </tbody>
</table>`.trim();

	result = `<h4 >Таблица индикаторов</h4>
		<div>${res}</div>`;

        container.html(result);
    	}   
};



