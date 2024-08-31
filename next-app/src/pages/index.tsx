import React from "react";
import { GetServerSideProps } from "next";


const Home = () => {
    return (
        <div className="bg-background h-screen text-text align-middle items-center text-center p-10">
            <h1 className="text-5xl text-text align-middle">Welcome to the Google Places API Scraper and Dashboard</h1>

            <h3 className="text-3xl text-text">Use the Google Places API to plan your trip, search for businesses, analyze place data, and Much More!</h3>
            
        </div>
    );
}

export default Home;