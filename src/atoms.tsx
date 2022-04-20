import { atom } from "recoil";
export interface ITodo{
    id: number;
    text: string;
}
interface IToDoState {
    [key: string]: ITodo[];
}
export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        "ToDo": [],
        doing: [],
        Done: [],
    },
});   

//data
//ex)[{text:"hello",id:1},{text:"doit",id:2}]