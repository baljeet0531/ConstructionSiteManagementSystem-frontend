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

export function Feature(props: { children: string }) {

    let route = "/home"
    let icon = PlaceIcon
    switch (props.children) {
        case "工地管理":
            route = "/place"
            icon = PlaceIcon
            break
        case "排程管理":
            route = "/schedule"
            icon = ScheduleIcon
            break
        case "人才管理":
            route = "/people"
            icon = PeopleIcon
            break
        case "工安表單":
            route = "/security"
            icon = SecurityIcon
            break
        case "進度報表":
            route = "/report"
            icon = ReportIcon
            break
        case "照片管理":
            route = "/photo"
            icon = PhotoIcon
            break
        case "總覽":
            route = "/dashboard"
            icon = DashboardIcon
            break
        default:
            route = "/home"
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
        <NavLink to={route} style={({ isActive }) =>
            isActive ? activeStyle : inActiveStyle
        }>
            <Icon as={icon}></Icon>
            {props.children}
        </NavLink>
    )
}