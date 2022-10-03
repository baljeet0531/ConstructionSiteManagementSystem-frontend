import React from "react";

export default function MainScreen(props: { children: React.ReactNode }) {
    return (
        <main>{props.children}</main>
    )
}