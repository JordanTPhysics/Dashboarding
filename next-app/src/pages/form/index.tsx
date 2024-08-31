"use client";

import React, { useState } from "react";

import countries from "../../components/places/countries";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

const Form = () => {

    const inputStyle: string = "m-2 p-1 border border-gray-300 rounded-md text-contrast bg-secondary focus:outline-none focus:ring-2 focus:ring-info focus:border-transparent";

    const [formData, setFormData] = useState({
        rating: 0,
        contains: "",
        name: "",
        type: "",
        prompt: "",
        radius: 0,
        latitude: 0,
        longitude: 0,
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
            radius: selectedCountry ? parseInt(selectedCountry.radius) : 0,
            latitude: selectedCountry ? parseFloat(selectedCountry.lat) : 0,
            longitude: selectedCountry ? parseFloat(selectedCountry.lon) : 0,
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formData)
    }

    return (
        
            <div className=" flex flex-col items-center bg-background h-screen">
                <h1 className="text-3xl text-contrast p-5">Search for a place</h1>
                <form onSubmit={handleSubmit} className="form-grid text-contrast p-5 m-5 border-t-10 border-t-info grid grid-cols-2 bg-foreground rounded-md ">
                    <div>
                        <label>Rating:</label><br/>
                        <input type="number" name="rating" value={formData.rating} onChange={handleChange} className={inputStyle} />
                    </div>
                    <div>
                        <label>Contains:</label><br/>
                        <input type="text" name="contains" value={formData.contains} onChange={handleChange} className={inputStyle + " h-25"} />
                    </div>
                    <div>
                        <label>Name:</label><br/>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputStyle} />
                    </div>
                    <div>
                        <label>Type:</label><br/>
                        <input type="text" name="type" value={formData.type} onChange={handleChange} className={inputStyle} />
                    </div>
                    <div>
                        <label>Prompt:</label><br/>
                        <input type="text" name="prompt" value={formData.prompt} onChange={handleChange} className={inputStyle} />
                    </div>
                    <div>
                        <label>Radius:</label><br/>
                        <input type="number" name="radius" value={formData.radius} onChange={handleChange} className={inputStyle} />
                    </div>
                    <div>
                        <label>Latitude:</label><br/>
                        <input type="number" name="latitude" value={formData.latitude} onChange={handleChange} className={inputStyle} />
                    </div>
                    <div>
                        <label>Longitude:</label><br/>
                        <input type="number" name="longitude" value={formData.longitude} onChange={handleChange} className={inputStyle} />
                    </div>
                    <div>
                        <label>Country:</label><br/>
                        <select name="country" onChange={handleCountry} value={formData.country} className={inputStyle}>
                            {countries.map((country) => (
                                <option key={country.name} value={country.name}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div><br/>
                    <Button type="submit" className="bg-success border border-zinc-500 smooth hover:scale-110 m-3">Search</Button>
                    <Button type="reset" className="bg-danger border border-zinc-500 smooth hover:scale-110 m-3"><Link href="/" >Home</Link></Button>
                    
                </form>
            </div>
        
    )
}


export default Form;