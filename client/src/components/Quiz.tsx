import {QuizProps} from "./Interfaces.tsx";
import {useCallback, useEffect, useState} from "react";
import {Arrows} from "./Icons.tsx";
import {Buttons} from "./Classes.tsx";

function randomizeContent(data: QuizProps[]): void {
    if (!data) return;
    for (let index = data.length - 1; index > 0; index--) {
        const value = Math.floor(Math.random() * index)
        const temp = data[index]
        data[index] = data[value]
        data[value] = temp
    }
}

export default function Quiz(props: { params: QuizProps[] | undefined }): JSX.Element {

    const content = props.params || [];
    const [show, setShow] = useState<boolean>(false);

    function handleClick(): void {
        setShow(!show)
    }

    useCallback(() => {
        randomizeContent(content);
    }, [content])

    useEffect(() => {
        function handler(e: KeyboardEvent) {
            switch (e.key) {
                case "Enter":
                    handleClick();
                    break;
            }
        }

        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    })


    return (
        <main className={"grid grid-rows-2 gap-8 w-4/6 h-4/6"}>
            <section
                className={"rounded-lg bg-zinc-100 p-4 shadow-lg border border-zinc-800 h-fit flex items-center justify-evenly gap-4"}>
                <button className={Buttons.ARROW}>
                    <img src={Arrows.LEFT_ARROW} alt={"left arrow"}/>
                </button>
                <header className={"flex items-center justify-evenly gap-4"}>
                    <h2 className={"text-2xl text-zinc-800 font-bold"}>{content[0]?.question}</h2>
                    <button className={"rounded-lg bg-amber-300 p-2 text-xl font-bold shadow-md"}
                            onClick={handleClick}>
                        Show
                    </button>
                </header>
                <button className={Buttons.ARROW}>
                    <img src={Arrows.RIGHT_ARROW} alt={"right arrow"}/>
                </button>
            </section>
            <section
                className={"flex items-center justify-center text-3xl text-zinc-800 font-bold text-center h-60"}>
                {show ? (
                    <header className={"flex flex-col items-center justify-center gap-4"}>
                        <h3 className={"font-thin"}>{"Solution"}</h3>
                        <h2>{content[0]?.answer}</h2>
                    </header>
                ) : (<></>)}
            </section>
        </main>
    )
}