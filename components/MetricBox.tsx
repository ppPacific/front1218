"use client"

import Link from "next/link";
import Image from "next/image";
import React from "react";

interface Props {
    title: string;
    metric: string | number;

}

const MetricBox = ({ title, metric }: Props) => {
    return (
        <div className="p-4 rounded">
            {title.replace(/_/g, " ")}<br/><span className={"font-extrabold text-base"}>{metric}</span>
        </div>
    )
}

export default MetricBox
