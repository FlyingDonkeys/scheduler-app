import {Button, Card, CardActions, CardContent, createTheme, Grid2, ThemeProvider} from "@mui/material";
import Typography from "@mui/material/Typography";
import {indigo} from "@mui/material/colors";

type TaskProps = {
    taskName: string;
    taskDescription: string;
    startTime: Date;
    endTime: Date;
    priority: string;
    isComplete: boolean;
    toggleCompletion: Function;
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

// Task will display all of the users tasks on the main page
function Task(taskProps: TaskProps){

    function determineColor() {
        if (taskProps.priority === "high") {
            return "error";
        } else if (taskProps.priority === "medium") {
            return "warning";
        } else if (taskProps.priority === "low") {
            return "success";
        } else {
            return "primary"
        }
    }

    function toggleCompletionStatus() {
        taskProps.toggleCompletion(taskProps.taskName);
    }

    return (
        <Card>
            <CardContent>
                    <Typography className={"py-2"} variant={"body1"}>Task Name: {taskProps.taskName}</Typography>
                    <Typography className={"py-2"} variant={"body1"}>Task Description: {taskProps.taskDescription}</Typography>
                    <Typography className={"py-2"} variant={"body1"}>From: {taskProps.startTime.toString().substring(0, 21)}</Typography>
                    <Typography className={"py-2"} variant={"body1"}>To: {taskProps.endTime.toString().substring(0, 21)}</Typography>
                    <Typography className={"py-2"} variant={"body1"} color={determineColor()}>Priority: {taskProps.priority}</Typography>
            </CardContent>
            <CardActions style={{ justifyContent: "center" }}>
                <Grid2 container spacing={2}>
                    <ThemeProvider theme={theme}>
                        {taskProps.isComplete ? <Grid2>
                                                    <Button variant="contained" onClick={toggleCompletionStatus}>Unmark Completed</Button>
                                                </Grid2>
                                              : <Grid2>
                                                    <Button variant="contained" onClick={toggleCompletionStatus}>Mark Completed</Button>
                                                </Grid2>
                        }
                    </ThemeProvider>
                </Grid2>
            </CardActions>
        </Card>
    )
}

export default Task;