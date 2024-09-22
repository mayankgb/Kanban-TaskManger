import { Todo } from "../lib/types";
import { CalendarIcon, FlagIcon, CheckCircleIcon, XCircleIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {motion} from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DeleteTask } from "./DeleteTask";
import { EditTodo } from "./EditTask";

export function TodoCard({t}:{t?:Todo}){
    if (!t) {
        return
    }
    return(
        <motion.div 
            initial={{y:20, opacity:0}}
            animate={{y:0, opacity:1,}}
        >
            <Card key={t._id}>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                <span>{t.title}</span>
                <Badge variant={"secondary"}>
                    {t.status === 'Completed' ? (
                    <CheckCircleIcon className="w-4 h-4 mr-1" />
                    ) : (
                    <XCircleIcon className="w-4 h-4 mr-1" />
                    )}
                    {t.status}
                </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">{t.description}</p>
                <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    <span>{new Date(t.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                    <FlagIcon className="w-4 h-4 mr-1" />
                    <span>{t.priority}</span>
                </div>
                </div>
                <div className="flex w-11 items-center justify-between">
                <EditTodo todo={t}/>
                <DeleteTask id={t._id} status={t.status}/>
                </div>
                </div>
            </CardContent>
            </Card>
        </motion.div>
    )
}