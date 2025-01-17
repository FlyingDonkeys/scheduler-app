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
import {indigo} from "@mui/material/colors";
import {useNavigate} from "react-router-dom";

import { getFirestore } from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {User} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import dayjs from "dayjs";
import InvalidInputError from "../Errors/InvalidInputError.tsx";
import InvalidTimeError from "../Errors/InvalidTimeError.tsx";
import {useState} from "react";

type TaskFormProps = {
    user: User;
}

/**
 * A React functional component that provides a form interface for creating and managing tasks.
 *
 * The `TaskForm` component includes inputs for task details such as the task title, description,
 * start time, end time, and priority level. It handles user interactions, updates state variables,
 * and manages validation before saving the task information to Firestore. Additionally, it provides
 * visual feedback and guidance for the user.
 *
 * @param {TaskFormProps} taskFormProps - Properties required for initializing and rendering the TaskForm component,
 *                                        including user context or other configuration properties.
 * @return {JSX.Element} Returns a JSX element representing the TaskForm component.
 */
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
    const [taskDescription, setTaskDescription] = useState("No description provided.");
    const [startTime, setStartTime] = useState(dayjs(new Date().setHours(0,0,0,0)).toDate());
    const [endTime, setEndTime] = useState(dayjs(new Date().setHours(0,0,0,0)).toDate());
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

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
     * Toggles priority states based on the user's selection.
     *
     * This function handles priority toggling logic for high, medium, and low
     * priority states. If the selected priority matches the current active
     * priority, it toggles the state off. Otherwise, it triggers the appropriate
     * priority toggle for the given choice.
     *
     * @param {String} buttonChoice - The priority level selected by the user ("high", "medium", or "low").
     */
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
     * Asynchronously adds a new task to the database after validating the input properties.
     *
     * This function performs several checks to ensure the task data is valid:
     * - The task name must not be empty.
     * - The start time must be before the end time.
     * - Both the start and end times must be in the future.
     *
     * If validation passes, the task is added to the user's task collection in the database
     * and the user is navigated to the home page. If validation fails or an error occurs,
     * appropriate error messages are logged and the error state is updated.
     *
     * @async
     * @throws {InvalidInputError} Thrown when the task name is empty.
     * @throws {InvalidTimeError} Thrown when the start time is greater than the end time or when the start/end times are not in the future.
     */
    const addTask = async () => {
        try {
            if (taskName === "") {
                throw new InvalidInputError("Task name cannot be empty!");
            } else if (startTime > endTime) {
                throw new InvalidTimeError("Start time must be before end time!");
            } else if (startTime < dayjs().toDate()) {
                throw new InvalidTimeError("Start time must be in the future!");
            } else if (endTime < dayjs().toDate()) {
                throw new InvalidTimeError("End time must be in the future!");
            }

            await setDoc(doc(db, "Users", taskFormProps.user.uid, "userTasks", taskName), {
                taskName,
                taskDescription,
                startTime,
                endTime,
                priority: highPriority ? "high" :
                    mediumPriority ? "medium" :
                        lowPriority ? "low" : "none",
                isCompleted: false
            });
            console.log("Document successfully written!");
            navigate("/");
        } catch (error) {
            if (error instanceof InvalidInputError) {
                console.error(error.message);
                setErrorMessage(error.message);
            } else if (error instanceof InvalidTimeError) {
                console.error(error.message);
                setErrorMessage(error.message);
            } else {
                console.error("Error adding task: ", error);
            }
        }
    };

    /**
     * Updates a specific text field based on the provided identifier.
     *
     * @param {string} text - The text to be set.
     * @param {string} id - The identifier used to determine the field to update.
     *                      It should match one of the predefined field identifiers.
     *                      Expected values:
     *                      - "taskName": Updates the task name.
     *                      - "taskDescription": Updates the task description.
     */
    const processTextWithId = (text: string, id: string) => {
        if (id === "taskName") {
            setTaskName(text);
        } else if (id === "taskDescription") {
            setTaskDescription(text);
        }
    }

    /**
     * Processes a given date based on the provided identifier and sets
     * the corresponding time value. Logs a message indicating whether
     * the start time or end time has been set.
     *
     * @param {Date} date - The date to be processed and set.
     * @param {string} id - The identifier determining the type of time
     *                      to be set. Accepts "startTime" or "endTime".
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
        <Container sx={{ py: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Add Task
            </Typography>
            <Grid2 container columnSpacing={5} sx={{ py: 2 }}>
                <Grid2 size={4}>
                    <InputField
                        id="taskName"
                        questionText="Task Title"
                        helperText="Input task title"
                        processText={processTextWithId}
                    />
                </Grid2>
                <Grid2 size={4}>
                    <MultilineInputField
                        id="taskDescription"
                        questionText="Task Description"
                        helperText="Input task description"
                        processText={processTextWithId}
                    />
                </Grid2>
            </Grid2>

            <Grid2 container columnSpacing={3} sx={{ py: 2 }}>
                <Grid2 size={0.2}></Grid2>
                <Grid2>
                    <FormHelperText>
                        Note that the task title must be unique.
                    </FormHelperText>
                </Grid2>
            </Grid2>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid2 container columnSpacing={5} sx={{ py: 2 }}>
                    <Grid2 size={4}>
                        <DateInputField
                            id="startTime"
                            questionText="Start Time"
                            helperText="Pick start time"
                            processDate={processDateWithId}
                        />
                    </Grid2>
                    <Grid2 size={4}>
                        <DateInputField
                            id="endTime"
                            questionText="End Time"
                            helperText="Pick end time"
                            processDate={processDateWithId}
                        />
                    </Grid2>
                </Grid2>
            </LocalizationProvider>

            <Grid2 container columnSpacing={2} sx={{ py: 2 }}>
                <Grid2>
                    <Typography variant="h6" align="center" gutterBottom>
                        Task Priority
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="error"
                                    checked={highPriority}
                                    onChange={() => handleToggle("high")}
                                />
                            }
                            label="High Priority"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="warning"
                                    checked={mediumPriority}
                                    onChange={() => handleToggle("medium")}
                                />
                            }
                            label="Medium Priority"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="success"
                                    checked={lowPriority}
                                    onChange={() => handleToggle("low")}
                                />
                            }
                            label="Low Priority"
                        />
                    </FormGroup>
                    <FormHelperText>
                        Please select only one option
                    </FormHelperText>
                </Grid2>
            </Grid2>

            <Grid2 container>
                <Grid2
                    size={12}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2 }}
                >
                    <Typography sx={{ color: 'red' }}>{errorMessage}</Typography>
                </Grid2>
                <Grid2
                    size={12}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2 }}
                >
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" color="primary" onClick={addTask}>
                            Add Task
                        </Button>
                    </ThemeProvider>
                </Grid2>
            </Grid2>
        </Container>
    );

}

export default TaskForm;