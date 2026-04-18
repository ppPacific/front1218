"use client"
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";
import {Button} from "@/components/ui/button";

type DogSearchModalProps = {
    open: boolean;
    onClose: () => void;
};
const DogSearchModal = ({ open, onClose }: DogSearchModalProps) => {
    if (!open) return null;
    return (
        <div className={"px-4 min-h-[calc(100dvh-12rem)] max-h-[calc(100dvh-4rem)] backdrop-blur-sm inset-0 text-black fixed top-0 left-0 w-full flex flex-col z-60 overflow-y-auto bg-white"}>
            <div className={"relative"}>
                <div
                    className={'absolute right-[8%] mt-10 cursor-pointer'}>
                    <span onClick={onClose}>
                        <X className={"h-4 w-4 font-semibold"}/>
                    </span>
                </div>
                </div>
                <div className="mt-4">
                    <Image
                        src={"/images/logo_bringlovehome_b.png"}
                        alt={"Bring Love Home"}
                        // fill
                        className="mx-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        width={260}
                        height={260}
                    />
                </div>

                <div className={"modal__search-wrap"}>
                    <div className={"modal__search"}>
                        <div className={"modal__input-wrap"}>
                            <input className={"modal__input"} placeholder={"search doggies..."} value={""} type={"text"} onChange={()=>{}}/>
                        </div>
                        <Button className={"modal__button"}>SEARCH</Button>
                        </div>

                </div>
                <div className={"suggestion_block"}>category</div>
        </div>
    )
}

export default DogSearchModal
