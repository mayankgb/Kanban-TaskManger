import { atom } from "recoil";
import { Column, Todo } from "../lib/types";

export const task = atom<Todo[]>({
    key:"task",
    default:[]
})

export const sortArr = atom<string>({
    key:"sortArr",
    default:""
})

export const filt = atom<string>({
    key:"filt",
    default:"all"
})

export const finalArr = atom<Todo[]>({
    key:"finalArr",
    default:[]
})

export const isOpen = atom<boolean>({
    key:"isOpen",
    default:false
})

export const column = atom<Column[]>({
    key:"column",
    default:[
        { id: 'ToDo', title: 'To Do', tasks: [] },
        { id: 'In Progress', title: 'In Progress', tasks: [] },
        { id: 'Completed', title: 'Completed', tasks: []},
      ]
})

export const mobileView = atom<boolean>({
    key:"mobileView",
    default:false
})