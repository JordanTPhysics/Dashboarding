import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Card from '@/src/components/ui/card';
import { Star } from 'lucide-react';
import StarRating from '@/src/components/ui/star-rating';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import { placeIcons } from '@/src/components/places/placetypes';

const PlacePage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [place, setPlace] = useState<any>(null);
    const [reviews, setReviews] = useState<any>(null);

    const getPlace = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/places:${id}`);
            const data = await response.json();
            setPlace(data);
        } catch (error) {
            console.error('Error fetching place:', error);
        }
    };

    const getPlaceReviews = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/places:${id}/reviews`);
            const data = await response.json();
            if (!data[0].ReviewID) setReviews(null);
            setReviews(data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    }

    useEffect(() => {
        if (id) {
            getPlace();
            getPlaceReviews();
        }
    }, [id, getPlace, getPlaceReviews]);


    return (
        <main className='bg-foreground border-4 border-border rounded-md h-full lg:h-screen text-text align-middle items-center text-center p-10'>
            {place ? (
                <div className='flex flex-col items-center'>
                    <h1 className='text-sm lg:text-5xl'>{place.PlaceName}</h1>
                    <p className='text-sm lg:text-3xl'>{place.Address}</p>
                    <div className='flex flex-row'>
                        <div className='p-4'>
                            <StarRating rating={place.Rating} size='lg' />
                            <span className='text-lg lg:text-3xl'>{place.Rating > 0 ? place.Rating : "unrated"} out of 5</span>
                        </div>
                        <div className='items-center text-center m-2 flex flex-col'>{place.Types.split(",").map((type: string) => (
                            <div className='items-center text-center flex flex-col' key={type} >
                                {placeIcons(type, 20)}
                                <span> {type} </span>
                            </div>
                        ))}</div>
                    </div>

                    <p>{place.Prompt}</p>
                    <p>{place.Phone ? place.Phone : "Phone number not available"}</p>
                    <p>{place.Url ? <Link href={place.Url}><Button className='bg-success rounded-md border-2 border-foreground text-foreground smooth hover:scale-110'>Website</Button></Link> : "Webpage not available"}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <h2 className='text-lg lg:text-3xl font-bold'>Reviews</h2>

            {reviews ? (
                <div className='bg-background border-4 border-border text-lg rounded-sm p-3 overflow-y-scroll max-h-[50vh]'>
                    {reviews.map((review: any) => (
                        <div key={review.ReviewID}>
                            <Card
                                rating={review.Rating}
                                content={review.ReviewText}
                                timestamp={review.TimeStamp} />
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading reviews...</p>
            )}
        </main>
    );
};

export default PlacePage;