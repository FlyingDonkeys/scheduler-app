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

function TaskForm(){

    const [highPriority, setHighPriority] = useState(false);
    const [mediumPriority, setMediumPriority] = useState(false);
    const [lowPriority, setLowPriority] = useState(false);

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
        <Container className="py-3" style={{height: '100vh'}}>
            <Typography variant="h4" align={"center"} gutterBottom>Add Task</Typography>
            <Grid2 container columnSpacing={2} className="py-2">
                <Grid2>
                    <InputField questionText="Task Title" helperText="Input task title"></InputField>
                </Grid2>
                <Grid2>
                    <MultilineInputField questionText="Task Description" helperText="Input task description"></MultilineInputField>
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
                    <Button variant="contained" color="primary">Add Task</Button>
                </ThemeProvider>
            </Grid2>

        </Container>
        );
}

export default TaskForm;