/* --- src/drFormula-common.js --- */
var DrFormulaComponent = {};

function extend(child, parent) {
    var F = function () {
    };
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    child.superclass = parent.prototype;
}


/* --- src/drFormula-paintPanel.js --- */
/**
 * Paint panel.
 */
function setStyles(el){
    el.append(`<style style="display:none">
    .column{display: -webkit-inline-flex;display: inline-flex;flex-direction: column;}
    .element-column{width: auto;min-width: 40px;margin-right: 3px;}
    .bonding-column{padding: 5px 0;}
    .element{text-align: center;font-size: 20px;margin: auto;height: 30px;line-height: 30px;text-transform: capitalize;}
    .oh-element{margin: auto;display: flex;}
    .ho-element{margin: auto;display: flex;flex-direction: row-reverse;}
    .oh-element > .element, .ho-element > .element{width: 30px;}
    #root2{display: -webkit-inline-flex;display: inline-flex;}
    .bonding{margin: auto;font-size: 0;width: 20px;position: relative;}
    ._dual-bonding{height: 20px;}
    ._single-bonding{height: 10px;}
    ._single-bonding span{position: absolute;font-size: 20px;top: -8px;}
    ._dual-bonding ._1st{font-size: 20px;position: absolute;top: -5px;}
    ._dual-bonding ._2nd{font-size: 20px;position: absolute;top: 0px;}
    </style>`);
};

function repaint(elem, inputVal, level){
	
	if(inputVal){
        elem.html(level);
    }
    else{
        elem.html('');
    }
};

const ACID_GROUPS = {
    'no3': 1,
    'f': 1,
    'cl': 1,
    'br': 1,
    'i': 1,
    'so4': 2,
    'so3': 2,
    's': 2,
    'co3': 2,
    'sio3': 2,
    'po4': 3,
},
    METALS = [
        "li",
        "na",
        "k",
        "rb",
        "cs",
        "fr",
        "ca",
        "sr",
        "ba",
        "ra",
        "be",
        "mg",
        "sc",
        "ti",
        "v",
        "cr",
        "mn",
        "fe",
        "co",
        "ni",
        "cu",
        "zn",
        "y",
        "zr",
        "nb",
        "mo",
        "tc",
        "ru",
        "rh",
        "pd",
        "ag",
        "cd",
        "la",
        "hf",
        "ta",
        "w",
        "re",
        "os",
        "ir",
        "pt",
        "au",
        "hg",
        "ac",
        "rf",
        "db",
        "sg",
        "bh",
        "hs",
        "mt",
        "ds",
        "rg",
        "cn",
        "al",
        "ga",
        "in",
        "sn",
        "tl",
        "pb",
        "bi",
        "b",
        "si",
        "ge",
        "as",
        "sb",
        "te",
        "po"
      ],
    HYDROXIDE_GROUP = 'oh';

const HYDROXIDE = 'HYDROXIDE',
    SALT = 'SALT',
    ACID = 'ACID',
    OXIDE = 'OXIDE',
    UNKNOWN_SUBSTANSE = 'UNKNOWN_SUBSTANSE';

const decorateFormulaArea = (flaView, maxCount) => {
    return `<div id="root2" style="height: ${maxCount*30}px;">
        ${flaView}
        </div>`
}

const singleBond = '<div class="_single-bonding bonding"',
    dualBond = '<div class="_dual-bonding bonding"',
    dashSpan = '<span>—</span></div>';
    dualDash = '<div class="_1st">—</div><div class="_2nd">—</div></div>'

const drawElementColumn = (el, count) => {
    let column = "";
    for(let i = 0; i < count; i++){
        column += el === HYDROXIDE_GROUP ? (
            `<div class="oh-element"> 
                <div class="element">O</div>
                ${singleBond}>${dashSpan}
                <div class="element">H</div>
            </div>`
        ) : el === 'ho' ? (
            `<div class="ho-element"> 
                <div class="element">O</div>
                ${singleBond}>${dashSpan}
                <div class="element">H</div>
            </div>`
        ) : '<div class="element">'+el+'</div>';
    }
    column = '<div class="element-column column">' + column + '</div>';
    return column;
}

