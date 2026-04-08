import React from 'react'
import {events} from "@/lib/constants";
import MetricBox from "@/components/MetricBox";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {ChartLineLinear} from "@/components/LineChart";
interface PanelDataI {
    adoptRate: number,
    visitTraffic: number,
    emailRate?: number,
    socialmediaRate?: number,
    queryRate?: number
}
interface DataSourceI {
    adoptRate: string,

}
const dataSet01:PanelDataI[] = [
    {adoptRate:3,
    visitTraffic:30,
    emailRate:20,
        socialmediaRate:40,
    queryRate:20,
    }
]
const basicMetrics =
    {Query_Rate: 1200,
        Adoption_Rate:4,
    Organic_Traffic: 20}

const Page = () => {
    // const t = useTranslations("home");
    return (
        <div>
            <h2>Dashboard Page</h2>
            {/*<ul className="events">*/}
            {/*    {events && events.length > 0 && events.map((event: IEvent) => (*/}
            {/*        <li key={event.title} className="list-none">*/}
            {/*            <MetricBox {...event} />*/}
            {/*        </li>*/}
            {/*    ))}*/}
            {/*</ul>*/}
            <Tabs defaultValue="overview" className="min-w-[400px]">
                <TabsList>
                    <TabsTrigger value="overview">Basic metrics</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced metrics</TabsTrigger>

                </TabsList>
                <TabsContent value="overview">
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic metrics</CardTitle>
                            <CardDescription>
                            Default metrics showing

                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
                                {Object.entries(basicMetrics).map((itm,idx) =>
                                    <div key={`m-${idx}`} className="p-4 border-l-4 border-l-blue-500">
                                        {itm[0].replace(/_/g, " ")}<br/><span className={"font-extrabold text-base"}>{itm[1]}</span>
                                    </div>
                                )}

                            </div>
                            <br/>
                            <ChartLineLinear />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="advanced">
                    <Card>
                        <CardHeader>
                            <CardTitle>Advanced metrics</CardTitle>
                            <CardDescription>
                                Track performance and user engagement metrics. Monitor trends and
                                identify growth opportunities.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Page views are up 25% compared to last month.
                        </CardContent>
                    </Card>
                </TabsContent>


            </Tabs>


        </div>
    )
}
export default Page
