import InputField from "./InputField.tsx";
import Typography from "@mui/material/Typography";
import {Grid2} from "@mui/material";
import Container from "@mui/material/Container";
import MultilineInputField from "./MultilineInputField.tsx";

function TaskForm(){
    return (
        <Container className="py-2">
            <Typography variant="h4" align={"center"} gutterBottom>Task Adder</Typography>
            <Grid2 container columnSpacing={2} className="py-2">
                <Grid2>
                    <InputField questionText="Task Title" helperText="Input task title"></InputField>
                </Grid2>
                <Grid2>
                    <MultilineInputField questionText="Task Description" helperText="Input task description"></MultilineInputField>
                </Grid2>
            </Grid2>
        </Container>
        );
}

export default TaskForm;