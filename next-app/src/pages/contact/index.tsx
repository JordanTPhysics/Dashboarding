"use client";

import { Button } from '@/src/components/ui/button';
import React, { useState } from 'react';

const Contact = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        
        <div className="grid grid-cols-12 gap-1 bg-background h-[80vh]">
            <div className="col-span-12 row-span-2">
            <h1 className="text-3xl font-bold">Contact Us</h1>
            </div>
            <div className="col-span-12 items-center text-center">
                <form className="form-grid">
                    <div>
                        <label className='text-contrast text-lg'>Name:</label><br />
                        <input type="text" onChange={handleChange} name="name" className="p-2 border-[3px] border-contrast rounded-md" />
                    </div>
                    <div>
                        <label>Email:</label><br />
                        <input type="email" onChange={handleChange} name="email" className="p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label>Company:</label><br />
                        <input type="text" onChange={handleChange} name="company" className="p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label>Message:</label><br />
                        <textarea name="message" onChange={handleTextAreaChange} className="p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <Button variant="default" className='border-border border-[3px] text-text text-lg hover:scale-110 transition-all' onClick={handleSubmit}>Submit</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Contact;
