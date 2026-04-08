import React from 'react'
import {events} from "@/lib/constants";
import MetricBox from "@/components/MetricBox";
interface PanelDataI {
    adoptRate: number,
    visitTraffic: number,
    emailRate: number,
    socialmediaRate: number,
    queryRate: number
}
const dataSet01:PanelDataI[] = [
    {adoptRate:3,
    visitTraffic:30,
    emailRate:20,
        socialmediaRate:40,
    queryRate:20,
    }
]
const Page = () => {
    // const t = useTranslations("home");
    return (
        <div>
            <h2>Dashboard Page</h2>
            <ul className="events">
                {events && events.length > 0 && events.map((event: IEvent) => (
                    <li key={event.title} className="list-none">
                        <MetricBox {...event} />
                    </li>
                ))}
            </ul>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="bg-gray-200 p-4 rounded">Card 1</div>
                <div className="bg-gray-200 p-4 rounded">Card 2</div>
                <div className="bg-gray-200 p-4 rounded">Card 3</div>
                <div className="bg-gray-200 p-4 rounded">Card 4</div>
            </div>
        </div>
    )
}
export default Page
