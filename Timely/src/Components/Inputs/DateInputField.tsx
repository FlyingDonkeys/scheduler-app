
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material";
import {indigo} from "@mui/material/colors";
import {DateTimePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {useRef} from "react";

// New data type that defines the shape of the props object
// Question text is the question above the input field
// Helper text is the helper text within the input field
type InputFieldProps = {
    id: string;
    questionText: string;
    helperText: string;
    processDate: Function;
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
 * Renders a date input field component with a label and a date-time picker.
 * It provides functionality to handle and process the selected date using a callback function.
 *
 * @param {InputFieldProps} props - The properties for the date input field component.
 * @param {string} props.id - A unique identifier for the input field.
 * @param {string} props.questionText - A string displayed as the label or question related to the date input.
 * @param {string} props.helperText - A helper text displayed as the label for the date-time picker.
 * @param {function} props.processDate - A callback function to handle the date input value and its corresponding id.
 *
 * @return {JSX.Element} A container including a styled date-time picker and related text fields.
 */
function DateInputField(props:InputFieldProps){

    // Create a reference for the TextField
    const textFieldRef = useRef<HTMLInputElement>(null);

    // Safely handle input
    const handleDateChange = (newValue: Dayjs | null) => {
        if (newValue) {
            props.processDate(newValue.toDate(), props.id);
        } else {
            console.warn("Date ref is null");
        }
    };

    return (
        <Container>
            <ThemeProvider theme={theme}>
                <Typography variant="h6" gutterBottom>{props.questionText}</Typography>
                <DateTimePicker inputRef={textFieldRef} label={props.helperText} defaultValue={dayjs(new Date().setHours(0,0,0,0))} onChange={handleDateChange} />
            </ThemeProvider>
        </Container>
    );
}

export default DateInputField;