import { Routes,BrowserRouter,Route } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { User } from "./pages/User";
import { Todo } from "./pages/Todo";
import { Addtodo } from "./pages/Addtodo";

function App(){
  return(
    <>
    <BrowserRouter >
    <Routes>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/user" element={<User />} />
    <Route path="/todo" element={<Todo />} />
    <Route path="/addtodo" element={<Addtodo />}/>

    </Routes>
    </BrowserRouter>
    </>
  )

}
export default App;