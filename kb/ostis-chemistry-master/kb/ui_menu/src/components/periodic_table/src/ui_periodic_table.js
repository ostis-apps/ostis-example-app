
PeriodicTableComponent.PaintPanel = function (containerId) {
    this.containerId = containerId;
};

PeriodicTableComponent.PaintPanel.prototype = {

    init: function () {
        this._initMarkup(this.containerId);
    },

    _initMarkup: function (containerId) {
        var container = $('#' + containerId);	
	var ids = [];
        for (el in ptmap) {
            ids.push("elem_" + ptmap[el].symbol);
        }	
	var self = this;
	SCWeb.core.Server.resolveScAddr(ids, function (keynodes) {					
			    		self._initTable(container, keynodes);
				});
	
    	},

	_initTable: function (container, keynodes) {
        
	var res = "";
        for (let row = 0; row <= 10; row++) {
            var cells = "";
            if (row <= 7 && row > 0)
                var n_row = row;
            else n_row = "";
            cells += `
                <div class="periodic_table_period_cell">
                    <div class="periodic_table_period">${n_row}</div>
                </div>
                `.trim();

            for (let col = 1; col <= 18; col++) {
                var id = col + "_" + row;
                var el = ptmap[id];
                if (el) {			
			var id_elem = "elem_" + el.symbol;
                    cells += `
                    <div class="periodic_table_cell">
                        <div class="periodic_table_element ${el.category}" pt_id="${el.symbol}" sc_addr="${keynodes[id_elem]}">
                            <div class="periodic_table_number">${el.number}</div>
                            <div class="periodic_table_symbol">${el.symbol}</div>
                            <div class="periodic_table_name">${el.name_ru}</div>
                        </div>
                    </div>
                    `.trim();
                } else {
                    if ((row === 0 && (col === 1 || col === 18)) || (row === 1 && (col === 2 || (col >= 13 && col <= 18))) || (row === 3 && (col >= 3 && col <= 12))) {


                        cells += `<div class="periodic_table_cell">
                                <div class="periodic_table_group">${col}</div>
                            </div>`.trim();
                    }
                    else {
                        if ((row === 6 && col === 3) || (row === 9 && col === 2))

                            cells += `<div class="periodic_table_cell">
                                <div class="periodic_table_link">*</div>
                                </div>`.trim();

                        else if ((row === 7 && col === 3) || (row === 10 && col === 2))
                            cells += `<div class="periodic_table_cell">
                                <div class="periodic_table_link">**</div>
                                </div>`.trim();
                        else cells += `<div class="periodic_table_cell">${name}</div>`.trim();
                    }
                }
            }
            res += `<div class="periodic_table_row">${cells}</div>`;
        }
        res = `<div class="periodic_table">${res}</div>`;
        container.html(res);	
	}    
};



