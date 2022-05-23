import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { BookingResponse, Holiday } from "../types/booking";
import { ratings, pricePerPerson, facilities } from "../consts/searchResult";
import * as styles from "./searchResult.module.less";
import { checkUnCheck, filterBy } from "../utils";

const SearchResult = (props: BookingResponse) => {
	const holidayData = props.holidays;

	const [selectedStars, setSelectedStars] = useState<string[]>([]);
	const [selectedPricePerPerson, setSelectedPricePerPerson] = useState<string[]>([]);
	const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

	const [filteredHotelDetails, setFilteredHotelDetails] = useState<Holiday[]>([]);

	useEffect(() => {
		const filterByStar = filterBy(holidayData, { type: "starRating", value: selectedStars });
		const filterByStarPrice = filterBy(filterByStar, { type: "pricePerPerson", value: selectedPricePerPerson });
		const filterByStarPriceFacility = filterBy(filterByStarPrice, { type: "hotelFacilities", value: selectedFacilities });
		setFilteredHotelDetails([...filterByStarPriceFacility]);
	}, [selectedStars, selectedPricePerPerson, selectedFacilities, holidayData]);

	return (
		<div className={styles["grid"]}>
			<div className={styles["col"]}>
				<div className={styles["filter-container"]}>
					<h2>Filter by:</h2>
					<div className={styles["filter-label-margin"]}>
						<h3>Star rating</h3>
						{ratings.map((option) => (
							<label className={styles["checkbox-container"]} key={`star${option.value}`}>{option.label}
								<input
									type="checkbox"
									id={option.value}
									checked={selectedStars.includes(option.value)}
									onChange={(e) => { setSelectedStars((prev: string[]) => checkUnCheck(prev, e.target.id)) }}
								/>
								<span className={styles["checkmark"]}></span>
							</label>
						))}
					</div>
					<div className={styles["filter-label-margin"]}>
						<h3>Price per person</h3>
						{pricePerPerson.map((option) => (
							<label className={styles["checkbox-container"]} key={`price${option.value}`}>{option.label}
								<input
									type="checkbox"
									id={`${option.min}-${option.max}`}
									checked={selectedPricePerPerson.includes(`${option.min}-${option.max}`)}
									onChange={(e) => { setSelectedPricePerPerson((prev: string[]) => checkUnCheck(prev, e.target.id)) }}
								/>
								<span className={styles["checkmark"]}></span>
							</label>
						))}
					</div>
					<div className={styles["filter-label-margin"]}>
						<h3>Hotel facilities</h3>
						{facilities.map((option) => (
							<label className={styles["checkbox-container"]} key={`facility${option.value}`}>{option.label}
								<input
									type="checkbox"
									id={option.label}
									checked={selectedFacilities.includes(option.label)}
									onChange={(e) => { setSelectedFacilities((prev: string[]) => checkUnCheck(prev, e.target.id)) }}
								/>
								<span className={styles["checkmark"]}></span>
							</label>
						))}
					</div>
				</div>
			</div>
			<div className={styles["col"]}>
				{filteredHotelDetails.length > 0 ?
					(<div> {filteredHotelDetails.map((hotelData: Holiday, id: number) => (
						<div className={styles["grid-hotel-details"]} id="" key={id}>
							<div className={styles["col"]}>
								<img src={hotelData?.hotel?.content?.images[0]?.RESULTS_CAROUSEL?.url}
									alt="hotel" width="350" height="350" className="rounded" />
							</div>
							<div className={styles["col"]}>
								<h3 className="">{hotelData?.hotel?.name}</h3>
								<h3>${hotelData?.pricePerPerson}</h3>
								<div className="card border-0">
									{hotelData?.hotel?.content?.hotelDescription.slice(0, 350) + "..."}
								</div>
							</div>
							<div className={styles["col"]}>
								<div className={styles["grid-hotel-details"]}>
									<div className={styles["col"]}>
										<h4><img src={hotelData?.hotel?.tripAdvisor?.ratingImageUrl} alt="ratings" /></h4>
									</div>
									<div className={styles["col"]}>
										<h4 className={styles["ratings-text"]}>Rating</h4>
										<div className={styles["ratings-text"]}>
											{hotelData?.hotel?.content?.starRating ?
												hotelData?.hotel.content.starRating : 0}
										</div>
									</div>
									<div className={styles["col"]}>
										<h4 className={styles["reviews-text"]}>Reviews</h4>
										<div className={styles["reviews-text"]}>
											{hotelData?.hotel?.tripAdvisor?.numReviews ?
												hotelData?.hotel.tripAdvisor.numReviews : 0}
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
					</div>) : (
						<h4>No result found!</h4>
					)}
			</div>
		</div>
	)
}

export default SearchResult;