const drawBondColumn = (f_el_count, s_el_count, isSingleBonding = false) => {
    if (!f_el_count || !s_el_count) return '';
    switch (f_el_count){
        case 1: {
            return s_el_count === 1 ? (
                isSingleBonding ? 
                `<div class="bonding-column column">${singleBond}>${dashSpan}</div>`
                : `<div class="bonding-column column">${dualBond}>${dualDash}</div>`
            ) : (
                s_el_count === 2 ? (
                    isSingleBonding ? 
                    `<div class="bonding-column column">
                        ${singleBond} style="transform: rotate(-15deg)">${dashSpan}
                        ${singleBond} style="transform: rotate(15deg)">${dashSpan}
                    </div>`
                    : `<div class="bonding-column column">
                        ${dualBond} style="transform: rotate(-15deg)">${dualDash}
                        ${dualBond} style="transform: rotate(15deg)">${dualDash}
                    </div>`
                ) : (
                    s_el_count === 3 ? (
                        isSingleBonding ?
                        `<div class="bonding-column column">
                            ${singleBond} style="transform: rotate(-20deg)">${dashSpan}
                            ${singleBond}>${dashSpan}
                            ${singleBond} style="transform: rotate(20deg)">${dashSpan}
                        </div>`
                        : `<div class="bonding-column column">
                            ${dualBond} style="transform: rotate(-20deg)">${dualDash}
                            ${dualBond}>${dualDash}
                            ${dualBond} style="transform: rotate(20deg)">${dualDash}
                        </div>`
                    ) : (
                        ''
                    )
                )
            )
        }
        case 2: {
            return s_el_count === 1 ? (
                isSingleBonding ? 
                `<div class="bonding-column column">
                    ${singleBond} style="transform: rotate(15deg)">${dashSpan}
                    ${singleBond} style="transform: rotate(-15deg)">${dashSpan}
                </div>` 
                : `<div class="bonding-column column">
                    ${singleBond} style="transform: rotate(15deg)">${dashSpan}
                    ${singleBond} style="transform: rotate(-15deg)">${dashSpan}
                </div>`
            ) : (
                s_el_count === 3 ? (
                    `<div class="bonding-column column">
                    ${dualBond} style="transform: rotate(-15deg)">${dualDash}
                    ${singleBond} style="transform: rotate(15deg)">${dashSpan}
                    ${singleBond} style="transform: rotate(-15deg)">${dashSpan}
                    ${dualBond} style="transform: rotate(15deg)">${dualDash}
                </div>`
                ) : (
                    s_el_count === 4 ? (
                        ''
                    ) : (
                        s_el_count === 5 ? (
                            `<div class="bonding-column column">
                            ${dualBond} style="transform: rotate(-25deg)">${dualDash}
                            ${dualBond} style="transform: rotate(5deg)">${dualDash}
                            ${singleBond} style="transform: rotate(25deg)">${dashSpan}
                            ${singleBond} style="transform: rotate(-25deg)">${dashSpan}
                            ${dualBond} style="transform: rotate(-5deg)">${dualDash}
                            ${dualBond} style="transform: rotate(25deg)">${dualDash}
                        </div>`
                        ) : (
                            ''
                        )
                    )
                )
            );
        }
        case 3: {
            return '';
        }
        default:
            return '';
    }
}

const isOxide = (fla) => {
    return (fla.substr(-1) === 'o') 
        || (Number.isInteger(+fla.substr(-1)) && fla.substr(-2,1) === 'o');
}

const checkSubstanceKind = (formula) => {
    let _f = formula.toLowerCase();

    if (_f.indexOf(HYDROXIDE_GROUP) !== -1
        && METALS.some(me => _f.indexOf(me) !== -1)) return HYDROXIDE;

    for (let key in ACID_GROUPS) {
        //console.log(key, _f.indexOf(key), _f.length, key.length, _f.length - key.length);
        if (_f.indexOf(key) !== -1 && _f.indexOf(key) === _f.length - key.length) {
           
            return _f[0] === 'h' ? ACID : (
                METALS.some(me => _f.indexOf(me) === 0) 
                    ? SALT : isOxide(_f) 
                        ? OXIDE : UNKNOWN_SUBSTANSE
            );
        };
    }

    if (isOxide(_f)) return OXIDE;
    
    return UNKNOWN_SUBSTANSE;
}

const findOxGroupStruct = (f, el) => {
    let struct = {},
        len = el.length;

    f.substr(-len) === el ? (
        struct[el] = 1,
        f = f.substr(0, f.length - len)
    ) : (
        Number.isInteger(+f.substr(-1)) && f.substr(-len*2, len) === el ? (
            struct[el] = +f.substr(-1), 
            f = el === HYDROXIDE_GROUP ? f.substr(0,f.length - 5) : f.substr(0,f.length - 2)
        ) : null
    );

    Number.isInteger(+f.substr(-1)) ?
        (
            struct[f.substr(0,f.length - 1)] = +f.substr(-1)
        ) : (
            struct[f] = 1
        )

    return struct;
}

const drawOxide = (f) => {
    let struct = {},
        _f = f.toLowerCase(),
        view = '',
        maxCount = 0;

    struct = findOxGroupStruct(_f, 'o');

    let keysArr = Object.keys(struct);
    view = keysArr.reduce((accum, el, index) => {
        maxCount = maxCount > struct[el] ? maxCount : struct[el];
        let nextCount = struct[keysArr[index + 1]];
        return el === 'o' ? 
            accum + drawBondColumn(nextCount, struct[el]) + drawElementColumn(el,struct[el]) 
            : drawElementColumn(el, struct[el]) + drawBondColumn(struct[el], nextCount, el === 'h') + accum;
    }, '');

    return decorateFormulaArea(view, maxCount);
}

