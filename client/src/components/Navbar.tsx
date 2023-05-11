import {NavClasses} from "./Classes.tsx";

export default function Navbar(): JSX.Element {

    const data = [
        {
            name: "Python",
        },
        {
            name: "Generic",
        },
        {
            name: "Django",
        },
        {
            name: "Flask",
        },
        {
            name: "Postgres",
        },
        {
            name: "MySQL",
        },
        {
            name: "MongoDB",
        }
    ];


    return (
        <nav className={NavClasses.PARENT}>
            <ul className={NavClasses.UL}>
                {data.map((item, index) => (
                    <li key={index} className={NavClasses.LI}>
                        {item.name}
                    </li>
                ))}
            </ul>
        </nav>
    );
}