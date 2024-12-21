import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material";
import {indigo} from "@mui/material/colors";
import {useRef} from "react";

// New data type that defines the shape of the props object
type InputFieldProps = {
    id: string;
    questionText: string;
    helperText: string;
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
/**
 * A functional component that renders an input field inside a themed container. It captures user input and processes it using the provided callback.
 *
 * @param {InputFieldProps} props - The properties for the InputField component.
 * @param {string} props.id - A unique identifier for the input field.
 * @param {string} props.helperText - Text displayed as the input field's helper or label.
 * @param {string} props.questionText - Text rendered as the label for the input field.
 * @param {function} props.processText - A callback function to process the typed input. It takes the current value and the field ID as arguments.
 * @return {JSX.Element} Returns a JSX element containing the themed input field component.
 */
function InputField(props:InputFieldProps){

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
                <TextField sx={{width : '125%'}} inputRef={textFieldRef} label={props.helperText} variant="outlined" color="primary" required onChange={handleTextInput}/>
            </ThemeProvider>
        </Container>
    );
}

export default InputField;