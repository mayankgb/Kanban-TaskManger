import { useRecoilState, useSetRecoilState } from "recoil";
import { isOpen, mobileView } from "../store/atom";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function MobileSideBar() {
  const [open, setOpen] = useRecoilState(isOpen);
  const [isMobile,setIsMobile] = useRecoilState(mobileView)

  const handleClick = () => {
    setOpen(false);
  };
  const handleButton =()=>{
    setIsMobile((prev)=>!prev)
    setOpen((prev)=>!prev)
  }

  return (
    // AnimatePresence around the conditional render based on `open`
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.04 } }}
          exit={{ opacity: 0 }}
          className="z-30 absolute flex items-center w-full h-screen bg-black/13 backdrop-blur-sm "
        >
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
            exit={{ x: -100, transition: { duration: 0.4, ease: "easeInOut" } }}
            className="z-40 h-screen w-96 px-2 pt-4 bg-secondary"
          >
            <div className="text-2xl text-white font-bold ">
              Todo Manager
            </div>
            <Button onClick={handleButton} className="mt-4 w-full hover:bg-white hover:text-black" variant={"outline"}>{isMobile?"KanBan Board":"All Todo"}</Button>
            </motion.div>
          {/* When clicking on the overlay, close the sidebar */}
          <div onClick={handleClick} className="bg-transparent w-full h-screen"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
