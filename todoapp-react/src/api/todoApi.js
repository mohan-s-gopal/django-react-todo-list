import {HttpClient} from './httpClient' 

// This is the API. The backend root URL can be set from here.

const TODO_API = 'http://127.0.0.1:8000'

// The CRUD Operations of the Todo Resource.


//Create
const createTodo = todo => {
    return HttpClient.post(`${TODO_API}/todolist`, todo)
}

//Read
const getTodo = () => {
    return HttpClient.get(`${TODO_API}/todolist`)
}

const getCategory = () => {
    return HttpClient.get(`${TODO_API}/category`)
}

//Update
const updateTodo = todo => {
    return HttpClient.put(`${TODO_API}/todolist`, todo)
}

//Delete
const removeTodo = todo => {
    return HttpClient.delete(`${TODO_API}/${todo._id}`)
}


//Encapsulating in a JSON object

const TodoApi = {createTodo, getTodo, getCategory, updateTodo, removeTodo}

export {TodoApi}
