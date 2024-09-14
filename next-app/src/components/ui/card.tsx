import React from 'react';
import StarRating from './star-rating';

interface CardProps {
    rating: number;
    content: string;
    timestamp: string;
}

const Card: React.FC<CardProps> = ({ rating, content, timestamp }) => {
    return (
        <div className="bg-foreground border-border text-left text-sm lg:text-lg border-2 rounded-sm m-2 p-1">
            <StarRating rating={rating} size='sm' />
            <p>{content} - {timestamp ? timestamp.split("T")[0] : <></>}</p>
        </div>
    );
};

export default Card;