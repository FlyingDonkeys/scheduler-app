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
 * A component for rendering a multiline text input field with additional functionality.
 * Allows the user to input text and processes it using a provided callback function.
 * Functionally identical to InputField, just that this Component has a multiline text field.
 *
 * @param {InputFieldProps} props - The properties passed to the component.
 * @param {string} props.questionText - The question or label text displayed above the input field.
 * @param {string} props.helperText - The helper text displayed within the input field as a placeholder or label.
 * @param {function} props.processText - The callback function used to process the text input. Receives two arguments: the current text input value and the unique identifier of the field.
 * @param {string} props.id - A unique identifier for the input field.
 * @return {JSX.Element} The rendered multiline input field component.
 */
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
                <TextField inputRef={textFieldRef} label={props.helperText} variant="outlined" color="primary" sx={{ width: '240%'}} onChange={handleTextInput} required multiline/>
            </ThemeProvider>
        </Container>
    );
}

export default MultilineInputField;