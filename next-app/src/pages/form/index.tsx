"use client";

import React, { useState } from "react";

import countries from "../../components/places/countries";

const Form = () => {
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
        setFormData({
            ...formData,
            country: e.target.value,
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formData)
    }

    return (
        
            <div className="flex flex-col text-center items-center ">
                <form onSubmit={handleSubmit} className="form-grid ">
                    <div>
                        <label>Rating:</label>
                        <input type="number" name="rating" value={formData.rating} onChange={handleChange} className="p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label>Contains:</label>
                        <input type="text" name="contains" value={formData.contains} onChange={handleChange} className="p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label>Type:</label>
                        <input type="text" name="type" value={formData.type} onChange={handleChange} className="p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label>Prompt:</label>
                        <input type="text" name="prompt" value={formData.prompt} onChange={handleChange} className="p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label>Radius:</label>
                        <input type="number" name="radius" value={formData.radius} onChange={handleChange} className="p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label>Latitude:</label>
                        <input type="number" name="latitude" value={formData.latitude} onChange={handleChange} className="p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label>Longitude:</label>
                        <input type="number" name="longitude" value={formData.longitude} onChange={handleChange} className="p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label>Country:</label>
                        <select name="country" onChange={handleCountry} value={formData.country} className="p-2 border border-gray-300 rounded-md">
                            {countries.map((country) => (
                                <option key={country.name} value={country.name}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">Filter Places</button>
                </form>
            </div>
        
    )
}


export default Form;