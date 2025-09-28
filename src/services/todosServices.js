import axios from "axios";

const SERVER_URL = "http://localhost:9000";

//GET ALL TODOS
export const getAllTodos = ()=>{
    const url = `${SERVER_URL}/todos`;
    return axios.get(url)
}
//GET TODO WITH todoId
export const getTodo = (todoId)=>{
    const url = `${SERVER_URL}/todos/${todoId}`;
    return axios.get(url)
}
//POST CREATE Todo
export const createTodo = (todo)=>{
    const url = `${SERVER_URL}/todos`;
    return axios.post(url,todo)
}
//PUT Edit Todo
export const editTodo = (todo,todoId)=>{
    const url = `${SERVER_URL}/todos/${todoId}`;
    return axios.put(url,todo)
}
//DELETE Edit Todo
export const deleteTodo = (todoId)=>{
    const url = `${SERVER_URL}/todos/${todoId}`;
    return axios.delete(url)
}