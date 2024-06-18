import { useState } from "react"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { Subheading } from "../components/Subheading"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export const Signin=()=>{
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
  
    const navigate = useNavigate();
    return <div className="flex justify-center items-center h-screen">
       
      <div className="bg-slate-200 w-96 rounded shadow-md ">
        
       <Heading label={"Signup"} />
       <Subheading label={"Enter your details here"} />
       <InputBox label={"Username"} placeholder="email" onChange={(e)=>{
        setUsername(e.target.value);
       }}/>
       <InputBox label={"Password"} placeholder="abcdef" onChange={(e)=>{
        setPassword(e.target.value);
       }}/>
      
       <div>
        <Button label={"Signin"} onClick={async()=>{
               try{
                const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                    username,
                    password,
                   
                })
                localStorage.setItem("token",response.data.token);
               navigate("/addtodo");
               }catch(error){
                console.log(error);
               }
        }}/>
       </div>
       
       
       </div>
    </div>
}