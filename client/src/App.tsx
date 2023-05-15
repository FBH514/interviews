import {useEffect, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import Quiz from "./components/Quiz.tsx";
import Navbar from "./components/Navbar.tsx";
import useCache from "./hooks/useCache.tsx";
import {QuizProps} from "./types/Interfaces.tsx";
import {Endpoints, QueryKeys} from "./constants/Endpoints.tsx";
import {AppStyles, NavStyles} from "./constants/Classes.tsx";
import {Nav} from "./constants/Icons.tsx";
import {CacheKeys} from "./constants/CacheKeys.tsx";
import {CACHE} from "./utils/Cache.tsx";
import useWindowSize from "./hooks/useWindowSize.tsx";
import {Hotkeys} from "./components/Hotkeys.tsx";

async function GET(endpoint: string): Promise<any> {
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}
        \nhttps://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${response.status}`);
    }
    return await response.json();
}

export default function App(): JSX.Element {
    const queryCache = useQueryClient();
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [showHotkeys, setShowHotkeys] = useState<boolean>(false);
    const [content, setContent] = useState<QuizProps[]>([]);
    const [data, setData] = useCache<string>(CacheKeys.TOPIC);
    const mobile = useWindowSize();

    const {data: topics} = useQuery<string[]>(QueryKeys.TOPICS, () => GET(Endpoints.TOPICS), CACHE);
    const {data: hotkeys} = useQuery<string[]>(QueryKeys.HOTKEYS, () => GET(Endpoints.HOTKEYS), CACHE);

    const {mutate} = useMutation(
        Endpoints.CONTENT,
        () => GET(`${Endpoints.CONTENT}/${data}`),
        {
            onSuccess: (data) => queryCache.setQueryData(QueryKeys.CONTENT, data),
            onError: (error) => console.log(error),
        }
    );

    async function handleTopicClick(topic: string) {
        const response = await GET(`${Endpoints.TOPICS}/${topic}`);
        setData(topic);
        setContent(response);
        await mutate();
    }

    function handleClick(): void {
        setShowMenu(!showMenu);
    }

    useEffect(() => {
        async function handler() {
            const response = await GET(`${Endpoints.TOPICS}/${data}`);
            setContent(response);
        }

        handler();
    }, [data]);

    useEffect(() => {
        function handler(e: KeyboardEvent) {
            if (e.key === "Escape") {
                setShowMenu(!showMenu);
            }
        }

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    });

    function Menu(): JSX.Element {
        return (
            <div className={NavStyles.MENU} onClick={handleClick}>
                <img src={showMenu ? Nav.CLOSE : Nav.OPEN} alt={showMenu ? "close" : "open"}
                     className={"p-2 bg-transparent"}/>
            </div>
        );
    }

    return (
        <div
            className={showMenu ? (!mobile ? AppStyles.PARENT_SHOW_DESKTOP : AppStyles.PARENT_SHOW_MOBILE) : AppStyles.PARENT_DESKTOP}
            style={showMenu ? (!mobile ? {gridTemplateColumns: "fit-content(100%) 1fr"} : {gridTemplateRows: "fit-content(100%) 1fr"}) : {gridTemplateColumns: "1fr"}}
        >
            <Menu/>
            <Hotkeys showHotkeys={showHotkeys} setShowHotkeys={setShowHotkeys} hotkeys={hotkeys}/>
            {showMenu && <Navbar topics={topics} onTopicClick={handleTopicClick}/>}
            <Quiz params={content} topic={data}/>
        </div>
    );
}