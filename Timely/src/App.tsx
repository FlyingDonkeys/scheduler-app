import Header from "./Components/Header.tsx";
import Features from "./Components/Features.tsx";
import Footer from "./Components/Footer.tsx";
import Card from "./Components/Card.tsx";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import TaskForm from "./Components/TaskForm.tsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SignInForm from "./Components/SignInForm.tsx";
import {useEffect, useState} from "react";
import { User } from "firebase/auth";
import { initializeApp } from "firebase/app";
import SimpleHeader from "./Components/SimpleHeader.tsx";

function App() {

    const firebaseConfig = {
        apiKey: "AIzaSyANvNatS304vR5YDjA8r3hTRCYDmI9lK4k",
        authDomain: "timely-67981.firebaseapp.com",
        projectId: "timely-67981",
        storageBucket: "timely-67981.firebasestorage.app",
        messagingSenderId: "354706368157",
        appId: "1:354706368157:web:7e6846998c8aa2abb85674",
        measurementId: "G-S17C3JDCL5"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    const [user, setUser] = useState<User | null>(null); // Tracks the authenticated user
    const auth = getAuth(app);

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe(); // Clean up the listener on unmount
    }, [auth]);

    return (
        user === null ? <>
                            <SimpleHeader/>
                            <SignInForm/>
                            <Footer/>
                        </>
                     :  <Router>
                            <Header/>
                            <Routes>
                                <Route path="/" element={<Card/>} />
                                <Route path="/about" element={<Features/>} />
                                <Route path="/addTask" element={<TaskForm/>} />
                            </Routes>
                            <Footer/>
                        </Router>
    )
}

export default App
