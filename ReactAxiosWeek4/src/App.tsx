import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
// import UserCrud from "./pages/UserCrud";


function App() {

  return (

    <BrowserRouter>

      <Routes>


        <Route
          path="/register"
          element={<Register />}
        />


        <Route
          path="/login"
          element={<Login />}
        />


        <Route
          path="/users"
          element={<UserCrud />}
        />


      </Routes>

    </BrowserRouter>

  )

}


export default App;