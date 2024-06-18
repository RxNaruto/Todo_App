import { useState } from "react"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { Subheading } from "../components/Subheading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Addtodo = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const postData = async () => {
        try {
            const token = localStorage.getItem('token'); 
            await axios.post(
                "http://localhost:3000/api/v1/todo",
                { title, 
                description 
            },
                {
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                }
            );
            navigate("/todo");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-slate-200 w-96 rounded shadow-md">
                <Heading label={"Todo"} />
                <Subheading label={"Enter your details here"} />
                <InputBox label={"Title"} placeholder="Todo Title" onChange={(e) => {
                    setTitle(e.target.value);
                }} />
                <InputBox label={"description"} placeholder="todo description" onChange={(e) => {
                    setDescription(e.target.value);
                }} />
                <div>
                    <Button label={"Post"} onClick={postData} />
                </div>
            </div>
        </div>
    );
}
