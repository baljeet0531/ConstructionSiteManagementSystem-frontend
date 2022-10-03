import React from "react";
import { HStack } from "@chakra-ui/react";
import Sidebar from "./Sidebar/Sidebar";
import MainScreen from "./MainScreen/MainScreen";
import Background from "../Images/WhiteLoginBackground.svg"

export default function Layout(props: { page: React.ReactNode }) {

  const features = [
    "工地管理",
    "排程管理",
    "人才管理",
    "工安表單",
    "進度報表",
    "照片管理",
    "總覽"
  ]
  return (
    <HStack align="top" backgroundImage={`url(${Background})`}>
      <Sidebar features={features} />
      <MainScreen>{props.page}</MainScreen>
    </HStack>
  )
}