import {Dispatch, SetStateAction, useEffect, useState} from "react";

export default function useCache<T>(key: string, initialData = undefined): [T, Dispatch<SetStateAction<T>>] {

    const [data, setData] = useState<T>(() => {
        const storedData = window.localStorage.getItem(key);
        if (storedData === undefined) {
            return "Python"
        }
        return storedData ? JSON.parse(storedData) : initialData;
    });

    useEffect(() => {
        if(data !== undefined) {
            window.localStorage.setItem(key, JSON.stringify(data));
        }
    }, [key, data]);

    return [data, setData];
}
