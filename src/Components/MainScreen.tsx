import React from "react";

export default function MainScreen(props: { children: string }) {
    return (
        <main>{props.children}</main>
    )
}