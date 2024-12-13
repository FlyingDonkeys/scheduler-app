import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material";
import {indigo} from "@mui/material/colors";

// New data type that defines the shape of the props object
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
function MultilineInputField(props:InputFieldProps){
    return (
        <Container>
            <ThemeProvider theme={theme}>
                <Typography variant="h6" gutterBottom>{props.questionText}</Typography>
                <TextField id="outlined-multiline" label={props.helperText} variant="outlined" color="primary" sx={{ width: '300%'}} multiline/>
            </ThemeProvider>
        </Container>
    );
}

export default MultilineInputField;