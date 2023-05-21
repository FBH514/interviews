import {NavStyles} from "../constants/Classes.tsx";
import useWindowSize from "../hooks/useWindowSize.tsx";
import {Logo} from "../constants/Icons.tsx";
import {motion} from "framer-motion";

export default function Navbar(props: {topics: string[] | undefined, onTopicClick: (topic: string) => void}): JSX.Element {

    const topics = props.topics;
    const mobile = useWindowSize();

    function handleClick(item: string): void {
        props.onTopicClick(item);
    }

    return (
        <motion.nav
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 1}}
            className={!mobile ? NavStyles.PARENT_DESKTOP : NavStyles.PARENT_MOBILE}>
            <div className={"flex items-center gap-2"}>
                <h1 className={"font-thin text-6xl"}>Hike</h1>
                <img src={Logo.NAV} alt="pine"/>
            </div>
            <ul className={NavStyles.UL}>
                {topics?.map((item: string, index: number) => (
                    <li key={index} className={NavStyles.LI} onClick={() => handleClick(item)}>
                        {item}
                    </li>
                ))}
            </ul>
        </motion.nav>
    );
}