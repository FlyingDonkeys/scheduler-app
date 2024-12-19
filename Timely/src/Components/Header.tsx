import { Link } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import appIcon from "../assets/timely.png";
import {AppBar, Box, IconButton, Toolbar} from "@mui/material";

const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
}

function Header() {
    return (
        <AppBar position="static" color="default" elevation={2}>
            <Toolbar>
                {/* App Icon */}
                <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
                    <img src={appIcon} alt="App Icon" style={{ width: 64, height: 64, borderRadius: '50%' }} />
                </IconButton>

                {/* Navigation Links */}
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 5 }}>
                    <Link
                        to="/"
                        color="primary"
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        color="primary"
                    >
                        About
                    </Link>
                    <Link
                        to="/addTask"
                        color="primary"
                    >
                        Add Task
                    </Link>
                    <Link
                        to="/"
                        color="primary"
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    );
}


export default Header;