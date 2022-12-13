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
