'use client'
import '../index.css'
import { useState , useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import {Dialog, DialogBackdrop, DialogPanel, DialogTitle, Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/react'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/20/solid'
import axios from "axios";
import {Bars3Icon, XMarkIcon, TrashIcon , PencilSquareIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import {EnvelopeIcon} from "@heroicons/react/20/solid/index.js";
import {
    BuildingOffice2Icon,
    ChatBubbleBottomCenterIcon,
    MapPinIcon,
    SparklesIcon
} from "@heroicons/react/24/outline/index.js";

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



const YourProfile = ()=> {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [profile, setProfile] = useState(false); // Stores user profile if found
    const [showForm, setShowForm] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [loginUser, setLoginUser] = useState('')
    const [editWindow, setEditWindow] = useState(false)
    const [imageUrl, setImageUrl] = useState('')

    useEffect(()=>{
        const pro = JSON.parse(localStorage.getItem("profile"));
        if(pro){
            setImageUrl(pro.data.imageUrl)
        }else{
            setImageUrl("https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg")
        }

    },[])

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        if(user){
            setLoginUser(user);
        }
    },[])
    const [formData, setFormData] = useState({
        profileId:"",
        name:"",
        title:"",
        skills:[],
        email:"",
        organization:"",
        location:"",
        description:"",
        imageUrl:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
    });

    useEffect(() => {
        if (loginUser) {
            setFormData(prevFormData => ({
                ...prevFormData,
                name: loginUser.name || "",
                email: loginUser.email || "",
            }));
        }
    }, [loginUser]);

    const [profileData, setProfileData] = useState('');

    const fetchProfile = async () => {
        try{
            // const user = JSON.parse(localStorage.getItem("user"));
            // const data = await axios.post("/profile/get-profile", {ProfileId:user._id}, { withCredentials: true })
            // console.log(data.data.data)
            // if (data.status === 201) {
            //     localStorage.setItem("profile", JSON.stringify(data.data));
            // }
            const check = JSON.parse(localStorage.getItem("profile"));
            if(check){
                setProfile(true)
            }
            setProfileData(check.data);
            setFormData(check.data);
        }catch(error){
            console.log(error)
            setProfile(false)
        }
    }

    useEffect(  ()=>{
        fetchProfile();
    },[])

    // useEffect(()=>{
    //     const userProfile = JSON.parse(localStorage.getItem("profile"));
    //     if(userProfile){
    //         setProfileData(userProfile.data);
    //         setFormData(userProfile.data);
    //     }
    // },[])

    useEffect(() => {
        console.log("Profile Data:", profileData); // This will now log when profileData updates
    }, [profileData]);


    const handleSkillChange = (e) => {
        // Convert comma-separated values into an array
        const skillArray = e.target.value.split(",").map(skill => skill.trim());
        setFormData({ ...formData, skills: skillArray });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const EditHandler = ()=> {
        setProfile(false);
        setShowForm(true);
        setEditWindow(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload

        try {
            if(editWindow){
                const response =await axios.post("/profile/update-profile", formData, { withCredentials: true });
                localStorage.setItem("profile", JSON.stringify(response.data));
                setProfile(true)
                setShowForm(false);
                setEditWindow(false)
                navigate(0)
            }else{
                const user = JSON.parse(localStorage.getItem("user"));
                const updatedFormData = { ...formData, profileId: user._id};
                const response = await axios.post("/profile/create-profile", updatedFormData, { withCredentials: true })
                const user1 = JSON.parse(localStorage.getItem("user"));
                const data = await axios.post("/profile/get-profile", {ProfileId:user1._id}, {withCredentials:true})
                console.log(data.data.data)
                if (data.status === 201) {
                    localStorage.setItem("profile", JSON.stringify(data.data));
                    setImageUrl(data.data.data.imageUrl)
                }
                setProfile(true)
                setShowForm(false)
                console.log(response)
                // localStorage.setItem("profile", JSON.stringify(response.data));
                navigate(0);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to submit form.");
        }
    };



    const AddProfileHandler= async ()=> {
        setShowForm(true);

    }

    const LoginHandler = () =>{
        navigate("/login")
    }

    const LogoutHandler = async ()=> {
        try{
            await axios.post("/users/logout", {withCredentials: true})
            localStorage.removeItem("profile");
            localStorage.removeItem("user");
            localStorage.removeItem("myopportunities");
            navigate("/");
        }catch(err){
            console.log(err)
        }
    }
    const PeopleHandler = ()=> {
        navigate("/people")
    }

    const OpportunitiesHandler =()=> {
        navigate("/opportunities")
    }

    const DeleteHandler = () =>{
        setOpen(true)
    }

    const DeleteProfile = async () =>{
        try{
            const userprofile = JSON.parse(localStorage.getItem("profile"));
            await axios.post("/profile/delete-profile", {profileID:userprofile.data.profileId},{withCredentials: true})
            localStorage.removeItem("profile");
            setOpen(false)
            navigate(0);
        }catch(err){
            console.log(err)
        }

    }

    const FormCancelHandler = ()=>{
        setShowForm(false);
        setEditWindow(false);
        navigate(0);
    }

    const YourRequestHandler = ()=>{
        navigate("/yourrequests")
    }

    const AiHandler=()=>{
        navigate("/aisearch")
    }

    return (
        <div className="bg-white ">
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
                            className="sm:text-xl font-semibold text-gray-900  transition-transform duration-300 hover:scale-110  cursor-pointer"
                            onClick={PeopleHandler}>
                            People
                        </button>
                        <button
                            className="sm:text-xl font-semibold text-gray-900 cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-indigo-500"
                            onClick={OpportunitiesHandler}>
                            Opportunities
                        </button>
                        <button
                            className="sm:text-xl font-semibold text-gray-900 cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-indigo-500"
                            onClick={YourRequestHandler}>
                            Your Requests
                        </button>
                        <button
                            className="sm:text-xl font-semibold  text-indigo-500 cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-indigo-500">
                            My Profile
                        </button>
                        <button
                            className="flex sm:text-xl font-semibold text-gray-900 cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-indigo-500"
                            onClick={AiHandler}>
                            AI Search <SparklesIcon aria-hidden="true" className="-mr-1 size-5 text-black-400"/>
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
                                        className="sm:text-xl font-semibold text-gray-900 cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-indigo-500"
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
                                        className="sm:text-xl font-semibold text-indigo-500 cursor-pointer transition-transform duration-300 hover:scale-110 ">
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
                    <div className="py-24 sm:py-15">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            {!showForm && <h1 className="text-4xl text-center mb-5 font-serif  text-gray-900 sm:text-6xl">
                                Your Profile
                            </h1>}
                            {/*Delete Dialog Box*/}

                            <Dialog open={open} onClose={setOpen} className="relative z-10">
                                <DialogBackdrop
                                    transition
                                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                                />

                                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                                                    <XMarkIcon aria-hidden="true" className="size-6" />
                                                </button>
                                            </div>
                                            <div className="sm:flex sm:items-start">
                                                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                                    <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                                                </div>
                                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                                        Delete Profile
                                                    </DialogTitle>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500">
                                                            Are you sure you want to delete your profile? All of your Profile data will be permanently removed from
                                                            the database. This action cannot be undone.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                                <button
                                                    type="button"
                                                    onClick={() => setOpen(DeleteProfile)}
                                                    className="inline-flex w-full justify-center cursor-pointer rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setOpen(false)}
                                                    className="mt-3 inline-flex w-full justify-center cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </DialogPanel>
                                    </div>
                                </div>
                            </Dialog>



                            {profile && <div className="bg-transparent">
                                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
                                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                                        <div className="justify-items-center ">
                                            <li key={profileData?.email}
                                                className="col-span-1 flex flex-col w-100 divide-y divide-gray-200 rounded-lg bg-white text-center shadow-sm">
                                                <div className="flex flex-1 flex-col p-8">
                                                    <img alt="" src={profileData?.imageUrl}
                                                         className="mx-auto size-32 shrink-0 rounded-full"/>
                                                    <h3 className="mt-2 mb-3 text-sm font-semibold text-gray-900"> {profileData?.email}</h3>
                                                    <dl className="mt-1 flex grow flex-col justify-between">
                                                        <dt className="sr-only">Title</dt>
                                                        <dd className="text-sm text-gray-500">Featured Skills</dd>
                                                        <dt className="sr-only">skills</dt>
                                                        <dd className="mt-3">
                                                <span
                                                    className="mt-1 flex flex-wrap flex-row justify-center justify-beetween gap-1">
                                                    {profileData?.skills?.map((rating) => (
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
                                                        <div className="flex w-0 flex-1">
                                                            <button onClick={EditHandler}
                                                                className="relative inline-flex w-0 flex-1 hover:bg-neutral-50 items-center transition-transform duration-500  hover:font-bold justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                                            >
                                                                EDIT
                                                                <PencilSquareIcon className="h-4 w-4"/>
                                                            </button>
                                                        </div>
                                                        <div className="-ml-px flex w-0 flex-1">
                                                            <button
                                                                onClick={DeleteHandler}
                                                                className="relative inline-flex w-0  flex-1 items-center justify-center  gap-x-3 hover:bg-red-500 hover:font-bold rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                                            >
                                                            DELETE
                                                                <TrashIcon className="h-4 w-4"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </div>

                                        {/* Person info */}
                                        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 ">
                                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{profileData?.name}</h1>

                                            <div className="mt-1">
                                            <p className="text-xl tracking-tight text-gray-900">{profileData?.title}</p>
                                            </div>
                                            <div className="mt-2 flex gap-2"><BuildingOffice2Icon
                                                className="h-6 w-5"/>- <h1
                                                className="font-bold">{profileData.organization}</h1></div>
                                            <div className="flex mt-3">
                                                <MapPinIcon className="h-6 w-5"/><p
                                                className="font-bold">- {profileData.location}</p>
                                            </div>

                                            {/* Reviews */}


                                            <div className="mt-7">
                                                <h1 className="text-xl mb-1 border-b ">About</h1>

                                                <div className="space-y-6 text-base text-gray-700">
                                                    <h1 className="">{profileData?.description}</h1>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>

                            </div>}

                            {!profile && !showForm && <div className="text-center">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    className="mx-auto size-12 text-gray-400"
                                >
                                    <path
                                        d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                                        strokeWidth={2}
                                        vectorEffect="non-scaling-stroke"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <h3 className="mt-2 text-sm font-semibold text-gray-900">Profile not created</h3>
                                <p className="mt-1 text-sm text-gray-500">Get started by creating your profile</p>
                                <div className="mt-6">
                                    <button
                                        type="button" onClick={AddProfileHandler}
                                        className="inline-flex items-center transition-transform duration-300 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        <PlusIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5"/>
                                        Create Profile
                                    </button>
                                </div>
                            </div>}
                            {showForm && !profile && <form onSubmit={handleSubmit}>
                                <div className="space-y-12">
                                    <div className="border-b border-gray-900/10 pb-12">
                                        {!editWindow && <h2 className="text-3xl font-bold font-serif text-center tracking-tight text-gray-900">Create
                                            Profile</h2>}
                                        {editWindow && <h2 className="text-3xl font-bold font-serif text-center tracking-tight text-gray-900">Edit
                                            Profile</h2>}
                                        <p className="mt-1 text-sm/6 text-center text-gray-600">
                                            This information will be displayed publicly so be careful what you share.
                                        </p>
                                    </div>

                                    <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base/7 font-semibold text-gray-900">Personal
                                            Information</h2>
                                        <p className="mt-1 text-sm/6 text-gray-600">
                                            fields marked with (*) are required
                                        </p>

                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="sm:col-span-3">
                                                <label htmlFor="first-name"
                                                       className="block text-sm/6 font-medium text-gray-900">
                                                    Full Name*
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        name="name"
                                                        type="text"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-3">
                                                <label htmlFor="first-name"
                                                       className="flex text-sm/6 font-medium text-gray-900">
                                                    Title*
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        name="title"
                                                        type="text"
                                                        value={formData.title}
                                                        onChange={handleChange}
                                                        placeholder="(Example- Frontend Developer, Data Analyst)"
                                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-4">
                                                <label htmlFor="email"
                                                       className="block text-sm/6 font-medium text-gray-900">
                                                    Email address*
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        name="email"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-3">
                                                <label htmlFor="first-name"
                                                       className="block text-sm/6 font-medium text-gray-900">
                                                    Skills*
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        name="skills"
                                                        type="text"
                                                        onChange={handleSkillChange}
                                                        value={formData.skills.join(", ")}
                                                        placeholder="(Example- nodejs, javascript, React)"
                                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                    />
                                                </div>
                                                <div>
                                                    {formData.skills.map((skill, index) => (
                                                        <span key={index}
                                                              className="inline-flex items-center rounded-full mt-3 mr-2 bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="col-span-full">
                                                <label htmlFor="about"
                                                       className="block text-sm/6 font-medium text-gray-900">
                                                    About*
                                                </label>
                                                <div className="mt-2">
                                                        <textarea name="description" value={formData.description} onChange={handleChange} rows={4}
                                                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                                  defaultValue={''} maxLength={1000}/>
                                                </div>
                                                <p className="mt-3 text-sm/6 text-gray-600">Write a few sentences
                                                    about
                                                    yourself.
                                                </p>
                                            </div>
                                            <div className="sm:col-span-3">
                                                <label htmlFor="first-name"
                                                       className="block text-sm/6 font-medium text-gray-900">
                                                    Organization*
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        name="organization"
                                                        type="text"
                                                        placeholder="(Example- Manipal University Jaipur)"
                                                        value={formData.organization}
                                                        onChange={handleChange}
                                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="country"
                                                       className="block text-sm/6 font-medium text-gray-900">
                                                    Location*
                                                </label>
                                                <div className="mt-2 grid grid-cols-1">
                                                    <select
                                                        name="location"
                                                        value={formData.location}
                                                        onChange={handleChange}
                                                        className="col-start-1 row-start-1 w-full  appearan rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                    >
                                                        <option>Andhra Pradesh</option>
                                                        <option>Arunachal Pradesh</option>
                                                        <option>Assam</option>
                                                        <option>Bihar</option>
                                                        <option>Chhattisgarh</option>
                                                        <option>Goa</option>
                                                        <option>Gujarat</option>
                                                        <option>Haryana</option>
                                                        <option>Himachal Pradesh</option>
                                                        <option>Jharkhand</option>
                                                        <option>Karnataka</option>
                                                        <option>Kerala</option>
                                                        <option>Madhya Pradesh</option>
                                                        <option>Maharashtra</option>
                                                        <option>Manipur</option>
                                                        <option>Meghalaya</option>
                                                        <option>Mizoram</option>
                                                        <option>Nagaland</option>
                                                        <option>Odisha</option>
                                                        <option>Punjab</option>
                                                        <option>Rajasthan</option>
                                                        <option>Sikkim</option>
                                                        <option>Tamil Nadu</option>
                                                        <option>Telangana</option>
                                                        <option>Tripura</option>
                                                        <option>Uttar Pradesh</option>
                                                        <option>Uttarakhand</option>
                                                        <option>West Bengal</option>
                                                    </select>

                                                </div>
                                            </div>

                                            <div className="col-span-full">
                                                <label htmlFor="street-address"
                                                       className="block text-sm/6 font-medium text-gray-900">
                                                Enter the url of your image
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        name="imageUrl"
                                                        type="text"
                                                        value={formData.imageUrl}
                                                        onChange={handleChange}
                                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <button onClick={FormCancelHandler} className="text-sm/6 font-semibold text-gray-900 cursor-pointer hover:scale-102">
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>}
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

                    {/* Middle Section - Made with Love */}


                    {/* Right Section - Icons & Report Bug */}
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
                <div className="text-s text-gray-500 text-center mt-10 sm:mt-0 pt-0 pb-3 ">
                    <a href="https://www.linkedin.com/in/shivansh-pradhan-31572625a/">© 2025 Shivansh Pradhan. All rights
                        reserved.</a>
                </div>
            </footer>
        </div>
    )
}

export default YourProfile;