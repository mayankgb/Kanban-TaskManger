"use client"

import { FaFilter } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRecoilState } from "recoil";
import { filt } from "../store/atom";
 

export function Filter(){

    const [filter,setFilter] = useRecoilState(filt)
    
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="outline"><FaFilter className="text-yellow-500"/></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
                <DropdownMenuRadioItem value="all">ALL</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="ToDo">Todo</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="In Progress">Progress</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Completed">Completed</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            </DropdownMenuContent>
      </DropdownMenu>
    )

}