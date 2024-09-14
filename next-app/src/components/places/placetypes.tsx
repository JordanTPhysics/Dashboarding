
import { FaTheaterMasks, FaBell, FaLandmark } from 'react-icons/fa';
import { } from 'react-icons/rx';
import {  } from 'react-icons/md';
import { FaFootball, FaDumbbell, FaHospital, FaCar, FaUtensils, FaStore, FaChurch, FaHandsPraying, FaSchool } from 'react-icons/fa6';
import { BsPersonVcardFill } from "react-icons/bs";
import { MdOutlineMosque } from "react-icons/md";
import { TbTrees } from "react-icons/tb";
import { PiBooks } from "react-icons/pi";
import { PiCow } from "react-icons/pi";

export const placeIcons = function (placeType: string, size: number): React.ReactNode {
    switch (placeType) {
        case "performing_arts_theater":
            return <FaTheaterMasks size={size} title={placeType} />;
        case "event_venue":
        case "community_center":
            return <FaBell size={size} title={placeType} />;
        case "athletic_field":
        case "sports_club":
            return <FaFootball size={size} title={placeType} />;
        case "gym":
            return <FaDumbbell size={size} title={placeType} />;
        case "health":
        case "dentist":
        case "hospital":
        case "pharmacy":
        case "doctor":
        case "physiotherapist":
        case "dental_clinic":
        case "veterinary_care":
        case "medical_lab":
            return <FaHospital size={size} title={placeType} />;
        case "general_contractor":
        case "electrician":
        case "plumber":
        case "consultant":
        case "real_estate_agency":
        case "lawyer":
            return <BsPersonVcardFill size={size} title={placeType} />;  
        case "car_repair":
        case "car_wash":
        case "car_rental":
        case "auto_parts_store":
        case "car_dealer":
            return <FaCar size={size} title={placeType} />;
        case "restaurant":
        case "chinese_restaurant":
        case "vegan_restaurant":
        case "vegetarian_restaurant":
        case "indonesian_restaurant":
        case "japanese_restaurant":
        case "thai_restaurant":
        case "turkish_restaurant":
        case "hamburger_restaurant":
        case "fast_food_restaurant":
        case "american_restaurant":
        case "italian_restaurant":
        case "mexican_restaurant":
        case "indian_restaurant":
        case "french_restaurant":
        case "steak_house":
        case "barbecue_restaurant":
        case "korean_restaurant":
        case "ramen_restaurant":
        case "spanish_restaurant":
        case "mediterranean_restaurant":
        case "greek_restaurant":
        case "lebanese_restaurant":
        case "seafood_restaurant":
        case "takeaway":
        case "meal_delivery":
        case "meal_takeaway":
        case "brunch_restaurant":
        case "breakfast_restaurant":
        case "pizza_restaurant":
        case "sandwich_shop":
        case "ice_cream_shop":
        case "food":
        case "cafe":
        case "bakery":
            return <FaUtensils size={size} title={placeType} />;
        case "store" || placeType.includes("store"):
            return <FaStore size={size} title={placeType} />;
        case "point_of_interest":
        case "establishment":
            return <FaLandmark size={size} title={placeType} />;
        case "church":
            return <FaChurch size={size} title={placeType} />;
        case "place_of_worship":
            return <FaHandsPraying size={size}/>
        case "mosque":
            return <MdOutlineMosque size={size}/>
        case "park":
        case "national_park":
        case "amusement_park":
        case "campground":
        case "hiking_area":
            return <TbTrees size={size} title={placeType} />;
        case "zoo":
        case "aquarium":
        case "farm":
        case "farmstay":
            return <PiCow size={size} title={placeType} />;
        case "school":
        case "primary_school":
        case "secondary_school":
        case "preschool":
        case "university":
            return <FaSchool size={size} title={placeType} />;
        case "library":
        case "book_store":
            return <PiBooks size={size} title={placeType} />;

    }
}

