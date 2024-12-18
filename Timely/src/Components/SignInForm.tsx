import Typography from "@mui/material/Typography";
import {
    Button,
    createTheme, Divider,
    Grid2,
    ThemeProvider
} from "@mui/material";
import Container from "@mui/material/Container";
import {indigo} from "@mui/material/colors";

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import TextField from "@mui/material/TextField";

function SignInForm(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signInError, setSignInError] = useState("‎");
    const [signUpError, setSignUpError] = useState("‎");

    // Handle Sign-In Button Click
    const handleSignIn = async () => {
        const auth = getAuth();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User signed in:", user);
        } catch (err: any) {
            setSignInError(err.code);
            console.error("Error signing in:", err.code);
        }
    };

    // Handle Sign-Up Button Click
    const handleSignUp = async () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                console.log("User signed up:", user);
            })
            .catch((error) => {
                setSignUpError(error.code);
                console.error("Error signing in:", error.code);
                // ..
            });
    }

    // Want to make the input field look nicer
    // Override the primary color
    const theme = createTheme({
        palette: {
            primary: {
                main: indigo[600]
            },
        },
    });

    return (
        <Container className="py-3" style={{height: '70vh'}}>
                <Grid2 container className="py-2">
                    <Grid2 className="py-2" size={6}>
                        <Typography variant="h4" align={"center"} gutterBottom>Existing User?</Typography>
                        <Typography variant="h5" align={"center"} gutterBottom>Sign In!</Typography>
                        <Grid2 display="flex" justifyContent="center" alignItems="center" className="py-2">
                            <Grid2>
                                <TextField id="email" label="Email" variant="outlined"
                                           onChange={(e) => setEmail(e.target.value)}/>
                            </Grid2>
                        </Grid2>

                        <Grid2 display="flex" justifyContent="center" alignItems="center" columnSpacing={2}
                               className="py-2">
                            <Grid2>
                                <TextField id="outlined-basic" label="Password" variant="outlined" type="password"
                                           onChange={(e) => setPassword(e.target.value)}/>
                            </Grid2>
                        </Grid2>

                        <Grid2 display="flex" justifyContent="center" alignItems="center" columnSpacing={2}
                               className="py-2">
                            <Grid2>
                                <Typography variant={"h6"} color={"error"}>{signInError}</Typography>
                            </Grid2>
                        </Grid2>

                        <Grid2 container alignItems="center" justifyContent="center" className="py-2">
                            <ThemeProvider theme={theme}>
                                <Button variant="contained" color="primary" onClick={handleSignIn}>Sign In</Button>
                            </ThemeProvider>
                        </Grid2>
                    </Grid2>

                    <Divider orientation="vertical" flexItem/>

                    {/* Sign up feature not implemented yet!*/}
                    <Grid2 className="py-2" size={5}>
                        <Typography variant="h4" align={"center"} gutterBottom>New User?</Typography>
                        <Typography variant="h5" align={"center"} gutterBottom>Sign Up!</Typography>
                        <Grid2 display="flex" justifyContent="center" alignItems="center" className="py-2">
                            <Grid2>
                                <TextField id="signUpEmail" label="Email" variant="outlined"
                                           onChange={(e) => setEmail(e.target.value)}/>
                            </Grid2>
                        </Grid2>

                        <Grid2 display="flex" justifyContent="center" alignItems="center" columnSpacing={2}
                               className="py-2">
                            <Grid2>
                                <TextField id="outlined-basic" label="Password" variant="outlined" type="password"
                                           onChange={(e) => setPassword(e.target.value)}/>
                            </Grid2>
                        </Grid2>

                        <Grid2 display="flex" justifyContent="center" alignItems="center" columnSpacing={2}
                               className="py-2">
                            <Grid2>
                                <Typography variant={"h6"} color={"error"}>{signUpError}</Typography>
                            </Grid2>
                        </Grid2>

                        <Grid2 container alignItems="center" justifyContent="center" className="py-2">
                            <ThemeProvider theme={theme}>
                                <Button variant="contained" color="primary" onClick={handleSignUp}>Sign Up</Button>
                            </ThemeProvider>
                        </Grid2>
                    </Grid2>
                </Grid2>
        </Container>
);
}

export default SignInForm;
