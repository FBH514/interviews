import {QuizProps} from "./Interfaces.tsx";
import {Arrows} from "./Icons.tsx";
import {ButtonClasses} from "./Classes.tsx";
import {useEffect, useMemo, useRef, useState} from "react";

function randomizeContent(data: QuizProps[]): void {
    if (!data) return;
    for (let index = data.length - 1; index > 0; index--) {
        const value = Math.floor(Math.random() * index)
        const temp = data[index]
        data[index] = data[value]
        data[value] = temp
    }
}

export default function Quiz(props: { params: QuizProps[] | undefined, topic: string}): JSX.Element {

    const content = useMemo(() => props.params || [], [props.params]);
    const [show, setShow] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);
    const leftArrowRef = useRef<HTMLButtonElement>(null);
    const rightArrowRef = useRef<HTMLButtonElement>(null);

    useMemo(() => randomizeContent(content), [content])

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
        if (show) setShow(!show);
        if (rightArrowRef.current) rightArrowRef.current.click();
    }

    function handlePrevious(): void {
        const isFirst = index === 0;
        isFirst ? setIndex(content.length - 1) : setIndex(index - 1);
        if (show) setShow(!show);
        if (leftArrowRef.current) leftArrowRef.current.click();
    }

    return (
        <main className={"grid grid-rows-3 gap-8 w-9/12 h-5/6 justify-items-center items-center p-4"}
              style={{gridTemplateRows: "fit-content(100%) fit-content(100%) 1fr"}}>
            <section>
                <h1 className={"text-4xl text-stone-100 font-bold text-center"}>{props.topic} Questions</h1>
            </section>
            <section
                className={"rounded-lg bg-gradient-to-br from-stone-200 to-stone-100 p-4 shadow-md h-fit w-full flex items-center justify-evenly gap-4"}>
                <button className={ButtonClasses.ARROW} onClick={handlePrevious} ref={leftArrowRef}>
                    <img src={Arrows.LEFT_ARROW} alt={"left arrow"}/>
                </button>
                <header className={"grid grid-cols-2 items-center gap-4 text-center w-full"} style={{gridTemplateColumns: "1fr fit-content(100%)"}}>
                    <h2 className={"text-2xl text-stone-700 font-bold"}>{content[index]?.question}</h2>
                    <button className={ButtonClasses.SHOW} onClick={handleClick}>{"Show"}</button>
                </header>
                <button className={ButtonClasses.ARROW} onClick={handleNext} ref={rightArrowRef}>
                    <img src={Arrows.RIGHT_ARROW} alt={"right arrow"}/>
                </button>
            </section>
            <section
                className={"flex items-center justify-center text-3xl text-stone-700 font-bold text-center h-fit"}>
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