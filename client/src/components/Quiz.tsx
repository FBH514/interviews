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
    const [index, setIndex] = useState<number>(0);

    useCallback(() => {
        randomizeContent(content);
    }, [content])

    useEffect(() => {
        function handler(e: KeyboardEvent) {
            switch (e.key) {
                case "Enter":
                    handleClick();
                    break;
                case "ArrowLeft":
                    handlePrevious();
                    break;
                case "ArrowRight":
                    handleNext();
                    break;
            }
        }

        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    })

    function handleClick(): void {
        setShow(!show)
    }

    function handleNext(): void {
        const isLast = index === content.length - 1;
        isLast ? setIndex(0) : setIndex(index + 1);
    }

    function handlePrevious(): void {
        const isFirst = index === 0;
        isFirst ? setIndex(content.length - 1) : setIndex(index - 1);
    }

    return (
        <main className={"grid grid-rows-2 gap-8 w-4/6 h-4/6"}>
            <section
                className={"rounded-lg bg-stone-200 p-4 shadow-lg border border-stone-700 h-fit flex items-center justify-evenly gap-4"}>
                <button className={Buttons.ARROW} onClick={handlePrevious}>
                    <img src={Arrows.LEFT_ARROW} alt={"left arrow"}/>
                </button>
                <header className={"grid grid-cols-2 items-center gap-4 text-center w-full"} style={{gridTemplateColumns: "1fr fit-content(100%)"}}>
                    <h2 className={"text-2xl text-stone-700 font-bold"}>{content[index]?.question}</h2>
                    <button className={Buttons.SHOW} onClick={handleClick}>{"Show"}</button>
                </header>
                <button className={Buttons.ARROW} onClick={handleNext}>
                    <img src={Arrows.RIGHT_ARROW} alt={"right arrow"}/>
                </button>
            </section>
            <section
                className={"flex items-center justify-center text-3xl text-stone-700 font-bold text-center h-60"}>
                {show ? (
                    <header className={"flex flex-col items-center justify-center gap-4"}>
                        <h3 className={"font-thin"}>{"Solution"}</h3>
                        <h2>{content[index]?.answer}</h2>
                    </header>
                ) : (<></>)}
            </section>
        </main>
    )
}