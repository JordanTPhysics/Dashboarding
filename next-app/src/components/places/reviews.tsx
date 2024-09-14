import { reviewRating } from "@/src/lib/DataProvider"


export type Review = {
    ReviewID: string
    ReviewText: string
    Rating: number
    placeID: string
    TimeStamp: string
    }

export const MovingAverageRating = (reviews: reviewRating[], windowSize: number): { [key: string]: number } => {
    reviews = reviews.sort((a, b) => new Date(a.TimeStamp).getTime() - new Date(b.TimeStamp).getTime());
    const movingAverage: { [key: string]: number } = {};
    reviews.forEach((review, index) => {
        if (review.Rating == -1.0) return;
        let sum = 0;
        let count = 0;
        for (let i = index; i > Math.max(index - windowSize, -1); i--) {
            sum += reviews[i].Rating;
            count += 1;
        }
        movingAverage[new Date(review.TimeStamp).toISOString()] = sum / count;
    });
    return movingAverage;
}