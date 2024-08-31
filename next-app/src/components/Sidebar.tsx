"use client";
import React, { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import Image from 'next/image';

import NavLink from './Navlink';
const ThemeSwitcher = dynamic(() => import('./ThemeSwitcher'), { ssr: false });


import { RxLightningBolt, RxHome, RxDrawingPin, RxBarChart, RxEnvelopeOpen } from 'react-icons/rx';
import { FiSearch } from 'react-icons/fi';

const linkClassName = 'bg-secondary text-text m-3 p-3 rounded-lg inline-block hover:ml-0 hover:mr-0 hover:bg-foreground smooth';


const Sidebar = ({ children }: { children: ReactNode }) => {

    const { theme } = useTheme();
    const [iconColor, setIconColor] = useState('black');

    useEffect(() => {
        setIconColor(theme === 'lightTheme' ? 'black' : 'gold');
    }, [theme]);
    return (
        <div className='flex'>
            <div className='fixed w-20 h-screen p-1 bg-background border-r-[5px] flex flex-col '>
                <div className={linkClassName.replace(" hover:ml-0 hover:mr-0 hover:bg-foreground smooth", "")}>
                    <ThemeSwitcher />
                </div>
                <NavLink href="/" ><RxHome size={20} color={iconColor} /></NavLink >
                <NavLink href="/places" ><RxDrawingPin size={20} color={iconColor} /> </NavLink >
                <NavLink href="/dash" ><RxBarChart size={20} color={iconColor} /> </NavLink >
                <NavLink href="/api" > <RxLightningBolt size={20} color={iconColor} /> </NavLink >
                <NavLink href="/contact" ><RxEnvelopeOpen size={20} color={iconColor} /> </NavLink >
                <NavLink href="/form" ><FiSearch size={20} color={iconColor} /> </NavLink >
            </div>
            <main className='ml-20 w-full h-full'>
                <header className='bg-background items-center text-center'>
                    <div>
                        <h1 className='text-3xl text-text font-bold'> - G Rate Places - </h1>
                        <h3 className='text-lg text-text font-semibold'>Explore your area and find new marketing opportunities</h3>
                    </div>

                </header>
                {children}
            </main>
        </div>
    );
};

export default Sidebar;