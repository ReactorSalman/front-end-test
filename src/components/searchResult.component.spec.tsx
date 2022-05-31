import { h } from 'preact';
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';
import SearchResult from './searchResult.component';
import { Holiday, HotelImage } from '../types/booking';

configure({ adapter: new Adapter });

const filteredHotelDetails: Holiday[] = [{
	totalPrice: 1000,
	pricePerPerson: 200,
	hotel: {
		id: "1",
		name: "Sheraton Vistana Resort",
		tripAdvisor: {
			numReviews: 9938,
			ratingImageUrl: ""
		},
		boardBasis: "",
		content: {
			name: "",
			vRating: "" as string,
			hotelDescription: "Test description",
			atAGlance: [""],
			parentLocation: "",
			images: [{
				RESULTS_CAROUSEL: {
					url: "Test url"
				}
			}] as HotelImage[],
			holidayType: [""],
			boardBasis: [""],
			hotelLocation: [""],
			accommodationType: [""],
			hotelFacilities: [""],
			starRating: "5",
			propertyType: ""
		}
	},
	flyingClubMiles: 0,
	virginPoints: 0,
	tierPoints: 0,
	departureDate: "",
	selectedDate: ""
}];


describe("SearchResult", () => {
	it("should display the hotel details correctly", () => {
		const search_result_component = shallow(<SearchResult holidays={filteredHotelDetails} />)
		expect(search_result_component.find('[id="hotel_name_0"]').text()).toBe("Sheraton Vistana Resort")
		expect(search_result_component.find('[id="hotel_image_0"]').prop("src")).toBe("Test url")
		expect(search_result_component.find('[id="hotel_price_0"]').text()).toBe("£200")
		expect(search_result_component.find('[id="hotel_description_0"]').text()).toBe("Test description...")
		expect(search_result_component.find('[id="rating_label"]').text()).toBe("Rating")
		expect(search_result_component.find('[id="hotel_rating_0"]').text()).toBe("5")
		expect(search_result_component.find('[id="review_label"]').text()).toBe("Reviews")
		expect(search_result_component.find('[id="hotel_review_0"]').text()).toBe("9938")
	})

	it("shouldn't display hotel details", () => {
		const search_result_component = shallow(<SearchResult holidays={[]} />)
		expect(search_result_component.find('[id="no_result_found"]').text()).toBe("No result found!")
	})

	it("should display hotel filter's", () => {
		const search_result_component = mount(<SearchResult holidays={[]} />)
		expect(search_result_component.find('[id="filter_label"]').text()).toBe("Filter by:")
		expect(search_result_component.find('[id="star_rating_label"]').text()).toBe("Star rating")
		expect(search_result_component.find('[id="2"]').props().checked).toEqual(false)
		expect(search_result_component.find('[id="person_price_label"]').text()).toBe("Price per person")
		expect(search_result_component.find('[id="0-1000"]').props().checked).toEqual(false)
		expect(search_result_component.find('[id="hotel_facilities_label"]').text()).toBe("Hotel facilities")
		expect(search_result_component.find('[id="Bar"]').props().checked).toEqual(false)
	})
})