export interface OptionsType {
	label: string;
	value: string;
};

export interface RatingAndFacilitiesType extends OptionsType {
	isChecked: boolean;
	name: string;
};

export interface PricePerPersonType extends RatingAndFacilitiesType {
	min: string;
	max: string;
}