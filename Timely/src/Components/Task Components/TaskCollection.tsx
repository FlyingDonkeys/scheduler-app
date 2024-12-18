import {User} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {collection, getDocs, getFirestore, DocumentData} from "firebase/firestore";
import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {useEffect, useState} from "react";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Container from "@mui/material/Container";
import {Grid2} from "@mui/material";
import Typography from "@mui/material/Typography";

type TaskCollection = {
    user: User;
}
function TaskCollection(taskCollectionProps: TaskCollection){

    const [value, setValue] = useState<Dayjs | null>(dayjs());
    const [tasks, setTasks] = useState<DocumentData[]>([]);
    const [selectedTasks, setSelectedTasks] = useState<DocumentData[]>([]);

    const firebaseConfig = {
        apiKey: "AIzaSyANvNatS304vR5YDjA8r3hTRCYDmI9lK4k",
        authDomain: "timely-67981.firebaseapp.com",
        projectId: "timely-67981",
        storageBucket: "timely-67981.firebasestorage.app",
        messagingSenderId: "354706368157",
        appId: "1:354706368157:web:7e6846998c8aa2abb85674",
        measurementId: "G-S17C3JDCL5"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);


    const getTasks = async () => {
        console.log("getting tasks");
        const userTasksCollectionRef = collection(db, "Users", taskCollectionProps.user.uid, "userTasks");

        const userTasksSnapshot = await getDocs(userTasksCollectionRef);

        // fetchedTasks is a temporary array that stores all the fetched tasks
        const fetchedTasks: DocumentData[] = [];
        userTasksSnapshot.forEach((doc) => {
            fetchedTasks.push(doc.data());
        });

        setTasks(fetchedTasks); // Updates the state of tasks
    };

    const handleChange = (newValue: Dayjs | null) => {
        if (!newValue) return;

        console.log("Date has changed to " + newValue.toDate());
        setValue(newValue);

        let tasksStartingOnSelectedDate = tasks.filter((task) => {
            const taskDate = task.startTime.toDate();
            const selectedDate = newValue.toDate();

            const isSameDate =
                taskDate.getFullYear() === selectedDate.getFullYear() &&
                taskDate.getMonth() === selectedDate.getMonth() &&
                taskDate.getDate() === selectedDate.getDate();

            if (isSameDate) {
                console.log("The task with name " + task.taskName + " has starting year " + taskDate.getFullYear() + ", month " + taskDate.getMonth() + ", and date " + taskDate.getDate());
                console.log("We have selected the day " + selectedDate.getFullYear() + ", month " + selectedDate.getMonth() + ", and date " + selectedDate.getDate() + ".");
            }

            return isSameDate; // Include task if dates match
        });

        setSelectedTasks(tasksStartingOnSelectedDate);
        console.log(tasksStartingOnSelectedDate);
    };

    // Only run once per render
    const initialiseTasks = () => {
        getTasks();
        console.log(tasks);
    }
    useEffect(initialiseTasks, []);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            <Container className="py-3" style={{height: '120vh'}}>
                <Grid2 className={"py-2"}>
                    <Typography variant={"h4"}>
                        My Tasks
                    </Typography>
                </Grid2>
                <Grid2 className={"py-2"}>
                    <Typography variant={"body1"}>
                        Tip: To see all your tasks starting on a certain date, first select a date from the calendar below!
                    </Typography>
                </Grid2>
                <hr></hr>
                <Grid2 className={"py-2"}>
                    <DateCalendar value={value} onChange={(newValue: Dayjs) => handleChange(newValue)} />
                </Grid2>
                <hr></hr>
                <Grid2 className={"py-2"}>
                    <Typography variant={"h5"}>
                        Tasks for {value?.format("MMMM D, YYYY")}
                    </Typography>
                </Grid2>

                {/* Dynamically fetch the tasks due on a certain date! */}
                {selectedTasks.length === 0 ?
                    <Grid2 className={"py-2"}>
                        <Typography variant={"h6"} align={"center"} gutterBottom>
                            No tasks today!
                        </Typography>
                    </Grid2>
                    :
                    <Grid2 className={"py-2"}>
                        <Typography variant={"h6"} align={"center"} gutterBottom>
                            No tasks today!
                        </Typography>
                    </Grid2>
                }


            </Container>
        </LocalizationProvider>
    );
}

export default TaskCollection;