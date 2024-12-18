
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
                <DateTimePicker inputRef={textFieldRef} label={props.helperText} defaultValue={dayjs('2024-01-01T00:00')} onChange={handleDateChange} />
            </ThemeProvider>
        </Container>
    );
}

export default DateInputField;