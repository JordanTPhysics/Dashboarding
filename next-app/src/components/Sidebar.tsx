"use client";
import React, { ReactNode, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

import { RxLightningBolt, RxHome, RxEnvelopeOpen } from 'react-icons/rx';
import { FiGithub } from 'react-icons/fi';
import { GrTable } from "react-icons/gr";
import { FaMapMarkedAlt, FaRegChartBar } from "react-icons/fa";

import NavLink from './Navlink';
import useMediaQuery from '../lib/media-query';
const ThemeSwitcher = dynamic(() => import('./ThemeSwitcher'), { ssr: false });

const linkClassName = 'bg-secondary text-text m-3 p-3 rounded-lg inline-block hover:ml-0 hover:mr-0 hover:bg-foreground smooth';

const Sidebar = ({ children }: { children: ReactNode }) => {

    const { theme } = useTheme();
    const [iconColor, setIconColor] = useState('black');

    const size = useMediaQuery('(min-width: 640px)') ? 20 : 15;
    const paddingTop = useMediaQuery('(max-width: 767px)') ? '80px' : '0px';

    useEffect(() => {
        setIconColor(theme === 'lightTheme' ? 'black' : 'gold');
    }, [theme]);
    return (
        <div className='lg:flex md:flex sm:block'>
            <div className='lg:w-20 lg:h-screen lg:flex-col lg:border-r-[5px] lg:fixed
                            md:w-20 md:h-screen md:flex-col md:border-r-[5px] md:fixed
                            sm:h-20 sm:w-full sm:border-b-[5px] sm:sticky sm:top-0 sm:flex-row sm:items-center 
                            p-1 bg-background overflow-x-auto z-50 flex border-border'>
                <div className={linkClassName.replace(" hover:ml-0 hover:mr-0 hover:bg-foreground smooth", "")}>
                    <ThemeSwitcher />
                </div>
                <NavLink href="/" ><RxHome size={size} color={iconColor} /></NavLink >
                <NavLink href="/places" ><GrTable size={size} color={iconColor} /> </NavLink >
                <NavLink href="/dash" ><FaRegChartBar size={size} color={iconColor} /> </NavLink >
                <NavLink href="/api" > <RxLightningBolt size={size} color={iconColor} /> </NavLink >
                <NavLink href="/contact" ><RxEnvelopeOpen size={size} color={iconColor} /> </NavLink >
                <NavLink href="/map" ><FaMapMarkedAlt size={size} color={iconColor} /> </NavLink >
                <NavLink href="https://github.com/JordanTPhysics/Dashboarding" ><FiGithub size={size} color={iconColor} /> </NavLink >
            </div>
            <main className='lg:ml-20 md:ml-20 w-screen lg:w-full h-full'>
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