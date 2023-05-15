import {useEffect, useState} from "react";

export default function useWindowSize() {
    const BREAKPOINT = 1023;
    const [isMobile, setIsMobile] = useState(window.innerWidth < BREAKPOINT);

    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth < BREAKPOINT);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, [])

    return isMobile;
}