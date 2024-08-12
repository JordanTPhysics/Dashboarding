import React from "react";
import { GetServerSideProps } from "next";


const Home = () => {
    return (
        <div className="bg-background h-[80vh] text-text border border-border items-center text-center ">
            <h1 className="text-5xl text-text">Welcome to the Google Places API Scraper and Dashboard</h1>
            <h3 className="text-3xl text-text">Hi Aisha</h3>

            <h3 className="text-3xl text-text">Use the Google Places API to plan your trip, search for businesses, analyze place data, and Much More!</h3>
            
        </div>
    );
}

export default Home;