"use client"

import KanbanBoard from "../components/kanbanBoard";
import { SideBar } from "../components/SideBar";
import { MobileSideBar } from "../components/MobileSideBar";
import { useTodo } from "../hooks";
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { useRecoilValue } from "recoil";
import { mobileView } from "../store/atom";
import { MobileAllTodo } from "../components/MobileAllTodo";
import {useMediaQuery} from "react-responsive"
import { BiLoader } from "react-icons/bi";

export default function Dashboard(){
    const { loading, todo } = useTodo()
    const isMobile = useRecoilValue(mobileView)
    const isSmallScreen = useMediaQuery({ query: '(max-width: 1024px)' });

    if (loading) {
        return (
          <div className="flex justify-center items-center h-screen">
            <BiLoader className="animate-spin text-lg"/>
          </div>
        )
      }

    return(
        <div className="relative flex">
            {/* <AnimatePresence mode="popLayout"> */}
             <MobileSideBar/>
            {/* </AnimatePresence> */}
            <SideBar/>
            {isSmallScreen && isMobile?<MobileAllTodo/>:<KanbanBoard/>}
        </div>
    )
}