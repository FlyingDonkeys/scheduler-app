import { Link } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import appIcon from "../assets/timely.png";
import {AppBar, Box, Button, createTheme, IconButton, ThemeProvider, Toolbar} from "@mui/material";
import {indigo} from "@mui/material/colors";

const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
}

const theme = createTheme({
    palette: {
        primary: {
            main: indigo[600]
        },
    },
});

function Header() {
    return (
        <AppBar position="static" color="default" elevation={1} sx={{ py: 1 }}>
            <Toolbar>
                {/* App Icon */}
                <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
                    <img src={appIcon} alt="App Icon" style={{ width: 64, height: 64, borderRadius: '50%' }} />
                </IconButton>

                <ThemeProvider theme={theme}>
                    {/* Navigation Links */}
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 4 }}>
                        <Button
                            component={Link}
                            to="/"
                            variant="contained"
                            color="primary"
                        >
                            Home
                        </Button>
                        <Button
                            component={Link}
                            to="/about"
                            variant="contained"
                            color="primary"
                        >
                            About
                        </Button>
                        <Button
                            component={Link}
                            to="/addTask"
                            variant="contained"
                            color="primary"
                        >
                            Add Task
                        </Button>
                        <Button
                            component={Link}
                            to="/"
                            variant="contained"
                            color="primary"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </Button>
                    </Box>
                </ThemeProvider>
            </Toolbar>
        </AppBar>
    );
}


export default Header;