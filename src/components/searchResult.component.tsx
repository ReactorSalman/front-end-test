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
					<label className={styles["label-heading"]}>Filter by:</label>
					<div className={styles["filter-label-margin"]}>
						<label className={styles["label-subheading"]}>Star rating</label>
						{ratings.map((option) => (
							<label className={styles["checkbox-container"]} key={`star${option.value}`}>{option.label}
								<input
									type="checkbox"
									id={option.value}
									checked={selectedStars.includes(option.value)}
									onChange={(e) => { setSelectedStars((prev: string[]) => checkUnCheck(prev, (e.target as HTMLInputElement).id)) }}
								/>
								<span className={styles["checkmark"]}></span>
							</label>
						))}
					</div>
					<div className={styles["filter-label-margin"]}>
						<label className={styles["label-subheading"]}>Price per person</label>
						{pricePerPerson.map((option) => (
							<label className={styles["checkbox-container"]} key={`price${option.value}`}>{option.label}
								<input
									type="checkbox"
									id={`${option.min}-${option.max}`}
									checked={selectedPricePerPerson.includes(`${option.min}-${option.max}`)}
									onChange={(e) => { setSelectedPricePerPerson((prev: string[]) => checkUnCheck(prev, (e.target as HTMLInputElement).id)) }}
								/>
								<span className={styles["checkmark"]}></span>
							</label>
						))}
					</div>
					<div className={styles["filter-label-margin"]}>
						<label className={styles["label-subheading"]}>Hotel facilities</label>
						{facilities.map((option) => (
							<label className={styles["checkbox-container"]} key={`facility${option.value}`}>{option.label}
								<input
									type="checkbox"
									id={option.label}
									checked={selectedFacilities.includes(option.label)}
									onChange={(e) => { setSelectedFacilities((prev: string[]) => checkUnCheck(prev, (e.target as HTMLInputElement).id)) }}
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
								<label className={styles["label-heading"]}>{hotelData?.hotel?.name}</label>
								<label className={styles["label-heading"]}>€{hotelData?.pricePerPerson}</label>
								<div className={styles["label-subheading"]}>
									{/* Need to handle in a better way */}
									{hotelData?.hotel?.content?.hotelDescription.slice(0, 350)+"..."}
								</div>
							</div>
							<div className={styles["col"]}>
								<div className={styles["grid-hotel-details"]}>
									<div className={styles["col"]}>
										<img src={hotelData?.hotel?.tripAdvisor?.ratingImageUrl} alt="ratings" />
									</div>
									<div className={styles["col"]}>
										<label className={styles["ratings-text"]}>Rating</label>
										<div className={styles["ratings-text"]}>
											{hotelData?.hotel?.content?.starRating ?
												hotelData?.hotel.content.starRating : 0}
										</div>
									</div>
									<div className={styles["col"]}>
										<label className={styles["reviews-text"]}>Reviews</label>
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
						<label className={styles["error"]}>No result found!</label>
					)}
			</div>
		</div>
	)
}

export default SearchResult;