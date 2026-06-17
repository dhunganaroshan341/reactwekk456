import { useState } from "react";
import { register } from "../services/authService";


export default function Register() {

    const [form, setForm] = useState({

        name: "",
        email: "",
        designation: "",
        department: "",
        phone: "",
        password: "",
        password_confirmation: ""

    });



    const submit = async (e: any) => {

        e.preventDefault();


        try {

            const res = await register(form);


            console.log(res.data);


            localStorage.setItem(
                "token",
                res.data.token
            );


            alert("Registered");


        } catch (error) {

            console.log(error);

        }


    }



    return (

        <form onSubmit={submit}>


            <input
                placeholder="Name"
                onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                }
            />


            <input
                placeholder="Email"
                onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                }
            />


            <input
                placeholder="Designation"
                onChange={(e) =>
                    setForm({ ...form, designation: e.target.value })
                }
            />


            <input
                placeholder="Department"
                onChange={(e) =>
                    setForm({ ...form, department: e.target.value })
                }
            />


            <input
                placeholder="Phone"
                onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                }
            />


            <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                }
            />


            <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) =>
                    setForm({
                        ...form,
                        password_confirmation: e.target.value
                    })
                }
            />


            <button>
                Register
            </button>


        </form>

    )

}