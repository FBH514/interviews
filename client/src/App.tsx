import {useEffect, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import Quiz from "./components/Quiz.tsx";
import Navbar from "./components/Navbar.tsx";
import useCache from "./hooks/useCache.tsx";
import {HotkeysProps, QuizProps} from "./types/Interfaces.tsx";
import {Endpoints, QueryKeys} from "./constants/Endpoints.tsx";
import {AppStyles, NavStyles} from "./constants/Classes.tsx";
import {Keys, Logo, Nav} from "./constants/Icons.tsx";
import {CacheKeys} from "./constants/CacheKeys.tsx";
import {CACHE} from "./utils/Cache.tsx";
import useWindowSize from "./hooks/useWindowSize.tsx";
import {Hotkeys} from "./components/Tooltips.tsx";
import {motion} from "framer-motion";

async function GET(endpoint: string): Promise<any> {
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}
        \nhttps://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${response.status}`);
    }
    return await response.json();
}

const hotkeys: HotkeysProps[] = [
    {
        hotkey: "Show/Hide Menu",
        icon: Keys.ESCAPE
    },
    {
        hotkey: "Show/Hide Solution",
        icon: Keys.ENTER
    },
    {
        hotkey: "Previous Question",
        icon: Keys.LEFT_ARROW
    },
    {
        hotkey: "Next Question",
        icon: Keys.RIGHT_ARROW
    }
]

export default function App(): JSX.Element {
    const queryCache = useQueryClient();
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [content, setContent] = useState<QuizProps[]>([]);
    const [data, setData] = useCache<string>(CacheKeys.TOPIC);
    const mobile = useWindowSize();

    const {data: topics} = useQuery<string[]>(QueryKeys.TOPICS, () => GET(Endpoints.TOPICS), CACHE);
    // const {data: hotkeys} = useQuery<string[]>(QueryKeys.HOTKEYS, () => GET(Endpoints.HOTKEYS), CACHE);

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
        handleClick();
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
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            className={showMenu ? (!mobile ? AppStyles.PARENT_SHOW_DESKTOP : AppStyles.PARENT_SHOW_MOBILE) : AppStyles.PARENT_DESKTOP}
            style={showMenu ? (!mobile ? {gridTemplateColumns: "fit-content(100%) 1fr"} : {gridTemplateRows: "fit-content(100%) 1fr"}) : {gridTemplateColumns: "1fr"}}
        >
            <Menu/>
            {showMenu && <Navbar topics={topics} onTopicClick={handleTopicClick}/>}
            <Quiz params={content} topic={data}/>
            <Hotkeys hotkeys={hotkeys} className={"bottom-0 right-0 absolute"}>
                <button className={"p-4 flex items-center justify-center gap-2"}>
                    <h2 className={"text-sm font-thin"}>Hotkeys</h2>
                    <img src={Keys.INFO} alt="info"/>
                </button>
            </Hotkeys>
            <div className={"absolute top-0 right-0 p-4 flex items-center"}>
                <h2 className={"text-2xl font-thin"}>Hike</h2>
                <img src={Logo.NAV} alt="pine"/>
            </div>
        </motion.div>
    );
}