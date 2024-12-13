import InputField from "./InputField.tsx";
import Typography from "@mui/material/Typography";
import {Grid2} from "@mui/material";
import Container from "@mui/material/Container";

function TaskForm(){
    return (
        <Container className="py-2">
            <Typography variant="h4" align={"center"} gutterBottom>Task Adder</Typography>
            <Grid2 container columnSpacing={2} className="py-2">
                <Grid2>
                    <InputField questionText="Name" helperText="Please input your name"></InputField>
                </Grid2>
                <Grid2>
                    <InputField questionText="Phone" helperText="Please input your phone number"></InputField>
                </Grid2>
                <Grid2>
                    <InputField questionText="Email" helperText="Please input your email"></InputField>
                </Grid2>
            </Grid2>
        </Container>
        );
}

export default TaskForm;