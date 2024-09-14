import React, { useState } from "react";
import Link from "next/link";

import countries from "../components/places/countries";
import { Button } from "@/src/components/ui/button";
import { useData } from "../lib/DataProvider";

const Home = () => {
    const inputStyle: string = "m-2 p-1 border border-gray-300 rounded-md text-contrast bg-secondary focus:outline-none focus:ring-2 focus:ring-info focus:border-transparent";

    const { setFilterCriteria } = useData();
    const [formData, setFormData] = useState({
        Rating: 0,
        Contains: "",
        Name: "",
        Types: "",
        Prompt: "",
        Radius: 0,
        Latitude: 0,
        Longitude: 0,
        country: "United States",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCountry = countries.find((country) => country.name === e.target.value);
        setFormData({
            ...formData,
            country: e.target.value,
            Radius: selectedCountry ? parseInt(selectedCountry.radius) : 0,
            Latitude: selectedCountry ? parseFloat(selectedCountry.lat) : 0,
            Longitude: selectedCountry ? parseFloat(selectedCountry.lon) : 0,
        })
    }

    const handleUseLocation = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigator.geolocation.getCurrentPosition((position) => {
            setFormData({
                ...formData,
                Latitude: position.coords.latitude,
                Longitude: position.coords.longitude,
            })
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { country, ...rest } = formData
        formData.Radius = parseFloat(formData.Radius.toString())
        console.log(formData)
        sessionStorage.setItem("filter", JSON.stringify(formData))
        setFilterCriteria(rest)
    }
    return (
        <div className="bg-background lg:h-screen md:h-full sm:h-full text-text align-middle items-center text-center lg:p-20">
            <h1 className="lg:text-5xl text-lg text-text align-middle">Welcome to the Google Places API Scraper and Dashboard</h1>

            <h3 className="lg:text-3xl text-sm text-text">Use the Google Places API to plan your trip, search for businesses, analyze place data, and Much More!</h3>
            <form onSubmit={handleSubmit} className="lg:w-full md:w-[70vw] sm:w-screen form-grid text-contrast p-5 m-5 md:m-3 border-4 lg:border-10 border-border grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 bg-foreground rounded-md place-items-center">
                <div>
                    <label>Rating:</label><br />
                    <input type="number" name="rating" value={formData.Contains} onChange={handleChange} className={inputStyle} />
                </div>
                <div>
                    <label>Contains:</label><br />
                    <input type="text" name="Contains" value={formData.Contains} onChange={handleChange} className={inputStyle + " h-25"} />
                </div>
                <div>
                    <label>Name:</label><br />
                    <input type="text" name="Name" value={formData.Name} onChange={handleChange} className={inputStyle} />
                </div>
                <div>
                    <label>Types:</label><br />
                    <input type="text" name="Types" value={formData.Types} onChange={handleChange} className={inputStyle} />
                </div>
                <div>
                    <label>Prompt:</label><br />
                    <input type="text" name="Prompt" value={formData.Prompt} onChange={handleChange} className={inputStyle} />
                </div>
                <div>
                    <label>Radius:</label><br />
                    <input type="number" name="Radius" value={formData.Radius} onChange={handleChange} className={inputStyle} />
                </div>
                <div>
                    <label>Latitude:</label><br />
                    <input type="number" name="Latitude" value={formData.Latitude} onChange={handleChange} className={inputStyle} />
                </div>
                <div>
                    <label>Longitude:</label><br />
                    <input type="number" name="Latitude" value={formData.Longitude} onChange={handleChange} className={inputStyle} />
                </div>
                <div>
                    <label>Country:</label><br />
                    <select name="country" onChange={handleCountry} value={formData.country} className={inputStyle}>
                        {countries.map((country) => (
                            <option key={country.name} value={country.name}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Use Your Location:</label><br />
                    <Button onClick={handleUseLocation} className="bg-background  border-2 border-border smooth hover:scale-110 m-3">Use Location</Button>
                </div>
                <br />
                <div>
                    <Button type="submit" className="bg-success w-20 border-2 border-border smooth hover:scale-110 m-3">Search</Button>
                    <Button type="reset" className="bg-danger w-20 border-2 border-border smooth hover:scale-110 m-3"><Link href="/" >Home</Link></Button>
                </div>

            </form>
        </div>
    );
}

export default Home;