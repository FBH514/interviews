import {ButtonStyles} from "../constants/Classes.tsx";
import {HotkeysProps} from "../types/Interfaces.tsx";

export function Hotkeys({showHotkeys: showHotkeys, setShowHotkeys, hotkeys}: HotkeysProps): JSX.Element {
    return (
        <div className={"absolute bottom-0 left-50 p-4 flex flex-col gap-4 items-center"}>
            {showHotkeys ? (
                <section className={"flex flex-col items-center gap-2"}>
                    {hotkeys?.map((item, index) => (
                        <p key={index} className={"text-center font-bold text-2xl text-stone-100"}>
                            {item}
                        </p>
                    ))}
                </section>
            ) : (
                <></>
            )}
            <button className={ButtonStyles.SHOW} onClick={() => setShowHotkeys(!showHotkeys)}>
                {showHotkeys ? "Close" : "Hotkeys"}
            </button>
        </div>
    );
}
