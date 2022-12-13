/**
 * ElectronLayerBuilder.
 */
var protonNumber = [2, 10, 18, 36, 54, 86, 118],
    orbitalLayers = ['s','p','d','f','g'],
    layerProtonsNum = {
        's': 2,
        'p': 6,
        'd': 10,
        'f': 14,
        'g': 18,
    }
var elementsStr = `H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og`;
var elemProtonNum = 1;

function setStyles(el){
    el.append(`<style style="display:none">
    #root{width: 500px;overflow: auto;}
    #root2{min-height: 120px;}
    .orbital{
        width: 30px;height: 30px;box-sizing: border-box;background-color: white;border: 1px solid black;
    }
    .orbital.single{background-image: url(https://pp.userapi.com/c840331/v840331004/7edbb/jCPpvoMuV5s.jpg);}
    .orbital.double{background-image: url(https://pp.userapi.com/c840331/v840331004/7edc2/cIsUfQkif0E.jpg);}
    .level{font-size: 0;max-width: 530px;}
    .level:before{font-size: 16px;position: relative;top: -10px;}
    .level > div {display: inline-block;}
    .s-level{margin-left: 10px;}
    .s-level:before{content: "s ";}
    .p-level{margin-left: 40px;}
    .p-level:before{content: "p ";}
    .d-level{margin-left: 130px;}
    .d-level:before{content: "d ";}
    .f-level{margin-left: 280px;}
    .f-level:before{content: "f ";}
    .g-level{ margin-left: 490px;}
    .g-level:before{content: "g ";}
    </style>`);
}

function repaint(elem, inputVal, level){
	
	if(inputVal){
		elem.append('<div id="root"><div id="root2">'+level+'</div></div>');
	}
	else{
		elem.append('<div id="root"><div id="root2"></div></div>');
	}
}

function createLevel(key, freeProtons){
    let requiredProt = 0;

    let single_cell = [],
        double_cell = [],
        empty_cell = [];

    let level='';

    requiredProt = layerProtonsNum[key];
	
    switch(Math.floor(freeProtons/(requiredProt/2))){
        case 0: {
            let empty = (requiredProt/2) - freeProtons;
            while(freeProtons > 0){
                level += `<div class='orbital single'></div>`;
                freeProtons--;
            }
            while(empty > 0){
                level += `<div class='orbital'></div>`;
                empty--;
            }
            break;
        }
        case 1: {
            let double = freeProtons - (requiredProt/2);
            let single = (requiredProt/2) - double;
            while(double > 0){
                level += `<div class='orbital double'></div>`;
                double--;
            }
            while(single > 0){
                level += `<div class='orbital single'></div>`;
                single--;
            }
            
            break;
        }
        default: {
            let double = requiredProt/2;
            while(double > 0){
                level += `<div class='orbital double'></div>`;
                double--;
            }
            break;
        }

    }
    level = `<div class='level `+key+`-level'>` + level + `</div>`;
	
	return {
        level,
        requiredProt
    };
};

ElectronLayerBuilder.PaintPanel = function (containerId) {
    this.containerId = containerId;
};

ElectronLayerBuilder.PaintPanel.prototype = {

    init: function () {
        this._initMarkup(this.containerId);
    },

    _initMarkup: function (containerId) {
        var container = $('#' + containerId);

        var self = this;

	var levelArea = $('#root2'),
	        inputField = $('#inputField'),
	        periodNum,
	        protons,
	        freeProtons,
        	levelHTML;
	

self._showMainMenuNode();


	
	container.append('<h2>Введите количество протонов</h2>');
	container.append('<p>Нажмите Enter, чтобы построить последний энергетический уровень элемента</p>');
	container.append('<input type="text" id="inputField">');
	container.append('<button id="gotoElem" type="button">Перейти к элементу</button>');

	container.append('<br><hr><br>');
	setStyles(container);
	container.append('<div id="root"><div id="root2"></div></div>');

	$('#gotoElem').click(() => {self._showMainMenuNode();});

	$('#inputField').keypress((e) => {
	        if (e.keyCode === 13 && inputField.context.activeElement.value && +inputField.context.activeElement.value + 1 <= 119){
	            periodNum = 1;
	            protons = inputField.context.activeElement.value;
		elemProtonNum = +protons;
	            levelHTML = '';
	            for(let i =0, len = protonNumber.length; i < len; i++){
	                if(protons <= protonNumber[i]){
	                    periodNum = i + 1;
	                    break;
	                }
	            }
	            freeProtons = periodNum!== 1 ? protons - protonNumber[periodNum-2] : protons;
	            for(let i = 0, len = orbitalLayers.length; i < len; i++){
	                const {level, requiredProt} = createLevel(orbitalLayers[i], freeProtons);
	                levelHTML = level + levelHTML;
	                freeProtons = freeProtons - requiredProt;
	                if(freeProtons <= 0 )
	                    break;
	            }

			container[0].children[container[0].children.length -1].remove();
			repaint(container, inputField.context.activeElement.value, levelHTML + '<p>Внешний ('+periodNum+'-й) слой атома</p>')
	        }
	})

	
    },

    /* Call agent of searching semantic neighborhood,
	send ui_main_menu node as parameter and add it in web window history
	*/
	_showMainMenuNode: function () {
		var addr;
		console.log(elemProtonNum)
		var elem = 'elem_'+elementsStr.split(' ')[elemProtonNum-1];
		console.log(elem)
		// Resolve sc-addr. Get sc-addr of ui_main_menu node
		SCWeb.core.Server.resolveScAddr([elem], function (keynodes) {
			addr = keynodes[elem];
			console.log(addr);
			
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
						SCWeb.ui.WindowManager.appendToHistoryItem(result.question);
					}
				});
			});
		});
	},
};