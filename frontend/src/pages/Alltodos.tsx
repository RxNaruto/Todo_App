import { useEffect, useState } from "react"
import axios from "axios"

interface Todo{
    id: number,
    title: string,
    description: string
}

export const Alltodo=()=>{
    const[todos,setTodos]= useState<Todo[]>([]);
    useEffect(()=>{
        const fetchData=async()=>{

            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3000/api/v1/todo/alltodo",   
                {
                    headers: {
                        Authorization: token
                    }
                });
                setTodos(response.data.user.todo);
            } catch (error) {
                console.log(error);
                
            }
        };
        fetchData();
    },[]);
    return <div>
        <div>
            <h1>All todos</h1>
            <ul>{todos.map(todo=>(
                <li key={todo.id}>
                    <h2>{todo.title}</h2>
                    <h4>{todo.description}</h4>
                </li>
            ))}</ul>
        </div>
    </div>
}
