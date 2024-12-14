
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material";
import {indigo} from "@mui/material/colors";
import {DateTimePicker} from "@mui/x-date-pickers";

// New data type that defines the shape of the props object
// Question text is the question above the input field
// Helper text is the helper text within the input field
type InputFieldProps = {
    questionText: String;
    helperText: String;
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

// Uses the type of this props object
function DateInputField(props:InputFieldProps){
    return (
        <Container>
            <ThemeProvider theme={theme}>
                <Typography variant="h6" gutterBottom>{props.questionText}</Typography>
                <DateTimePicker label={props.helperText} />
            </ThemeProvider>
        </Container>
    );
}

export default DateInputField;