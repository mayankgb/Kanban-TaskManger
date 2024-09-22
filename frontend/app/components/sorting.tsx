"use client"
import { FcGenericSortingDesc } from "react-icons/fc";
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
import { useRecoilState, useSetRecoilState } from "recoil";
import { sortArr, task } from "../store/atom";

 

export function Sorting(){

    const[sort,setSort] = useRecoilState(sortArr)
    const setTodo = useSetRecoilState(task)

    const priority = {
      "High":1,
      "Medium":2,
      "Low":3
    }
    const handleClick = (value: string) => {
      if (sort !== value) {
        setSort(value);
  
        // Retrieve the current todos
        setTodo((prev) => {
          const sortedTodos = [...prev].sort((a, b) => {
            const aPriority = priority[a.priority];
            const bPriority = priority[b.priority];
            return value === "hightolow" ? aPriority - bPriority : bPriority - aPriority;
          });
          return sortedTodos; // Return the sorted array
        });
      }
    };

    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="outline"><FcGenericSortingDesc className=""/></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Priority</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={sort} onValueChange={(value)=>handleClick(value)}>
                <DropdownMenuRadioItem value="hightolow" >High-to-Low</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="lowtohigh" >Low-to-high</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            </DropdownMenuContent>
      </DropdownMenu>
    )

}