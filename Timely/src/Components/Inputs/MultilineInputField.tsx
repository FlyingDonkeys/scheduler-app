import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material";
import {indigo} from "@mui/material/colors";
import {useRef} from "react";

// New data type that defines the shape of the props object
type InputFieldProps = {
    id: String;
    questionText: String;
    helperText: String;
    processText: Function;
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

    // Create a reference for the TextField
    const textFieldRef = useRef<HTMLInputElement>(null);

    // Safely handle input
    const handleTextInput = () => {
        if (textFieldRef.current) {
            let currentValue = textFieldRef.current.value;
            props.processText(currentValue, props.id);
        } else {
            console.warn("TextField ref is null");
        }
    };

    return (
        <Container>
            <ThemeProvider theme={theme}>
                <Typography variant="h6" gutterBottom>{props.questionText}</Typography>
                <TextField inputRef={textFieldRef} label={props.helperText} variant="outlined" color="primary" sx={{ width: '300%'}} onChange={handleTextInput} required multiline/>
            </ThemeProvider>
        </Container>
    );
}

export default MultilineInputField;