'use client'
import '../index.css'
import { useState } from 'react'
import {Link, Navigate, useNavigate} from "react-router-dom";
import { Dialog, DialogPanel } from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'


const navigation = [
    {
        name: 'Linkedin',
        href: 'https://www.linkedin.com/in/shivansh-pradhan-31572625a/details/',
        icon: (props) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.411c0-1.29-.026-2.953-1.8-2.953-1.801 0-2.078 1.406-2.078 2.86v5.504h-3v-10h2.877v1.368h.041c.4-.756 1.377-1.55 2.834-1.55 3.031 0 3.625 1.993 3.625 4.583v5.599z"
                    clipRule="evenodd"
                />
            </svg>
        ),
    },
    {
        name: 'GitHub',
        href: 'https://github.com/shiv2706',
        icon: (props) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                />
            </svg>
        ),
    },
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/',
        icon: (props) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                />
            </svg>
        ),
    },

]



const HomePage = ()=> {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const navigate = useNavigate()

    const LoginHandler = () =>{
        navigate("/login")
    }
    const RegisterHandler = ()=> {
        navigate("/register")
    }
    const PeopleHandler = ()=> {
        navigate("/people")
    }

    return (
        <div className="bg-white ">
            {/* Header */}
            <header className="absolute border-b border-gray-300 inset-x-0 top-0 z-50 ">
                {/*<Header/>*/}
                <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                    <div className="flex lg:flex-1">
                        <button onClick={PeopleHandler} className="-m-1.5 p-1.5 cursor-pointer">
                            <h1 className="text-xl font-bold tracking-tight text-balance text-blue-900 sm:text-2xl">SKILLMATE</h1>
                        </button>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 cursor-pointer"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="size-6"/>
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">

                        <button className="sm:text-xl font-semibold text-gray-900 transition-transform duration-300 hover:scale-110 cursor-pointer hover:text-indigo-500" onClick={PeopleHandler}>
                            People
                        </button>
                        <button className="sm:text-xl font-semibold text-gray-900 cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-indigo-500" onClick={PeopleHandler}>
                            Opportunities
                        </button>
                        <button className="sm:text-xl font-semibold text-gray-900 cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-indigo-500" onClick={PeopleHandler}>
                            Your Requests
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <button
                            className="rounded-md bg-blue-900 px-3.5 py-2.5 text-sm font-semibold text-white cursor-pointer shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-4"
                            onClick={LoginHandler}>
                            Login <span aria-hidden="true">&rarr;</span>
                        </button>
                        <button
                            className="rounded-md  px-3.5 py-2.5 text-sm font-semibold cursor-pointer text-blue-900 border-1 border-blue-900 shadow-xs hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={RegisterHandler}>
                            Sign-up <span aria-hidden="true">&rarr;</span>
                        </button>
                    </div>
                </nav>
                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <div className="fixed inset-0 z-50"/>
                    <DialogPanel
                        className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <button onClick={PeopleHandler} className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <h1 className="text-xl font-bold tracking-tight text-balance text-blue-900 cursor-pointer sm:text-2xl">SKILLMATE</h1>
                            </button>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="size-6"/>
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    <button
                                        className="sm:text-xl font-semibold text-gray-900 transition-transform duration-300 hover:scale-110 cursor-pointer hover:text-indigo-500"
                                        onClick={PeopleHandler}>
                                        People
                                    </button>
                                </div>
                                <div className="space-y-2 py-6">
                                    <button
                                        className="sm:text-xl font-semibold text-gray-900 cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-indigo-500"
                                        onClick={PeopleHandler}>
                                        Opportunities
                                    </button>
                                </div>
                                <div className="space-y-2 py-6">
                                    <button
                                        className="sm:text-xl font-semibold text-gray-900 cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-indigo-500"
                                        onClick={PeopleHandler}>
                                        Your Requests
                                    </button>
                                </div>
                                <div className="space-y-2 py-6">
                                    <button
                                        className="sm:text-xl font-semibold text-gray-900 cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-indigo-500"
                                        onClick={LoginHandler}>
                                        Log in
                                    </button>
                                </div>
                                <div className="space-y-2 py-6">
                                    <button
                                        className="sm:text-xl font-semibold text-gray-900 cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-indigo-500"
                                        onClick={RegisterHandler}>
                                        Sign-up
                                    </button>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>

            </header>

            <main className="isolate">
                {/* Hero section */}
                <div className="relative pt-14">
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    >
                    <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        />
                    </div>
                    <div className="py-24 sm:py-32 lg:pb-40">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center">
                                <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
                                    Collaborate Smarter with
                                </h1><h1
                                className="text-5xl font-bold cursor-pointer tracking-tight text-blue-900 sm:text-6xl transition duration-1000 ease-in-out hover:filter hover:brightness-200 hover:drop-shadow-lg">
                                SKILLMATE</h1>
                                <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                                    SkillMate connects you with the right people to collaborate, innovate,
                                    and build impactful projects with.
                                </p>
                                <div className="mt-10 flex items-center justify-center gap-x-6">
                                    <button
                                        className="rounded-md bg-blue-900 px-3.5 py-2.5 text-sm cursor-pointer font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={LoginHandler}>
                                        Get started
                                    </button>
                                    <span aria-hidden="true" className="scale-200">&rarr;</span>
                                    <div className="flex -space-x-2 overflow-visible">
                                        <img
                                            alt=""
                                            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            className="inline-block size-10 rounded-full ring-2 ring-white transition-transform duration-300 hover:scale-110"
                                        />
                                        <img
                                            alt=""
                                            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            className="inline-block size-10 rounded-full ring-2 ring-white transition-transform duration-300 hover:scale-110"
                                        />
                                        <img
                                            alt=""
                                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                                            className="inline-block size-10 rounded-full ring-2 ring-white transition-transform duration-300 hover:scale-110"
                                        />
                                        <img
                                            alt=""
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            className="inline-block size-10 rounded-full ring-2 ring-white transition-transform duration-300 hover:scale-110"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-40rem)]"
                    >
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        />
                    </div>
                </div>
            </main>
            <footer className="w-full border-t border-gray-200 bg-white py-0 px-4 md:px-8 text-gray-600 mb-0">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-0 md:space-y-0">
                    <div className="flex items-center space-x-3 pt-10 ">
                        <span className=" p-2 rounded-lg">
                            <h1 className="text-xl font-bold tracking-tight text-balance text-blue-900 sm:text-2xl ">SKILLMATE</h1>
                        </span>
                    </div>

                    {/* Middle Section - Made with Love */}


                    {/* Right Section - Icons & Report Bug */}
                    <div className="flex items-center space-x-4 pt-10 ">
                        {/* GitHub & Email Icons */}
                        {navigation.map((item) => (
                            <a key={item.name} href={item.href} target="_blank"
                               rel="noopener noreferrer" className="text-gray-600 ">
                                <span className="sr-only ">{item.name}</span>
                                <item.icon aria-hidden="true" className="size-6 cursor-pointer" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Copyright - Align Center */}
                <div className="text-s text-gray-500 text-center mt-10 sm:mt-0 pt-0 pb-3">
                    <a href="https://www.linkedin.com/in/shivansh-pradhan-31572625a/">© 2025 Shivansh Pradhan. All rights reserved.</a>
                </div>
            </footer>
        </div>
    )
}

export default HomePage;