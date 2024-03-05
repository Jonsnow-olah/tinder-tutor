"use client";

import { Location } from "@prisma/client";
import { IconType } from "react-icons";

import {
FcApproval,


} from "react-icons/fc";
import { LocationItem } from "./location-item";


interface LocationsProps {
    items: Location[];
}

const iconMap: Record<Location["name"], IconType> = {
    "Lagos state": FcApproval,
    "Rivers state": FcApproval,
    "FCT": FcApproval,
    "Osun state": FcApproval,
    "Ogun state": FcApproval,
    "Imo state": FcApproval,
    "Kano state": FcApproval,   
};

export const Locations = ({
    items,

}: LocationsProps) => {
    return (
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
            {items.map((item) =>(
                <LocationItem 
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name]}
                    value={item.id}
                />
            ))}
        </div>
    )
}