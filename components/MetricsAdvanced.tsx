import React, {Fragment} from "react";
import {ChartLineLinear} from "@/components/LineChart";


// interface Props {
//     title: string;
//     image: string;
//     slug: string;
//     location: string;
//     date: string;
//     time: string;
// }
const DogCard = () => {
    return (
        <Fragment>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
                {Object.entries(basicMetrics).map((itm,idx) =>
                    <div key={`m-${idx}`} className="p-4 border-l-4 border-l-blue-500">
                        {itm[0].replace(/_/g, " ")}<br/><span className={"font-extrabold text-base"}>{itm[1]}</span>
                    </div>
                )}

            </div>
            <br/>
            <ChartLineLinear />
        </Fragment>
    )

}
export default DogCard
