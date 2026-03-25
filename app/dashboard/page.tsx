import React from 'react'
import {events} from "@/lib/constants";
import MetricBox from "@/components/MetricBox";
interface PanelDataI {
    adoptRate: number,
    visitTraffic: number,
    emailRate: number,
    socialmediaRate: number
}
const dataSet01:PanelDataI[] = [
    {adoptRate:3,
    visitTraffic:30,
    emailRate:20,
        socialmediaRate:40,

    }
]
const Page = () => {
    // const t = useTranslations("home");
    return (
        <div>
            Dashboard Page
            <h2>Youkoso!</h2>
            <ul className="events">
                {events && events.length > 0 && events.map((event: IEvent) => (
                    <li key={event.title} className="list-none">
                        <MetricBox {...event} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Page
