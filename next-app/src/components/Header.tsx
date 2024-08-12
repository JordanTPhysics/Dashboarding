"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import { useTheme } from "next-themes";

const ThemeSwitcher = dynamic(() => import("./ThemeSwitcher"), { ssr: false });

const useMediaQuery = (width: Number) => {
    const [targetReached, setTargetReached] = useState(false);
  
    const updateTarget = useCallback((e: MediaQueryListEvent) => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    }, []);
  
    useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      if (media.addEventListener) {
        media.addEventListener("change", updateTarget);
      } else {
        // compatibility for browser that dont have addEventListener
        media.addListener(updateTarget);
      }
      // Check on mount (callback is not called until a change occurs)
      if (media.matches) {
        setTargetReached(true);
      }
      if (media.removeEventListener) {
        return () => media.removeEventListener('change', updateTarget);
      } else {
        // compatibility for browser that dont have removeEventListener
        return () => media.removeListener(updateTarget);
      }
    }, []);
  
    return targetReached;
  };

export default function Header() {

    const isBreakpoint = useMediaQuery(768);
    const buttonClassName = "lg:m-3 md:m-2 sm:m-1 m-2 custom-link text-nowrap transition-all";
    const listClassName = "navigation-menu flex flex-wrap flex-grow justify-center lg:m-3 sm:m-1 md:m-2 md:col-span-5 lg:col-span-5 sm:col-span-1 sm:row-span-1";
    return (
        <header className="w-full grid md:grid-cols-8 lg:grid-cols-8 bg-secondary">
            <div className="logo  md:col-span-1 lg:col-span-1 sm:row-span-2">
                <Link href="#">
                    <Image src="/next.svg" width={100} height={100} alt="logo"></Image>
                </Link >
            </div>
            <ul className={listClassName}>
                <li >
                    <Link href="/" className={buttonClassName}>Home</Link >
                </li>
                <li >
                    <Link href="/places" className={buttonClassName}>Places </Link >
                </li>
                <li >
                    <Link href="/dash" className={buttonClassName}>Dash </Link >
                </li>
                <li >
                    <Link href="/api" className={buttonClassName}> API </Link >
                </li>
                <li >
                    <Link href="/contact" className={buttonClassName}>Contact </Link >
                </li>
                <li >
                    <Link href="/form" className={buttonClassName}>Search </Link >
                </li>
                <li >
                    <ThemeSwitcher />
                </li>
            </ul>
        </header>
    );
}