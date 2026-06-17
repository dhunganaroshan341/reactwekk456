import { useState } from "react";
// import {login} from "../services/authService";
// import { useNavigate } from "react-router-dom";
export default function Login() {

    const [form, setForm] = useState({

        email: "",
        password: ""

    });

    // const navigate = useNavigate();

    const submit = async (e: any) => {

        e.preventDefault();

        try {

            // const res = await login(form);

            // console.log(res.data);

            // localStorage.setItem(
            //     "token",
            //     res.data.token
            // );

            alert("Logged in");

            // navigate("/users");

        } catch (error) {

            console.log(error);

        }

    }

    return (

        <form onSubmit={submit}>

            <input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
                placeholder="Password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button type="submit">Login</button>

        </form>

    )

}