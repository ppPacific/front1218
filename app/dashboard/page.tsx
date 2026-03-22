import React from 'react'
import {useTranslations} from "next-intl";
import {events} from "@/lib/constants";
import MetricBox from "@/components/MetricBox";

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
