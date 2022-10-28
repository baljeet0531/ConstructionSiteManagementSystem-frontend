import { Icon } from "@chakra-ui/react";
import { NavLink } from 'react-router-dom';
import React from "react";

import {
    PlaceIcon,
    ScheduleIcon,
    PeopleIcon,
    SecurityIcon,
    ReportIcon,
    PhotoIcon,
    DashboardIcon,
} from "../../Icons/Icons";

export function Feature(props: { feature: string }) {

    let featureName = ""
    let icon = PlaceIcon
    switch (props.feature) {
        case "site":
            featureName = "工地管理"
            icon = PlaceIcon
            break
        case "schedule":
            featureName = "排程管理"
            icon = ScheduleIcon
            break
        case "people":
            featureName = "人才管理"
            icon = PeopleIcon
            break
        case "security":
            featureName = "工安表單"
            icon = SecurityIcon
            break
        case "report":
            featureName = "進度報表"
            icon = ReportIcon
            break
        case "photo":
            featureName = "照片管理"
            icon = PhotoIcon
            break
        case "dashboard":
            featureName = "總覽"
            icon = DashboardIcon
            break
        default:
            featureName = ""
            icon = PlaceIcon
    }

    const inActiveStyle = {
        display: "flex",
        alignItems: "center",
        borderRadius: "4px",
        fontSize: "15px",
        fontFamily: "Inter",
        lineHeight: "28px",
        fontStyle: "normal",
        height: "28px",
        gap: "6px",
        paddingLeft: "6px",

        color: "#667080",
        fontWeight: "400",
    }

    const activeStyle = {
        ...inActiveStyle,
        background: '#E3ECFF',
        color: "#4C7DE7",
        fontWeight: "700",
    }

    return (
        <NavLink to={`/${props.feature}`} style={({ isActive }) =>
            isActive ? activeStyle : inActiveStyle
        }>
            <Icon as={icon}></Icon>
            {featureName}
        </NavLink>
    )
}