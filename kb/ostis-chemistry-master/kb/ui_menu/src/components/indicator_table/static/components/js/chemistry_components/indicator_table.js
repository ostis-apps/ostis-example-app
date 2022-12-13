/* --- src/indicator_table-common.js --- */
var IndicatorTableComponent = {};

function extend(child, parent) {
    var F = function () {
    };
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    child.superclass = parent.prototype;
}


/* --- src/ui_indicator_table.js --- */

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





/* --- src/ui_indicator_table_data.js --- */


/* --- src/indicator_table-component.js --- */
/**
 * Indicator table component.
 */
IndicatorTableComponent.DrawComponent = {
    ext_lang: 'ui_indicator_table',
    formats: ['format_ui_indicator_table_json'],
    struct_support: true,
    factory: function (sandbox) {
        return new IndicatorTableComponent.DrawWindow(sandbox);
    }
};

IndicatorTableComponent.DrawWindow = function (sandbox) {
    this.sandbox = sandbox;
    this.paintPanel = new IndicatorTableComponent.PaintPanel(this.sandbox.container);
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
SCWeb.core.ComponentManager.appendComponentInitialize(IndicatorTableComponent.DrawComponent);


