export interface Todo{
    _id:string,
    title:string,
    description:string,
    dueDate:string,
    status:string,
    priority:"High"|"Medium"|"Low"
}


export interface Task {
    id: string
    content: string
}
  

  
export interface Column {
    id: string
    title: string
    tasks: Todo[]
}
  