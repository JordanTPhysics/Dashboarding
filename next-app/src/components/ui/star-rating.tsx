import React from 'react';
import { FaRegStarHalfStroke, FaStar, FaRegStar } from "react-icons/fa6";

type RatingProps = {
    rating: number; // Decimal rating value (e.g., 3.7)
    maxStars?: number; // Maximum number of stars (default is 5)
    size: string; 
};

const starColour: (rating: number) => "text-success" | "text-yellow-500" | "text-warning" | "text-danger" = (rating: number) => {
    if (rating >= 4.5) {
        return 'text-success';
    } else if (rating >= 3.5) {
        return 'text-yellow-500';
    } else if (rating >= 2.5) {
        return 'text-warning';
    } else {
        return 'text-danger';
    }
}

const starSize: (size: string) => "text-2xl" | "text-3xl" | "text-4xl" | "text-5xl" = (size: string) => {
    if (size === "sm") {
        return 'text-2xl';
    } else if (size === "md") {
        return 'text-3xl';
    } else if (size === "lg") {
        return 'text-4xl';
    } else {
        return 'text-5xl';
    }
}

const StarRating: React.FC<RatingProps> = ({ rating, maxStars = 5, size = "sm" }) => {
    const fullStars = Math.floor(rating); // Full stars based on the integer part
    const hasHalfStar = rating % 1 >= 0.5; // Whether a half star is needed
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0); // Remaining empty stars
    

  return (
        <div className='flex flex-row self-center items-center'>
            {Array(fullStars)
                .fill(0)
                .map((_, i) => (
                    <span className={`${starColour(rating)}  ${starSize(size)} flex flex-row`} key={i} ><FaStar/></span> // Full star
                ))}
            {hasHalfStar && <span className={`${starColour(rating)}  ${starSize(size)}`}><FaRegStarHalfStroke/></span>} {/* Optional: Half star */}
            {Array(emptyStars)
                .fill(0)
                .map((_, i) => (
                    <span className={`${starColour(rating)}  ${starSize(size)}`} key={i}><FaRegStar/></span> // Empty star
                ))}
        </div>
    );
};

export default StarRating;
