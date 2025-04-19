'use client'
import '../index.css'
import { useState , useEffect} from 'react'
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import { Dialog, DialogPanel,DialogBackdrop, DialogTitle } from '@headlessui/react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon,EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'

import {
    Bars3Icon,
    XMarkIcon,
    BuildingOffice2Icon,
    ChatBubbleBottomCenterIcon,
    MapPinIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import axios from "axios";
import {SparklesIcon} from "@heroicons/react/24/outline/index.js";
import {ArrowTopRightOnSquareIcon} from "@heroicons/react/20/solid/index.js";
import Loading from "../components/Loading.jsx";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";


const navigation = [
    {
        name: 'Linkedin',
        href: 'https://www.linkedin.com/in/shivansh-pradhan-31572625a/details',
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



const OpportunityDetails = ()=> {
    const { id } = useParams();
    const navigate = useNavigate()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [loginUser, setLoginUser] = useState('')
    const [opportunityDetails, setOpportunityDetails] = useState([])
    const [imageUrl, setImageUrl] = useState('')
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false);
    const [notActive, setNotActive] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSuccessMessage(false);
    };

    useEffect(()=>{
        const pro = JSON.parse(localStorage.getItem("profile"));
        if(pro){
            setImageUrl(pro.data.imageUrl)
        }else{
            setImageUrl("https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg")
        }
    },[])

    const getOpportunityDetails = async () => {
        try{
            const oppDetails = await axios.post('/opportunity/get-opportunity-details', {_id:id},{withCredentials: true});
            console.log(oppDetails.data.data);
            setOpportunityDetails(oppDetails.data.data)
            console.log("details of opp:" + JSON.stringify(oppDetails.data.data))
            console.log(id)
        }catch (err){
            console.log(err)
        }
    }



    useEffect(() => {
        getOpportunityDetails()
    },[])



    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        if(user){
            setLoginUser(user);
        }
    },[])

    const LoginHandler = () =>{
        navigate("/login")
    }
    const LogoutHandler = async ()=> {
        try{
            await axios.post("/users/logout")
            localStorage.removeItem("user");
            localStorage.removeItem("profile");
            localStorage.removeItem("myopportunities");
            navigate("/");
        }catch(err){
            console.log(err)
        }
    }

    const OpportunitiesHandler =()=> {
        navigate("/opportunities")
    }
    const ProfileHandler = ()=>{
        navigate("/myprofile")
    }
    const PeopleHandler = ()=> {
        navigate("/people")
    }

    const YourRequestHandler = ()=>{
        navigate("/yourrequests")
    }

    const AiHandler=()=>{
        navigate("/aisearch")
    }

    const ApplicationHandler = async ()=>{
        try{
            setNotActive(true)
            setLoading(true)
            const user = JSON.parse(localStorage.getItem("profile"));
            if(!user || !user.data.profileId || !user.data.name){
                alert("Make Your Profile first");
                setLoading(false)
                setNotActive(false)
            }else if(user.data.profileId === opportunityDetails.authorId){
                alert("Cannot apply to your own request");
                setLoading(false)
                setNotActive(false)
            }else{
                const response = await axios.post("/application/create-application",{authorId:opportunityDetails.authorId,
                    applicantName:user.data.name, applicantImage:user.data.imageUrl, applicantProfileId:user.data.profileId,
                    appliedFor:opportunityDetails.title} ,{withCredentials: true});
                console.log(response.data.data)
                setOpen(false)
                setLoading(false)
                setSuccessMessage(true)
                setTimeout(() => {
                    setNotActive(false)
                }, 2000)

            }
        }catch(err){
            console.log(err)
            setLoading(false)
            setNotActive(false)
        }
    }


    return (
        <div className="bg-white ">
            <div>
                <Snackbar open={successMessage} autoHideDuration={3000} onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        variant="filled"
                        sx={{width: '100%'}}
                    >
                        Application Posted Successfully !
                    </Alert>
                </Snackbar>
            </div>
            {/* Header */}
            <header className="absolute border-b border-gray-300 inset-x-0 top-0 z-50 ">
                <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                    <div className="flex lg:flex-1">
                        <a href="/people" className="-m-1.5 p-1.5">
                            <h1 className="text-xl font-bold tracking-tight text-balance text-blue-900 sm:text-2xl">SKILLMATE</h1>
                        </a>
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

                        <button
                            className="sm:text-xl font-semibold text-gray-900 transition-transform duration-300 hover:scale-110  cursor-pointer"
                            onClick={PeopleHandler}>
                            People
                        </button>
                        <button
                            className="sm:text-xl font-semibold  text-indigo-500 cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-indigo-500"
                            onClick={OpportunitiesHandler}>
                            Opportunities
                        </button>
                        <button
                            className="sm:text-xl font-semibold text-gray-900 cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-indigo-500"
                            onClick={YourRequestHandler}>
                            Your Requests
                        </button>
                        <button
                            className="sm:text-xl font-semibold text-gray-900 cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-indigo-500"
                            onClick={ProfileHandler}>
                            My Profile
                        </button>
                        <button
                            className="flex sm:text-xl font-semibold text-gray-900 cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-indigo-500"
                            onClick={AiHandler}>
                            AI Search <SparklesIcon aria-hidden="true" className="-mr-1 size-3 text-black-400"/>
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end ">
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <MenuButton
                                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-gray-900 cursor-pointer">
                                    <span className="relative inline-block">
                                    <img
                                        alt=""
                                        src={imageUrl}
                                        className="size-6 rounded-full"
                                    />
                                    </span>
                                    <h1 className="font-bold text-indigo-500">{loginUser && loginUser.name}</h1>
                                    <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400"/>
                                </MenuButton>
                            </div>

                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                            >
                                <div className="px-4 py-3">
                                    <p className="text-sm">Signed in as</p>
                                    <p className="truncate text-sm font-medium text-gray-900">{loginUser && loginUser.email}</p>
                                </div>
                                <div className="py-1">
                                    <MenuItem>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                        >
                                            Account settings
                                        </a>
                                    </MenuItem>
                                    <MenuItem>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                        >
                                            Support
                                        </a>
                                    </MenuItem>
                                    <MenuItem>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                        >
                                            License
                                        </a>
                                    </MenuItem>
                                </div>
                                <div className="py-1">
                                    <MenuItem>
                                        <button onClick={LogoutHandler}
                                                className="block w-full px-4 py-2 text-left font-semibold cursor-pointer text-sm text-red-800  data-focus:text-red-900 data-focus:brightness-150 data-focus:font-bold">

                                            Logout <span aria-hidden="true">&rarr;</span>
                                        </button>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </Menu>
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
                                    <Menu as="div" className="relative inline-block text-left">
                                        <div>
                                            <MenuButton
                                                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-transparent px-0 py-2 text-sm font-semibold text-gray-900 cursor-pointer">
                                                <span className="relative inline-block">
                                                    <img alt=""
                                                         src={imageUrl}
                                                         className="size-6 rounded-full"/>
                                                </span>
                                                <h1 className="font-bold text-indigo-500">{loginUser && loginUser.name}</h1>
                                                <ChevronDownIcon aria-hidden="true"
                                                                 className="-mr-1 size-5 text-gray-400"/>
                                            </MenuButton>
                                        </div>

                                        <MenuItems
                                            transition
                                            className="absolute  z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                        >
                                            <div className="px-4 py-3">
                                                <p className="text-sm">Signed in as</p>
                                                <p className="truncate text-sm font-medium text-gray-900">{loginUser && loginUser.email}</p>
                                            </div>
                                            <div className="py-1">
                                                <MenuItem>
                                                    <a
                                                        href="#"
                                                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                                    >
                                                        Account settings
                                                    </a>
                                                </MenuItem>
                                                <MenuItem>
                                                    <a
                                                        href="#"
                                                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                                    >
                                                        Support
                                                    </a>
                                                </MenuItem>
                                                <MenuItem>
                                                    <a
                                                        href="#"
                                                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                                    >
                                                        License
                                                    </a>
                                                </MenuItem>
                                            </div>
                                        </MenuItems>
                                    </Menu>
                                </div>
                                <div className="space-y-2 py-6">
                                    <button
                                        className="sm:text-xl font-semibold text-gray-900 transition-transform duration-300 hover:scale-110 cursor-pointer hover:text-indigo-500"
                                        onClick={PeopleHandler}>
                                        People
                                    </button>
                                </div>
                                <div className="space-y-2 py-6">
                                    <button
                                        className="sm:text-xl font-semibold text-indigo-500 cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-indigo-500"
                                        onClick={OpportunitiesHandler}>
                                        Opportunities
                                    </button>
                                </div>
                                <div className="space-y-2 py-6">
                                    <button
                                        className="sm:text-xl font-semibold text-gray-900 cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-indigo-500"
                                        onClick={YourRequestHandler}>
                                        Your Requests
                                    </button>
                                </div>
                                <div className="space-y-2 py-6">
                                    <button
                                        className="sm:text-xl font-semibold text-gray-900 cursor-pointer transition-transform duration-300 hover:scale-110"
                                        onClick={ProfileHandler}>
                                        My Profile
                                    </button>
                                </div>
                                <div className="space-y-2 py-6">
                                    <button
                                        className="flex sm:text-xl font-semibold text-gray-900 cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-indigo-500"
                                        onClick={AiHandler}>
                                        AI Search <SparklesIcon aria-hidden="true"
                                                                className="-mr-1 size-5 text-black-400"/>
                                    </button>
                                </div>
                                <div className="space-y-2 py-6">
                                    <button
                                        className="sm:text-xl font-semibold text-gray-900 cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-red-500"
                                        onClick={LogoutHandler}>
                                        Logout <span aria-hidden="true">&rarr;</span>
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


                    <div className="bg-transparent">
                        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                            <Dialog open={open} onClose={setOpen} className="relative z-10">
                                <DialogBackdrop
                                    transition
                                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                                />

                                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                    <div
                                        className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                        <DialogPanel
                                            transition
                                            className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                                        >
                                            <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                                                <button
                                                    type="button"
                                                    onClick={() => setOpen(false)}
                                                    className="rounded-md bg-white text-gray-400 cursor-pointer hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                                                >
                                                    <span className="sr-only">Close</span>
                                                    <XMarkIcon aria-hidden="true" className="size-6"/>
                                                </button>
                                            </div>
                                            <div className="sm:flex sm:items-start">
                                                <div
                                                    className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10">
                                                    <ExclamationTriangleIcon aria-hidden="true"
                                                                             className="size-6 text-green-600"/>
                                                </div>
                                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                    <DialogTitle as="h3"
                                                                 className="text-base font-semibold text-gray-900">
                                                        Confirm Application
                                                    </DialogTitle>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500">
                                                            Once you apply for this role the Author of this request
                                                            can view your Application and Profile.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                                <button
                                                    type="button" disabled={notActive}
                                                    onClick={ApplicationHandler}
                                                    className="inline-flex w-full justify-center cursor-pointer rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-700 sm:ml-3 sm:w-auto"
                                                >
                                                    Confirm
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setOpen(false)}
                                                    className="mt-3 inline-flex w-full justify-center cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                >
                                                    Cancel
                                                </button>
                                                <div className="mr-4">
                                                    {loading && <Loading/>}
                                                </div>
                                            </div>
                                        </DialogPanel>
                                    </div>
                                </div>
                            </Dialog>
                            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                                <div className="justify-items-center ">
                                    <li key={opportunityDetails?._id}
                                        className="col-span-1 flex flex-col w-100 divide-y divide-gray-200 rounded-lg bg-white text-center shadow-sm">
                                        <div className="flex flex-1 flex-col p-8">
                                            <img alt="" src={opportunityDetails?.imageUrl}
                                                 className="mx-auto size-32 shrink-0 rounded-full"/>
                                            <h3 className="mt-2 mb-3 text-sm font-bold text-gray-900">Posted
                                                By- {opportunityDetails?.authorName}</h3>
                                            <dl className="mt-1 flex grow flex-col justify-between">
                                                <dt className="sr-only">Title</dt>
                                                <dd className="text-sm font-bold text-gray-500">Required Skills</dd>
                                                <dt className="sr-only">skills</dt>
                                                <dd className="mt-3">
                                                <span
                                                    className="mt-1 flex flex-wrap flex-row justify-center justify-beetween gap-1">
                                                    {opportunityDetails?.skills?.map((rating) => (
                                                        <h1 className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                                                            {rating}
                                                        </h1>
                                                    ))}
                                                </span>
                                                </dd>

                                            </dl>
                                        </div>
                                        <div>
                                            <div className="-mt-px flex divide-x divide-gray-200">
                                                <div className="flex w-0 flex-1 hover:bg-neutral-50">
                                                    <a
                                                        href={`mailto:${opportunityDetails?.authorEmail}`}
                                                        className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                                    >
                                                        <EnvelopeIcon aria-hidden="true"
                                                                      className="size-5 text-gray-400"/>
                                                        Email
                                                    </a>
                                                </div>
                                                <div className="-ml-px hover:bg-neutral-50 flex w-0 flex-1">
                                                    <button
                                                        onClick={() => setOpen(true)}
                                                        className="relative inline-flex w-0 cursor-pointer flex-1 items-center justify-center hover:bg-green-300 gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                                    >
                                                        Apply<ArrowTopRightOnSquareIcon aria-hidden="true"
                                                                                        className="size-5 text-gray-400"/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </div>

                                {/* Person info */}
                                <div className="mt-10 px-4 py- sm:mt-16 sm:px-0 lg:mt-0 ">
                                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Title- {opportunityDetails?.title}</h1>

                                    <div className="mt-1">
                                        <p className="text-xl tracking-tight text-gray-900">Type- {opportunityDetails?.role}</p>
                                    </div>
                                    <div className="mt-2 flex gap-2"><BuildingOffice2Icon className="h-6 w-5"/>- <h1
                                        className="font-bold">{opportunityDetails?.organization}</h1></div>
                                    <div className="flex mt-3">
                                        <MapPinIcon className="h-6 w-5"/><p
                                        className="font-bold">Location- {opportunityDetails?.location}</p>
                                    </div>

                                    {/* Reviews */}


                                    <div className="mt-7">
                                        <h1 className="text-xl font-semibold mb-1 border-b ">Description of
                                            Requirement</h1>

                                        <div className="space-y-6 text-base text-gray-700">
                                            <h1 className="">{opportunityDetails?.description}</h1>
                                        </div>
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
                            <h1 className="text-xl font-bold tracking-tight text-balance text-blue-900 sm:text-2xl">SKILLMATE</h1>
                        </span>
                    </div>


                    <div className="flex items-center space-x-4 pt-10 ">
                        {/* GitHub & Email Icons */}
                        {navigation.map((item) => (
                            <a key={item.name} href={item.href} target="_blank"
                               rel="noopener noreferrer" className="text-gray-600 ">
                                <span className="sr-only ">{item.name}</span>
                                <item.icon aria-hidden="true" className="size-6 cursor-pointer"/>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Copyright - Align Center */}
                <div className="text-s text-gray-500 text-center mt-10 sm:mt-0 pt-0 pb-3">
                    <a href="https://www.linkedin.com/in/shivansh-pradhan-31572625a/">© 2025 Shivansh Pradhan. All
                        rights
                        reserved.</a>
                </div>
            </footer>
        </div>
    )
}


export default OpportunityDetails;