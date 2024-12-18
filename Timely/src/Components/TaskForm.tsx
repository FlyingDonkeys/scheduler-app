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
import {Link} from "react-router-dom";

import { getFirestore } from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {User} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import dayjs from "dayjs";

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
    const [startTime, setStartTime] = useState(dayjs('2024-01-01T00:00').toDate());
    const [endTime, setEndTime] = useState(dayjs('2024-01-01T00:00').toDate());

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

    /**
     * Asynchronously adds a new task to the user's Firestore "userTasks" collection.
     *
     * The method creates or updates a document in the "userTasks" sub-collection
     * of the current user's document in the "Users" collection. The document name
     * is derived from the `taskName` variable and contains information about the task
     * such as its name, description, start time, end time, and its priority level.
     *
     * The priority of the task is determined by the values of `highPriority`
     * and `mediumPriority`, defaulting to "low" if neither are set to true.
     *
     * If the operation is successful, a success message is logged to the console.
     * Otherwise, an error message is logged.
     *
     * @async
     * @function
     * @throws Will log an error message if the document write operation encounters an error.
     */
    const addTask = async () => {
        try {
            await setDoc(doc(db, "Users", taskFormProps.user.uid, "userTasks", taskName), {
                taskName,
                taskDescription,
                startTime,
                endTime,
                priority: highPriority ? "high" : mediumPriority ? "medium" : "low"
            });
            console.log("Document successfully written!");
        } catch (error) {
            console.error("Error writing document: ", error);
        }
    };

    // Want to make the input field look nicer
    // Override the primary color
    const theme = createTheme({
        palette: {
            primary: {
                main: indigo[600]
            },
        },
    });

    /**
     * Processes and delegates text input based on the provided identifier.
     *
     * Depending on the value of the `id` parameter, this function will call specific
     * handlers to update corresponding properties using the provided `text` value.
     *
     * @param {string} text - The input text to be processed.
     * @param {string} id - The identifier used to determine which action to perform.
     *                       Accepted values are "taskName" and "taskDescription".
     */
    const processTextWithId = (text: string, id: string) => {
        if (id === "taskName") {
            setTaskName(text);
        } else if (id === "taskDescription") {
            setTaskDescription(text);
        }
    }

    /**
     * Processes a given date and associates it with an identifier.
     *
     * Depending on the provided `id`, this function sets the appropriate time value
     * by calling the respective function (`setStartTime` or `setEndTime`) and logs
     * a message indicating which time has been set.
     *
     * @param {Date} date - The date object to be processed.
     * @param {string} id - The identifier indicating whether to process this date as the start time ("startTime")
     *                      or the end time ("endTime").
     */
    const processDateWithId = (date: Date, id: string) => {
        if (id === "startTime") {
            setStartTime(date);
            console.log("start time has been set")
        } else if (id === "endTime") {
            setEndTime(date);
            console.log("end time has been set")
        }
    }

    return (
        <Container className="py-3" style={{height: '120vh'}}>
            <Typography variant="h4" align={"center"} gutterBottom>Add Task</Typography>
            <Grid2 container columnSpacing={5} className="py-2">
                <Grid2 size={4}>
                    <InputField id="taskName" questionText="Task Title" helperText="Input task title" processText={processTextWithId}></InputField>
                </Grid2>
                <Grid2 size={4}>
                    <MultilineInputField id="taskDescription" questionText="Task Description" helperText="Input task description" processText={processTextWithId}></MultilineInputField>
                </Grid2>
            </Grid2>

            <Grid2 container columnSpacing={5} className="py-2">
                <Grid2 size={0.3}>
                </Grid2>
                <Grid2>
                    <FormHelperText sx={{color:"red"}}>Note that the task title must be unique.</FormHelperText>
                </Grid2>
            </Grid2>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid2 container columnSpacing={5} className="py-2">
                    <Grid2 size={4}>
                        <DateInputField id="startTime" questionText="Start Time" helperText="Pick start time" processDate={processDateWithId}></DateInputField>
                    </Grid2>
                    <Grid2 size={4}>
                        <DateInputField id="endTime" questionText="End Time" helperText="Pick end time" processDate={processDateWithId}></DateInputField>
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
                    <Button component={Link} to="/" variant="contained" color="primary" onClick={addTask}>Add Task</Button>
                </ThemeProvider>
            </Grid2>

        </Container>
        );
}

export default TaskForm;