const drawHydroxide = (f) => {
    let struct = {},
        _f = f.toLowerCase(),
        view = '',
        maxCount = 0;

    struct = findOxGroupStruct(_f, HYDROXIDE_GROUP);
    //console.log(struct);

    let keysArr = Object.keys(struct);
    view = keysArr.reduce((accum, el, index) => {
        maxCount = maxCount > struct[el] ? maxCount : struct[el];
        let nextCount = struct[keysArr[index + 1]];
        return el === HYDROXIDE_GROUP ? 
            accum + drawBondColumn(nextCount, struct[el], true) + drawElementColumn(el, struct[el]) 
            : drawElementColumn(el, struct[el]) + drawBondColumn(struct[el], nextCount, true) + accum;
    }, '');

    return decorateFormulaArea(view, maxCount);
}

const drawAcid = (f) => {
    let struct = {},
    _f = f.toLowerCase(),
    view = '',
    maxCount = 0,
    minCount = 0;

    let elem = Object.keys(ACID_GROUPS).find(el => _f.indexOf(el) !== -1);
    if(!elem) return null;
    struct = findOxGroupStruct(_f, elem);
    if(elem.indexOf('o') !== -1){
        struct = {
            ...struct, 
            ...findOxGroupStruct(elem, 'o')
        };
        if(struct.o < struct.h) return null;
        minCount = struct.h;
        delete struct[elem];
        delete struct.h;
        struct.o = struct.o - minCount;
        maxCount = minCount;

        let keysArr = Object.keys(struct);
        view = keysArr.reduce((accum, el, index) => {
            maxCount = maxCount > struct[el] ? maxCount : struct[el];
            let nextCount = struct[keysArr[index + 1]];
            return el === 'o' ? 
                accum + drawBondColumn(nextCount, struct[el]) + drawElementColumn(el, struct[el])
                : drawElementColumn(el, struct[el]) + drawBondColumn(struct[el], nextCount) + accum;
        }, '');

        view = drawElementColumn('ho', minCount) + drawBondColumn(minCount, 1, true) + view;
    } else {
        let keysArr = Object.keys(struct);
        view = keysArr.reduce((accum, el, index) => {
            maxCount = maxCount > struct[el] ? maxCount : struct[el];
            let nextCount = struct[keysArr[index + 1]];
            return el === 'h' ? 
                drawElementColumn(el, struct[el]) + drawBondColumn(struct[el], nextCount, true) + accum
                : accum + drawBondColumn(nextCount, struct[el], true) + drawElementColumn(el, struct[el]);
        }, '');
    }
    return decorateFormulaArea(view, maxCount);
}


DrFormulaComponent.PaintPanel = function (containerId) {
    this.containerId = containerId;
};

DrFormulaComponent.PaintPanel.prototype = {

    init: function () {
        this._initMarkup(this.containerId);
    },

    _initMarkup: function (containerId) {
        var container = $('#' + containerId);
        container.append('<h2>Введите формулу вещества</h2>');
		container.append('<p>Нажмите Enter, чтобы:</p>');
		container.append('<ul><li>качественно классифицировать вещество</li><li>построить структурную (графическую) формулу вещества</li></ul>');
        container.append('<input type="text" id="inputField">');
        container.append('<div id="root"><div id="root3"></div></div>');
		
		setStyles($('#root'));

        let infoArea = $('#root3'),
	        inputField = $('#inputField'),
	        formula,
	        flaView,
	        levelHTML = "";

        $('#inputField').keypress((e) => {
			if (e.keyCode === 13 && inputField[0].value){

				formula = inputField[0].value;
	            switch (checkSubstanceKind(formula)){
	                case OXIDE: 
	                    flaView = drawOxide(formula);
	                    break;
	                case HYDROXIDE:
	                    flaView = drawHydroxide(formula);
	                    break;
	                case ACID:
	                    flaView = drawAcid(formula);
	                    break;
	                default:
	                    flaView = '';
	            }

	            levelHTML = "";
	            levelHTML = levelHTML 
	                + '<p>введенное вещество <strong>' + checkSubstanceKind(formula) + '</strong></p>'
	                + flaView;


				repaint(infoArea, inputField[0].value, levelHTML);
			}
			
        });

        var self = this;
    },
};

/* --- src/drFormula-component.js --- */
/**
 * DrFormulaComponent component.
 */
DrFormulaComponent.DrawComponent = {
    ext_lang: 'drFormula_component',
    formats: ['format_drFormula_json'],
    struct_support: true,
    factory: function (sandbox) {
        return new DrFormulaComponent.DrawWindow(sandbox);
    }
};

DrFormulaComponent.DrawWindow = function (sandbox) {
    this.sandbox = sandbox;
    this.paintPanel = new DrFormulaComponent.PaintPanel(this.sandbox.container);
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
SCWeb.core.ComponentManager.appendComponentInitialize(DrFormulaComponent.DrawComponent);

