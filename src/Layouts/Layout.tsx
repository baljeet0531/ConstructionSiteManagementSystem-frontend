import React from "react";
import { HStack } from "@chakra-ui/react";
import Sidebar from "./Sidebar/Sidebar";
import MainScreen from "./MainScreen/MainScreen";
import Background from "../Images/WhiteLoginBackground.svg"

export default function Layout(props: { page: React.ReactNode }) {

  return (
    <HStack align="top" backgroundImage={`url(${Background})`}>
      <Sidebar />
      <MainScreen>{props.page}</MainScreen>
    </HStack>
  )
}