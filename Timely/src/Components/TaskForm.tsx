import DateInputField from "./Inputs/DateInputField.tsx";
import InputField from "./Inputs/InputField.tsx";
import MultilineInputField from "./Inputs/MultilineInputField.tsx";

import Typography from "@mui/material/Typography";
import {
    Button,
    Checkbox,
    createTheme,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    Grid2,
    ThemeProvider
} from "@mui/material";
import Container from "@mui/material/Container";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useState} from "react";
import {indigo} from "@mui/material/colors";

import { getFirestore } from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {User} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

type TaskFormProps = {
    user: User;
}

function TaskForm(taskFormProps: TaskFormProps){

    const firebaseConfig = {
        apiKey: "AIzaSyANvNatS304vR5YDjA8r3hTRCYDmI9lK4k",
        authDomain: "timely-67981.firebaseapp.com",
        projectId: "timely-67981",
        storageBucket: "timely-67981.firebasestorage.app",
        messagingSenderId: "354706368157",
        appId: "1:354706368157:web:7e6846998c8aa2abb85674",
        measurementId: "G-S17C3JDCL5"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const [highPriority, setHighPriority] = useState(false);
    const [mediumPriority, setMediumPriority] = useState(false);
    const [lowPriority, setLowPriority] = useState(false);

    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const handleToggle = (buttonChoice: String) => {
        // Case 1: If user selects an already selected state, toggle between states
        if (highPriority && buttonChoice === "high") {
            setHighPriority(!highPriority);
        } else if (mediumPriority && buttonChoice == "medium") {
            setMediumPriority(!mediumPriority);
        } else if (lowPriority && buttonChoice == "low") {
            setLowPriority(!lowPriority);
        } else {
            togglePriority(buttonChoice);
        }
    }

    // Helper function to toggle button
    const togglePriority = (buttonChoice: String) => {
        if (buttonChoice === "high") {
            setHighPriority(true);
            setMediumPriority(false);
            setLowPriority(false);
        } else if (buttonChoice === "medium") {
            setMediumPriority(true);
            setHighPriority(false);
            setLowPriority(false);
        } else if (buttonChoice === "low") {
            setLowPriority(true);
            setMediumPriority(false);
            setHighPriority(false);
        }
    }

    const addTask = () => {
        // Add a new document in collection "cities", the document id is auto generated!
        setDoc(doc(db, "Users", taskFormProps.user.uid, "userTasks", taskName), {
            taskName: {taskName},
            taskDescription: {taskDescription},
            country: "USA"
        }).then(
            () => {
            console.log("Document successfully written!");
        }).catch((error) => {
            console.error("Error writing document: ", error);
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

    // Allows task form to update the task name/description values
    const processTextWithId = (text: string, id: string) => {
        if (id === "taskName") {
            setTaskName(text);
        } else if (id === "taskDescription") {
            setTaskDescription(text);
        }
    }

    return (
        <Container className="py-3" style={{height: '100vh'}}>
            <Typography variant="h4" align={"center"} gutterBottom>Add Task</Typography>
            <Grid2 container columnSpacing={2} className="py-2">
                <Grid2 size={3}>
                    <InputField id="taskName" questionText="Task Title" helperText="Input task title" processText={processTextWithId}></InputField>
                </Grid2>
                <Grid2 size={4}>
                    <MultilineInputField id="taskDescription" questionText="Task Description" helperText="Input task description" processText={processTextWithId}></MultilineInputField>
                </Grid2>
            </Grid2>

            <Grid2 container columnSpacing={2} className="py-2">
                <Grid2 size={0.3}>
                </Grid2>
                <Grid2>
                    <FormHelperText sx={{color:"red"}}>Note that the task title must be unique.</FormHelperText>
                </Grid2>
            </Grid2>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid2 container columnSpacing={2} className="py-2">
                    <Grid2>
                        <DateInputField questionText="Start Time" helperText="Pick start time"></DateInputField>
                    </Grid2>
                    <Grid2>
                        <DateInputField questionText="End Time" helperText="Pick end time"></DateInputField>
                    </Grid2>
                </Grid2>
            </LocalizationProvider>

            <Grid2 container columnSpacing={2} className="py-2">
                <Grid2>
                    <Typography variant="h6" align="center" gutterBottom>Task Priority</Typography>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox color={"error"} checked={highPriority} onChange={() => handleToggle("high")}/>} label="High Priority" />
                        <FormControlLabel control={<Checkbox color={"warning"} checked={mediumPriority} onChange={() => handleToggle("medium")}/>} label="Medium Priority" />
                        <FormControlLabel control={<Checkbox color={"success"} checked={lowPriority} onChange={() => handleToggle("low")}/>} label="Low Priority" />
                    </FormGroup>
                    <FormHelperText>Please select only one option</FormHelperText>
                </Grid2>
            </Grid2>

            <Grid2 container alignItems="center" justifyContent="center">
                <ThemeProvider theme={theme}>
                    <Button variant="contained" color="primary" onClick={addTask}>Add Task</Button>
                </ThemeProvider>
            </Grid2>

        </Container>
        );
}

export default TaskForm;