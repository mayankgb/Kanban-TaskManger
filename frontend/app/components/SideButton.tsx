import { IoReorderThreeSharp } from "react-icons/io5";
import { useSetRecoilState } from "recoil";
import { isOpen } from "../store/atom";

export function OpenSidebar(){
    const setIsOpen = useSetRecoilState(isOpen)

    const handleClick = ()=>{
        setIsOpen((prev)=>!prev)
      }
    
    return(
        <div className="cursor-pointer" onClick={handleClick}>
             <IoReorderThreeSharp/>
        </div>
    )
}