const placeTypes = [
"performing_arts_theater",
"event_venue",
"community_center", 
"athletic_field", 
"sports_club", 
"general_contractor", 
"point_of_interest", 
"establishment", 
"gym", 
"health", 
"electrician", 
"consultant", 
"store", 
"sports_club", 
"dental_clinic", 
"car_rental", 
"store", 
"electronics_store", 
"pharmacy", 
"discount_store", 
"parking", 
"clothing_store", 
"car_wash", 
"car_repair", 
"real_estate_agency", 
"finance", 
"general_contractor", 
"primary_school", 
"school", 
"veterinary_care", 
"point_of_interest", 
"cafe", 
"food", 
"embassy", 
"travel_agency", 
"library", 
"national_park", 
"tourist_attraction", 
"park", 
"jewelry_store", 
"plumber", 
"university", 
"school", 
"food", 
"airport", 
"restaurant", 
"church", 
"place_of_worship", 
"lawyer", 
"market", 
"pet_store", 
"amusement_park", 
"amusement_center", 
"department_store", 
"furniture_store", 
"home_improvement_store", 
"child_care_agency", 
"electronics_store", 
"clothing_store", 
"jewelry_store", 
"home_goods_store", 
"sporting_goods_store", 
"spa", 
"athletic_field", 
"tourist_attraction", 
"park", 
"movie_theater", 
"hospital", 
"preschool", 
"sporting_goods_store", 
"swimming_pool", 
"gym", 
"sports_complex", 
"rv_park", 
"lodging", 
"grocery_store", 
"supermarket", 
"convenience_store", 
"market", 
"wholesaler", 
"consultant", 
"cell_phone_store", 
"gift_shop", 
"secondary_school", 
"marina", 
"fitness_center", 
"cafe", 
"shoe_store", 
"shopping_mall", 
"pet_store", 
"museum", 
"book_store", 
"gift_shop", 
"amusement_center", 
"health", 
"supermarket", 
"grocery_store", 
"mosque", 
"historical_landmark", 
"furniture_store",
"fitness_center", 
"child_care_agency", 
"chinese_restaurant", 
"vegan_restaurant", 
"vegetarian_restaurant", 
"indonesian_restaurant", 
"japanese_restaurant", 
"thai_restaurant", 
"meal_takeaway", 
"restaurant", 
"electrician", 
"doctor", 
"bakery", 
"casino", 
"turkish_restaurant", 
"hamburger_restaurant", 
"fast_food_restaurant", 
"american_restaurant", 
"hotel", 
"dentist", 
"art_gallery", 
"coffee_shop", 
"bakery", 
"shopping_mall", 
"art_gallery", 
"bar", 
"courthouse", 
"sports_complex", 
"home_improvement_store", 
"hostel", 
"post_office", 
"bank", 
"museum", 
"dentist", 
"home_goods_store", 
"hardware_store", 
"italian_restaurant", 
"gas_station", 
"heliport", 
"airport", 
"car_repair", 
"steak_house", 
"night_club", 
"shoe_store", 
"ice_cream_shop", 
"brunch_restaurant", 
"coffee_shop", 
"breakfast_restaurant", 
"farm", 
"night_club", 
"fast_food_restaurant", 
"chinese_restaurant", 
"drugstore", 
"barber_shop", 
"hair_care", 
"physiotherapist", 
"bowling_alley", 
"finance", 
"indian_restaurant", 
"fire_station", 
"primary_school", 
"steak_house", 
"wholesaler", 
"swimming_pool", 
"bus_stop", 
"transit_station", 
"telecommunications_service_provider", 
"convenience_store", 
"thai_restaurant", 
"sushi_restaurant", 
"beauty_salon", 
"doctor", 
"ski_resort", 
"hair_care", 
"beauty_salon", 
"bus_station", 
"zoo", 
"physiotherapist", 
"spa", 
"campground", 
"natural_feature", 
"ice_cream_shop", 
"travel_agency", 
"university", 
"rest_stop", 
"gas_station", 
"truck_stop", 
"parking", 
"hotel", 
"car_wash", 
"sandwich_shop", 
"telecommunications_service_provider", 
"plumber", 
"hardware_store", 
"pharmacy", 
"event_venue", 
"stadium", 
"golf_course", 
"bar", 
"cell_phone_store","liquor_store", 
"auto_parts_store", 
"police", 
"liquor_store", 
"laundry", 
"auto_parts_store", 
"bicycle_store", 
"indian_restaurant", 
"discount_store", 
"farm", 
"hiking_area", 
"amusement_park", 
"meal_takeaway", 
"bed_and_breakfast", 
"zoo", 
"moving_company", 
"storage", 
"book_store", 
"aquarium", 
"pizza_restaurant", 
"transit_station", 
"wedding_venue", 
"french_restaurant", 
"breakfast_restaurant", 
"pizza_restaurant", 
"premise", 
"hair_salon", 
"electric_vehicle_charging_station", 
"department_store", 
"guest_house", 
"mediterranean_restaurant", 
"spanish_restaurant", 
"sandwich_shop", 
"dental_clinic", 
"greek_restaurant", 
"mediterranean_restaurant", 
"french_restaurant", 
"rv_park", 
"taxi_stand", 
"casino", 
"train_station", 
"lodging", 
"movie_theater", 
"italian_restaurant", 
"atm", 
"bus_stop", 
"train_station", 
"courier_service", 
"meal_delivery", 
"police", 
"national_park", 
"mexican_restaurant", 
"playground", 
"locksmith", 
"visitor_center", 
"synagogue", 
"historical_landmark", 
"playground", 
"church", 
"wedding_venue", 
"locality", 
"political", 
"secondary_school", 
"post_office", 
"barbecue_restaurant", 
"korean_restaurant", 
"meal_delivery", 
"resort_hotel", 
"veterinary_care", 
"insurance_agency", 
"american_restaurant", 
"cultural_center", 
"brunch_restaurant", 
"ramen_restaurant", 
"preschool", 
"barbecue_restaurant", 
"mexican_restaurant", 
"vegan_restaurant", 
"car_dealer", 
"lawyer", 
"cultural_center", 
"real_estate_agency", 
"community_center", 
"hindu_temple", 
"middle_eastern_restaurant", 
"bicycle_store", 
"marina", 
"accounting", 
"japanese_restaurant", 
"local_government_office", 
"sushi_restaurant", 
"accounting", 
"resort_hotel", 
"spanish_restaurant", 
"seafood_restaurant", 
"lebanese_restaurant", 
"hamburger_restaurant", 
"guest_house", 
"neighborhood", 
"florist",
"roofing_contractor", 
"turkish_restaurant", 
"car_dealer", 
"visitor_center", 
"greek_restaurant", 
"performing_arts_theater", 
"sublocality_level_1", 
"sublocality", 
"cottage", 
"camping_cabin", 
"campground", 
"administrative_area_level_1", 
"tailor", 
"place_of_worship", 
"roofing_contractor", 
"golf_course", 
"dog_park", 
"rest_stop", 
"vietnamese_restaurant", 
"bed_and_breakfast", 
"local_government_office", 
"seafood_restaurant", 
"middle_eastern_restaurant", 
"stadium", 
"insurance_agency", 
"administrative_area_level_3", 
"hair_salon", 
"storage", 
"moving_company", 
"florist", 
"brazilian_restaurant", 
"convention_center", 
"locksmith", 
"hospital", 
"park_and_ride", 
"library", 
"banquet_hall", 
"administrative_area_level_4", 
"city_hall", 
"hiking_area", 
"ski_resort", 
"political", 
"vegetarian_restaurant", 
"courier_service", 
"movie_rental", 
"camping_cabin", 
"dog_park", 
"aquarium", 
"electric_vehicle_charging_station", 
"brazilian_restaurant", 
"banquet_hall", 
"farmstay", 
"korean_restaurant", 
"car_rental", 
"movie_rental", 
"mosque", 
"painter", 
"transit_depot", 
"landmark", 
"painter", 
"administrative_area_level_2", 
"ramen_restaurant", 
"barber_shop", 
"bus_station", 
"extended_stay_hotel", 
"medical_lab", 
"motel", 
"convention_center", 
"cemetery", 
"courthouse", 
"laundry", 
"premise", 
"vietnamese_restaurant", 
"synagogue", 
"route", 
"farmstay", 
"subway_station", 
"tailor", 
"funeral_home", 
"cemetery", 
"ferry_terminal", 
"extended_stay_hotel", 
"landmark", 
"drugstore", 
"colloquial_area", 
"bank", 
"lebanese_restaurant", 
"private_guest_room", 
"bowling_alley", 
"subway_station", 
"taxi_stand", 
"hostel", 
"medical_lab", 
"city_hall", 
"atm", 
"school_district", 
"heliport", 
"locality", 
"motel", 
"private_guest_room",
"indonesian_restaurant", 
"embassy", 
"park_and_ride"
]

