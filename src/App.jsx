import {Routes, Route,Navigate} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import People from "./pages/People.jsx";
import Opportunities from "./pages/Opportunities.jsx";
import YourProfile from "./pages/YourProfile.jsx";
import ProfileDetails from "./pages/ProfileDetails.jsx";
import YourRequests from "./pages/YourRequests.jsx";
import OpportunityDetails from "./pages/OpportunityDetails.jsx";
import AiSearch from "./pages/AiSearch.jsx";


function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<ProtectedRoutesHome><HomePage/></ProtectedRoutesHome>} />
                <Route path="/login" element={<ProtectedRoutesHome><Login/></ProtectedRoutesHome>} />
                <Route path="/register" element={<ProtectedRoutesHome><Register/></ProtectedRoutesHome>} />
                <Route path="/people" element={<ProtectedRoutes><People/></ProtectedRoutes>} />
                <Route path="/opportunities" element={<ProtectedRoutes><Opportunities/></ProtectedRoutes>} />
                <Route path="/myprofile" element={<ProtectedRoutes><YourProfile/></ProtectedRoutes>} />
                <Route path="/yourrequests" element={<ProtectedRoutes><YourRequests/></ProtectedRoutes>} />
                <Route path="/profiledetails/:id" element={<ProtectedRoutes><ProfileDetails/></ProtectedRoutes>} />
                <Route path="/opportunitydetails/:id" element={<ProtectedRoutes><OpportunityDetails/></ProtectedRoutes>} />
                <Route path="/aisearch" element={<ProtectedRoutes><AiSearch/></ProtectedRoutes>} />
            </Routes>
        </>
    );
}

export function ProtectedRoutes(props) {
    if (localStorage.getItem("user")) {
        return props.children;
    } else {
        return <Navigate to="/login" />;
    }
}

export function ProtectedRoutesHome(props) {
    if (!localStorage.getItem("user")) {
        return props.children;
    } else {
        return <Navigate to="/people" />;
    }
}


export default App;
