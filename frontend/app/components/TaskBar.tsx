import { useRecoilValue } from "recoil";
import { filt } from "../store/atom";
import { Filter } from "./filter";
import { Sorting } from "./sorting";
import { IoFileTrayFullOutline } from "react-icons/io5";
import { TbUrgent } from "react-icons/tb";
import { GrInProgress } from "react-icons/gr";
import { MdOutlineCloudDone } from "react-icons/md";
import { OpenSidebar } from "./SideButton";


export function TaskBar(){
    
    const currentState = useRecoilValue(filt)
// / alll todo progress completed
    return(
        <div className="h-16 p-2 text-xl font-bold bg-black mb-2 flex justify-between items-center px-4">
            <div className="lg:hidden block">
                <OpenSidebar/>
            </div>
            <div className=" w-fit">
                {currentState === "all" ? (<div className="flex items-center  gap-2 justify-between"><IoFileTrayFullOutline className="text-blue-400"/><div>ALL Task</div> </div>):
                (currentState === "ToDo") ? <div className="flex items-center gap-2 justify-between"><TbUrgent className="text-red-500"/><div>Todo</div></div>:
                (currentState === "In Progress") ? <div className="flex items-center gap-2 justify-between"><GrInProgress className="text-yellow-400"/><div>In Progress</div></div>:
                <div className="flex items-center gap-2 justify-between"><MdOutlineCloudDone className="text-green-400"/><div>Completed</div></div>}
            </div>
            <div className="flex w-28  justify-between items-center">
                <Filter/>
                <Sorting/>
            </div>
        </div>
    )
}