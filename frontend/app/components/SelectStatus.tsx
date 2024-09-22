import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Dispatch, SetStateAction } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function SelectStatus({setStatus, status}:{setStatus:Dispatch<SetStateAction<{ title: string; description: string; status: string; priority: "High" | "Medium" | "Low"; dueDate: string;}>>,status?:string}) {

    const handleClick = (e:string)=>{
        setStatus((prev)=>({
            ...prev,
            status:e
        }))
    }

  return (
    <Select required value={status} onValueChange={(e)=>handleClick(e)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          <SelectItem value="ToDo">Todo</SelectItem>
          <SelectItem value="In Progress">In Progress</SelectItem>
          <SelectItem value="Completed">Completed</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export function SelectPriority({setPriority, priority}:{setPriority:Dispatch<SetStateAction<{ title: string; description: string; status: string; priority: "High" | "Medium" | "Low"; dueDate: string; }>>, priority?:string}) {

    const handleClick = (e:string)=>{
        setPriority((prev)=>({
            ...prev,
            priority:e as "High" | "Medium" | "Low"}))
    }

  return (
    <Select required value={priority} onValueChange={(e)=>handleClick(e)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a priority"/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Priority</SelectLabel>
          <SelectItem value="Low">Low</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="High">High</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}



export function DatePicker({date,setDate}:{date:string,setDate:Dispatch<SetStateAction<{ title: string; description: string; status: string; priority: "High" | "Medium" | "Low"; dueDate: string; }>>}) {

    const handleDate = (e:Date | undefined)=>{ 
        setDate((prev)=>({
            ...prev,
            dueDate:e?e.toISOString():date
        }))
    }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={new Date(date)}
          onSelect={(e)=>handleDate(e)}
          initialFocus
          disabled={(dis) => dis < new Date()}
        />
      </PopoverContent>
    </Popover>
  )
}
