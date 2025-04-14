import '../index.css'
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import Loading from "../components/Loading.jsx";

const Register = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload

        try {
            setLoading(true);
            const {data} = await axios.post("/users/register", formData, {withCredentials: true});
            console.log(data)
            localStorage.setItem("user", JSON.stringify({...data.user, password:''}));
            setLoading(false);
            navigate("/people")
        } catch (error) {
            setLoading(false);
            console.error("Error submitting form:", error);
            alert("Failed to submit form.");
        }
    };

    const Backhandler = ()=>{
        navigate("/")
    }
    const LoginHandler = ()=> {
        navigate("/login")
    }

    return (
        <div className="flex min-h-full flex-1">
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-balance text-blue-900 sm:text-2xl">SKILLMATE</h1>
                        <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">Create Account</h2>
                        <p className="mt-2 text-sm/6 text-gray-500">
                            Already a member?{' '}
                            <button className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
                                    onClick={LoginHandler}>
                                Sign-in
                            </button>
                        </p>
                    </div>

                    <div className="mt-10">
                        <div>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm/6 font-medium text-gray-900">
                                        Full Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            name="name"
                                            type="text"
                                            value={formData.name}
                                            placeholder="enter name"
                                            onChange={handleChange}
                                            required
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm/6 font-medium text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            required
                                            onChange={handleChange}
                                            placeholder="enter email"
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm/6 font-medium text-gray-900">
                                        Password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            name="password"
                                            type="password"
                                            value={formData.password}
                                            required
                                            onChange={handleChange}
                                            placeholder="enter password"
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>


                                <div className="flex">
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Register
                                    </button>
                                    {loading && <div>
                                        <Loading/>
                                    </div>}
                                </div>
                                <span className="isolate inline-flex rounded-md shadow-xs">
                                    <button type="button" onClick={Backhandler}
                                            className="relative cursor-pointer inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-10">
                                        <span className="sr-only">Previous</span>
                                        <ChevronLeftIcon aria-hidden="true" className="size-5"/>
                                    </button>
                                </span>
                            </form>
                        </div>


                    </div>
                </div>
            </div>
            <div className="relative hidden w-0 flex-1 lg:block">
                <img
                    alt=""
                    src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="absolute inset-0 size-full object-cover"
                />
            </div>
        </div>
    )
}

export default Register;