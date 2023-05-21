import {useState} from "react";
import {HotkeysProps} from "../types/Interfaces.tsx";

export const Hotkeys = ({hotkeys, children, className}: {
    hotkeys: HotkeysProps[],
    children: JSX.Element,
    className?: string
}) => {

    const [show, setShow] = useState<boolean>(false);

    return (
        <div className={className}>
            <div className={"relative"} onMouseLeave={() => setShow(false)} onMouseEnter={() => setShow(true)}>
                {children}
                {show && <div
                    className={"p-4 rounded-lg bg-zinc-900 text-zinc-100 text-xl absolute right-full bottom-1/2 mr-2 flex flex-col gap-4 min-w-max whitespace-nowrap"}>
                    {hotkeys?.map((item, index) => (
                        <div key={index} className={"flex items-center gap-2"}>
                            <img src={item.icon} alt={""}/>
                            <h2>{item.hotkey}</h2>
                        </div>
                    ))}
                </div>}
            </div>
        </div>
    )
}
