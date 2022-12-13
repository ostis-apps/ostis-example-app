/* --- src/periodic_table-common.js --- */
var PeriodicTableComponent = {};

function extend(child, parent) {
    var F = function () {
    };
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    child.superclass = parent.prototype;
}


/* --- src/ui_periodic_table.js --- */

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





/* --- src/ui_periodic_table_data.js --- */
var ptmap = {
  "1_1": {
    name_en: "Hydrogen",
    name_ru: "Водород",
    category: "diatomic_nonmetal",
    number: 1,
    x: 1,
    y: 1,
    symbol: "H"
  },
  "18_1": {
    name_en: "Helium",
    name_ru: "Гелий",
    category: "noble_gas",
    number: 2,
    x: 18,
    y: 1,
    symbol: "He"
  },
  "1_2": {
    name_en: "Lithium",
    name_ru: "Литий",
    category: "alkali_metal",
    number: 3,
    x: 1,
    y: 2,
    symbol: "Li"
  },
  "2_2": {
    name_en: "Beryllium",
    name_ru: "Бериллий",
    category: "alkaline_earth_metal",
    number: 4,
    x: 2,
    y: 2,
    symbol: "Be"
  },
  "13_2": {
    name_en: "Boron",
    name_ru: "Бор",
    category: "metalloid",
    number: 5,
    x: 13,
    y: 2,
    symbol: "B"
  },
  "14_2": {
    name_en: "Carbon",
    name_ru: "Углерод",
    category: "polyatomic_nonmetal",
    number: 6,
    x: 14,
    y: 2,
    symbol: "C"
  },
  "15_2": {
    name_en: "Nitrogen",
    name_ru: "Азот",
    category: "diatomic_nonmetal",
    number: 7,
    x: 15,
    y: 2,
    symbol: "N"
  },
  "16_2": {
    name_en: "Oxygen",
    name_ru: "Кислород",
    category: "diatomic_nonmetal",
    number: 8,
    x: 16,
    y: 2,
    symbol: "O"
  },
  "17_2": {
    name_en: "Fluorine",
    name_ru: "Фтор",
    category: "halogen",
    number: 9,
    x: 17,
    y: 2,
    symbol: "F"
  },
  "18_2": {
    name_en: "Neon",
    name_ru: "Неон",
    category: "noble_gas",
    number: 10,
    x: 18,
    y: 2,
    symbol: "Ne"
  },
  "1_3": {
    name_en: "Sodium",
    name_ru: "Натрий",
    category: "alkali_metal",
    number: 11,
    x: 1,
    y: 3,
    symbol: "Na"
  },
  "2_3": {
    name_en: "Magnesium",
    name_ru: "Магний",
    category: "alkaline_earth_metal",
    number: 12,
    x: 2,
    y: 3,
    symbol: "Mg"
  },
  "13_3": {
    name_en: "Aluminium",
    name_ru: "Алюминий",
    category: "post_transition_metal",
    number: 13,
    x: 13,
    y: 3,
    symbol: "Al"
  },
  "14_3": {
    name_en: "Silicon",
    name_ru: "Кремний",
    category: "metalloid",
    number: 14,
    x: 14,
    y: 3,
    symbol: "Si"
  },
  "15_3": {
    name_en: "Phosphorus",
    name_ru: "Фосфор",
    category: "polyatomic_nonmetal",
    number: 15,
    x: 15,
    y: 3,
    symbol: "P"
  },
  "16_3": {
    name_en: "Sulfur",
    name_ru: "Сера",
    category: "polyatomic_nonmetal",
    number: 16,
    x: 16,
    y: 3,
    symbol: "S"
  },
  "17_3": {
    name_en: "Chlorine",
    name_ru: "Хлор",
    category: "halogen",
    number: 17,
    x: 17,
    y: 3,
    symbol: "Cl"
  },
  "18_3": {
    name_en: "Argon",
    name_ru: "Аргон",
    category: "noble_gas",
    number: 18,
    x: 18,
    y: 3,
    symbol: "Ar"
  },
  "1_4": {
    name_en: "Potassium",
    name_ru: "Калий",
    category: "alkali_metal",
    number: 19,
    x: 1,
    y: 4,
    symbol: "K"
  },
  "2_4": {
    name_en: "Calcium",
    name_ru: "Кальций",
    category: "alkaline_earth_metal",
    number: 20,
    x: 2,
    y: 4,
    symbol: "Ca"
  },
  "3_4": {
    name_en: "Scandium",
    name_ru: "Скандий",
    category: "transition_metal",
    number: 21,
    x: 3,
    y: 4,
    symbol: "Sc"
  },
  "4_4": {
    name_en: "Titanium",
    name_ru: "Титан",
    category: "transition_metal",
    number: 22,
    x: 4,
    y: 4,
    symbol: "Ti"
  },
  "5_4": {
    name_en: "Vanadium",
    name_ru: "Ванадий",
    category: "transition_metal",
    number: 23,
    x: 5,
    y: 4,
    symbol: "V"
  },
  "6_4": {
    name_en: "Chromium",
    name_ru: "Хром",
    category: "transition_metal",
    number: 24,
    x: 6,
    y: 4,
    symbol: "Cr"
  },
  "7_4": {
    name_en: "Manganese",
    name_ru: "Марганец",
    category: "transition_metal",
    number: 25,
    x: 7,
    y: 4,
    symbol: "Mn"
  },
  "8_4": {
    name_en: "Iron",
    name_ru: "Железо",
    category: "transition_metal",
    number: 26,
    x: 8,
    y: 4,
    symbol: "Fe"
  },
  "9_4": {
    name_en: "Cobalt",
    name_ru: "Кобальт",
    category: "transition_metal",
    number: 27,
    x: 9,
    y: 4,
    symbol: "Co"
  },
  "10_4": {
    name_en: "Nickel",
    name_ru: "Никель",
    category: "transition_metal",
    number: 28,
    x: 10,
    y: 4,
    symbol: "Ni"
  },
  "11_4": {
    name_en: "Copper",
    name_ru: "Медь",
    category: "transition_metal",
    number: 29,
    x: 11,
    y: 4,
    symbol: "Cu"
  },
  "12_4": {
    name_en: "Zinc",
    name_ru: "Цинк",
    category: "transition_metal",
    number: 30,
    x: 12,
    y: 4,
    symbol: "Zn"
  },
  "13_4": {
    name_en: "Gallium",
    name_ru: "Галлий",
    category: "post_transition_metal",
    number: 31,
    x: 13,
    y: 4,
    symbol: "Ga"
  },
  "14_4": {
    name_en: "Germanium",
    name_ru: "Германий",
    category: "metalloid",
    number: 32,
    x: 14,
    y: 4,
    symbol: "Ge"
  },
  "15_4": {
    name_en: "Arsenic",
    name_ru: "Мышьяк",
    category: "metalloid",
    number: 33,
    x: 15,
    y: 4,
    symbol: "As"
  },
  "16_4": {
    name_en: "Selenium",
    name_ru: "Селен",
    category: "polyatomic_nonmetal",
    number: 34,
    x: 16,
    y: 4,
    symbol: "Se"
  },
  "17_4": {
    name_en: "Bromine",
    name_ru: "Бром",
    category: "halogen",
    number: 35,
    x: 17,
    y: 4,
    symbol: "Br"
  },
  "18_4": {
    name_en: "Krypton",
    name_ru: "Криптон",
    category: "noble_gas",
    number: 36,
    x: 18,
    y: 4,
    symbol: "Kr"
  },
  "1_5": {
    name_en: "Rubidium",
    name_ru: "Рубидий",
    category: "alkali_metal",
    number: 37,
    x: 1,
    y: 5,
    symbol: "Rb"
  },
  "2_5": {
    name_en: "Strontium",
    name_ru: "Стронций",
    category: "alkaline_earth_metal",
    number: 38,
    x: 2,
    y: 5,
    symbol: "Sr"
  },
  "3_5": {
    name_en: "Yttrium",
    name_ru: "Иттрий",
    category: "transition_metal",
    number: 39,
    x: 3,
    y: 5,
    symbol: "Y"
  },
  "4_5": {
    name_en: "Zirconium",
    name_ru: "Цирконий",
    category: "transition_metal",
    number: 40,
    x: 4,
    y: 5,
    symbol: "Zr"
  },
  "5_5": {
    name_en: "Niobium",
    name_ru: "Ниобий",
    category: "transition_metal",
    number: 41,
    x: 5,
    y: 5,
    symbol: "Nb"
  },
  "6_5": {
    name_en: "Molybdenum",
    name_ru: "Молибден",
    category: "transition_metal",
    number: 42,
    x: 6,
    y: 5,
    symbol: "Mo"
  },
  "7_5": {
    name_en: "Technetium",
    name_ru: "Технеций",
    category: "transition_metal",
    number: 43,
    x: 7,
    y: 5,
    symbol: "Tc"
  },
  "8_5": {
    name_en: "Ruthenium",
    name_ru: "Рутений",
    category: "transition_metal",
    number: 44,
    x: 8,
    y: 5,
    symbol: "Ru"
  },
  "9_5": {
    name_en: "Rhodium",
    name_ru: "Родий",
    category: "transition_metal",
    number: 45,
    x: 9,
    y: 5,
    symbol: "Rh"
  },
  "10_5": {
    name_en: "Palladium",
    name_ru: "Палладий",
    category: "transition_metal",
    number: 46,
    x: 10,
    y: 5,
    symbol: "Pd"
  },
  "11_5": {
    name_en: "Silver",
    name_ru: "Серебро",
    category: "transition_metal",
    number: 47,
    x: 11,
    y: 5,
    symbol: "Ag"
  },
  "12_5": {
    name_en: "Cadmium",
    name_ru: "Кадмий",
    category: "transition_metal",
    number: 48,
    x: 12,
    y: 5,
    symbol: "Cd"
  },
  "13_5": {
    name_en: "Indium",
    name_ru: "Индий",
    category: "post_transition_metal",
    number: 49,
    x: 13,
    y: 5,
    symbol: "In"
  },
  "14_5": {
    name_en: "Tin",
    name_ru: "Олово",
    category: "post_transition_metal",
    number: 50,
    x: 14,
    y: 5,
    symbol: "Sn"
  },
  "15_5": {
    name_en: "Antimony",
    name_ru: "Сурьма",
    category: "metalloid",
    number: 51,
    x: 15,
    y: 5,
    symbol: "Sb"
  },
  "16_5": {
    name_en: "Tellurium",
    name_ru: "Теллур",
    category: "metalloid",
    number: 52,
    x: 16,
    y: 5,
    symbol: "Te"
  },
  "17_5": {
    name_en: "Iodine",
    name_ru: "Иод",
    category: "halogen",
    number: 53,
    x: 17,
    y: 5,
    symbol: "I"
  },
  "18_5": {
    name_en: "Xenon",
    name_ru: "Ксенон",
    category: "noble_gas",
    number: 54,
    x: 18,
    y: 5,
    symbol: "Xe"
  },
  "1_6": {
    name_en: "Cesium",
    name_ru: "Цезий",
    category: "alkali_metal",
    number: 55,
    x: 1,
    y: 6,
    symbol: "Cs"
  },
  "2_6": {
    name_en: "Barium",
    name_ru: "Барий",
    category: "alkaline_earth_metal",
    number: 56,
    x: 2,
    y: 6,
    symbol: "Ba"
  },
  "3_9": {
    name_en: "Lanthanum",
    name_ru: "Лантан",
    category: "transition_metal",
    number: 57,
    x: 3,
    y: 9,
    symbol: "La"
  },
  "4_9": {
    name_en: "Cerium",
    name_ru: "Церий",
    category: "lanthanide",
    number: 58,
    x: 4,
    y: 9,
    symbol: "Ce"
  },
  "5_9": {
    name_en: "Praseodymium",
    name_ru: "Празеодим",
    category: "lanthanide",
    number: 59,
    x: 5,
    y: 9,
    symbol: "Pr"
  },
  "6_9": {
    name_en: "Neodymium",
    name_ru: "Неодим",
    category: "lanthanide",
    number: 60,
    x: 6,
    y: 9,
    symbol: "Nd"
  },
  "7_9": {
    name_en: "Promethium",
    name_ru: "Прометий",
    category: "lanthanide",
    number: 61,
    x: 7,
    y: 9,
    symbol: "Pm"
  },
  "8_9": {
    name_en: "Samarium",
    name_ru: "Самарий",
    category: "lanthanide",
    number: 62,
    x: 8,
    y: 9,
    symbol: "Sm"
  },
  "9_9": {
    name_en: "Europium",
    name_ru: "Европий",
    category: "lanthanide",
    number: 63,
    x: 9,
    y: 9,
    symbol: "Eu"
  },
  "10_9": {
    name_en: "Gadolinium",
    name_ru: "Гадолиний",
    category: "lanthanide",
    number: 64,
    x: 10,
    y: 9,
    symbol: "Gd"
  },
  "11_9": {
    name_en: "Terbium",
    name_ru: "Тербий",
    category: "lanthanide",
    number: 65,
    x: 11,
    y: 9,
    symbol: "Tb"
  },
  "12_9": {
    name_en: "Dysprosium",
    name_ru: "Диспрозий",
    category: "lanthanide",
    number: 66,
    x: 12,
    y: 9,
    symbol: "Dy"
  },
  "13_9": {
    name_en: "Holmium",
    name_ru: "Гольмий",
    category: "lanthanide",
    number: 67,
    x: 13,
    y: 9,
    symbol: "Ho"
  },
  "14_9": {
    name_en: "Erbium",
    name_ru: "Эрбий",
    category: "lanthanide",
    number: 68,
    x: 14,
    y: 9,
    symbol: "Er"
  },
  "15_9": {
    name_en: "Thulium",
    name_ru: "Тулий",
    category: "lanthanide",
    number: 69,
    x: 15,
    y: 9,
    symbol: "Tm"
  },
  "16_9": {
    name_en: "Ytterbium",
    name_ru: "Иттербий",
    category: "lanthanide",
    number: 70,
    x: 16,
    y: 9,
    symbol: "Yb"
  },
  "17_9": {
    name_en: "Lutetium",
    name_ru: "Лютеций",
    category: "lanthanide",
    number: 71,
    x: 17,
    y: 9,
    symbol: "Lu"
  },
  "4_6": {
    name_en: "Hafnium",
    name_ru: "Гафний",
    category: "transition_metal",
    number: 72,
    x: 4,
    y: 6,
    symbol: "Hf"
  },
  "5_6": {
    name_en: "Tantalum",
    name_ru: "Тантал",
    category: "transition_metal",
    number: 73,
    x: 5,
    y: 6,
    symbol: "Ta"
  },
  "6_6": {
    name_en: "Tungsten",
    name_ru: "Вольфрам",
    category: "transition_metal",
    number: 74,
    x: 6,
    y: 6,
    symbol: "W"
  },
  "7_6": {
    name_en: "Rhenium",
    name_ru: "Рений",
    category: "transition_metal",
    number: 75,
    x: 7,
    y: 6,
    symbol: "Re"
  },
  "8_6": {
    name_en: "Osmium",
    name_ru: "Осмий",
    category: "transition_metal",
    number: 76,
    x: 8,
    y: 6,
    symbol: "Os"
  },
  "9_6": {
    name_en: "Iridium",
    name_ru: "Иридий",
    category: "transition_metal",
    number: 77,
    x: 9,
    y: 6,
    symbol: "Ir"
  },
  "10_6": {
    name_en: "Platinum",
    name_ru: "Платина",
    category: "transition_metal",
    number: 78,
    x: 10,
    y: 6,
    symbol: "Pt"
  },
  "11_6": {
    name_en: "Gold",
    name_ru: "Золото",
    category: "transition_metal",
    number: 79,
    x: 11,
    y: 6,
    symbol: "Au"
  },
  "12_6": {
    name_en: "Mercury",
    name_ru: "Ртуть",
    category: "transition_metal",
    number: 80,
    x: 12,
    y: 6,
    symbol: "Hg"
  },
  "13_6": {
    name_en: "Thallium",
    name_ru: "Таллий",
    category: "post_transition_metal",
    number: 81,
    x: 13,
    y: 6,
    symbol: "Tl"
  },
  "14_6": {
    name_en: "Lead",
    name_ru: "Свинец",
    category: "post_transition_metal",
    number: 82,
    x: 14,
    y: 6,
    symbol: "Pb"
  },
  "15_6": {
    name_en: "Bismuth",
    name_ru: "Висмут",
    category: "post_transition_metal",
    number: 83,
    x: 15,
    y: 6,
    symbol: "Bi"
  },
  "16_6": {
    name_en: "Polonium",
    name_ru: "Полоний",
    category: "metalloid",
    number: 84,
    x: 16,
    y: 6,
    symbol: "Po"
  },
  "17_6": {
    name_en: "Astatine",
    name_ru: "Астат",
    category: "halogen",
    number: 85,
    x: 17,
    y: 6,
    symbol: "At"
  },
  "18_6": {
    name_en: "Radon",
    name_ru: "Радон",
    category: "noble_gas",
    number: 86,
    x: 18,
    y: 6,
    symbol: "Rn"
  },
  "1_7": {
    name_en: "Francium",
    name_ru: "Франций",
    category: "alkali_metal",
    number: 87,
    x: 1,
    y: 7,
    symbol: "Fr"
  },
  "2_7": {
    name_en: "Radium",
    name_ru: "Радий",
    category: "alkaline_earth_metal",
    number: 88,
    x: 2,
    y: 7,
    symbol: "Ra"
  },
  "3_10": {
    name_en: "Actinium",
    name_ru: "Актиний",
    category: "transition_metal",
    number: 89,
    x: 3,
    y: 10,
    symbol: "Ac"
  },
  "4_10": {
    name_en: "Thorium",
    name_ru: "Торий",
    category: "actinide",
    number: 90,
    x: 4,
    y: 10,
    symbol: "Th"
  },
  "5_10": {
    name_en: "Protactinium",
    name_ru: "Протактиний",
    category: "actinide",
    number: 91,
    x: 5,
    y: 10,
    symbol: "Pa"
  },
  "6_10": {
    name_en: "Uranium",
    name_ru: "Уран",
    category: "actinide",
    number: 92,
    x: 6,
    y: 10,
    symbol: "U"
  },
  "7_10": {
    name_en: "Neptunium",
    name_ru: "Нептуний",
    category: "actinide",
    number: 93,
    x: 7,
    y: 10,
    symbol: "Np"
  },
  "8_10": {
    name_en: "Plutonium",
    name_ru: "Плутоний",
    category: "actinide",
    number: 94,
    x: 8,
    y: 10,
    symbol: "Pu"
  },
  "9_10": {
    name_en: "Americium",
    name_ru: "Америций",
    category: "actinide",
    number: 95,
    x: 9,
    y: 10,
    symbol: "Am"
  },
  "10_10": {
    name_en: "Curium",
    name_ru: "Кюрий",
    category: "actinide",
    number: 96,
    x: 10,
    y: 10,
    symbol: "Cm"
  },
  "11_10": {
    name_en: "Berkelium",
    name_ru: "Берклий",
    category: "actinide",
    number: 97,
    x: 11,
    y: 10,
    symbol: "Bk"
  },
  "12_10": {
    name_en: "Californium",
    name_ru: "Калифорний",
    category: "actinide",
    number: 98,
    x: 12,
    y: 10,
    symbol: "Cf"
  },
  "13_10": {
    name_en: "Einsteinium",
    name_ru: "Эйнштейний",
    category: "actinide",
    number: 99,
    x: 13,
    y: 10,
    symbol: "Es"
  },
  "14_10": {
    name_en: "Fermium",
    name_ru: "Фермий",
    category: "actinide",
    number: 100,
    x: 14,
    y: 10,
    symbol: "Fm"
  },
  "15_10": {
    name_en: "Mendelevium",
    name_ru: "Менделевий",
    category: "actinide",
    number: 101,
    x: 15,
    y: 10,
    symbol: "Md"
  },
  "16_10": {
    name_en: "Nobelium",
    name_ru: "Нобелий",
    category: "actinide",
    number: 102,
    x: 16,
    y: 10,
    symbol: "No"
  },
  "17_10": {
    name_en: "Lawrencium",
    name_ru: "Лоуренсий",
    category: "actinide",
    number: 103,
    x: 17,
    y: 10,
    symbol: "Lr"
  },
  "4_7": {
    name_en: "Rutherfordium",
    name_ru: "Резерфордий",
    category: "transition_metal",
    number: 104,
    x: 4,
    y: 7,
    symbol: "Rf"
  },
  "5_7": {
    name_en: "Dubnium",
    name_ru: "Дубний",
    category: "transition_metal",
    number: 105,
    x: 5,
    y: 7,
    symbol: "Db"
  },
  "6_7": {
    name_en: "Seaborgium",
    name_ru: "Сиборгий",
    category: "transition_metal",
    number: 106,
    x: 6,
    y: 7,
    symbol: "Sg"
  },
  "7_7": {
    name_en: "Bohrium",
    name_ru: "Борий",
    category: "transition_metal",
    number: 107,
    x: 7,
    y: 7,
    symbol: "Bh"
  },
  "8_7": {
    name_en: "Hassium",
    name_ru: "Хассий",
    category: "transition_metal",
    number: 108,
    x: 8,
    y: 7,
    symbol: "Hs"
  },
  "9_7": {
    name_en: "Meitnerium",
    name_ru: "Мейтнерий",
    category: "transition_metal",
    number: 109,
    x: 9,
    y: 7,
    symbol: "Mt"
  },
  "10_7": {
    name_en: "Darmstadtium",
    name_ru: "Дармштадтий",
    category: "transition_metal",
    number: 110,
    x: 10,
    y: 7,
    symbol: "Ds"
  },
  "11_7": {
    name_en: "Roentgenium",
    name_ru: "Рентгений",
    category: "transition_metal",
    number: 111,
    x: 11,
    y: 7,
    symbol: "Rg"
  },
  "12_7": {
    name_en: "Copernicium",
    name_ru: "Коперниций",
    category: "transition_metal",
    number: 112,
    x: 12,
    y: 7,
    symbol: "Cn"
  },
  "13_7": {
    name_en: "Nihonium",
    name_ru: "Нихоний",
    category: "post_transition_metal",
    number: 113,
    x: 13,
    y: 7,
    symbol: "Nh"
  },
  "14_7": {
    name_en: "Flerovium",
    name_ru: "Флеровий",
    category: "post_transition_metal",
    number: 114,
    x: 14,
    y: 7,
    symbol: "Fl"
  },
  "15_7": {
    name_en: "Moscovium",
    name_ru: "Московий",
    category: "post_transition_metal",
    number: 115,
    x: 15,
    y: 7,
    symbol: "Mc"
  },
  "16_7": {
    name_en: "Livermorium",
    name_ru: "Ливерморий",
    category: "post_transition_metal",
    number: 116,
    x: 16,
    y: 7,
    symbol: "Lv"
  },
  "17_7": {
    name_en: "Tennessine",
    name_ru: "Теннессин",
    category: "halogen",
    number: 117,
    x: 17,
    y: 7,
    symbol: "Ts"
  },
  "18_7": {
    name_en: "Oganesson",
    name_ru: "Оганесон",
    category: "noble_gas",
    number: 118,
    x: 18,
    y: 7,
    symbol: "Og"
  }
};


/* --- src/periodic_table-component.js --- */
/**
 * Periodic table component.
 */
PeriodicTableComponent.DrawComponent = {
    ext_lang: 'ui_periodic_table',
    formats: ['format_ui_periodic_table_json'],
    struct_support: true,
    factory: function (sandbox) {
        return new PeriodicTableComponent.DrawWindow(sandbox);
    }
};

PeriodicTableComponent.DrawWindow = function (sandbox) {
    this.sandbox = sandbox;
    this.paintPanel = new PeriodicTableComponent.PaintPanel(this.sandbox.container);
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
SCWeb.core.ComponentManager.appendComponentInitialize(PeriodicTableComponent.DrawComponent);


