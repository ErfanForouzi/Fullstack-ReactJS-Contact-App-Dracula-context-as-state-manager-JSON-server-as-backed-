import { createContext } from "react";

export const TodoContext = createContext({
    loading:false,
    setLoading:()=>{},
    todos:[],
    setTodos:()=>{},
    filteredTodos:[],
    setFilteredTodos:()=>{},
    createTodo:()=>{},
    deleteTodo:()=>{},
    searchTodo:()=>{},
    todoQuery:{},
})