import {User} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {doc, getDoc, updateDoc, collection, getDocs, getFirestore, DocumentData} from "firebase/firestore";
import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {useEffect, useState} from "react";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Container from "@mui/material/Container";
import {FormControlLabel, Grid2, Slide, Switch} from "@mui/material";
import Typography from "@mui/material/Typography";
import Task from "./Task.tsx";

type TaskCollection = {
    user: User;
}

function TaskCollection(taskCollectionProps: TaskCollection){

    const [value, setValue] = useState<Dayjs | null>(dayjs());
    const [tasks, setTasks] = useState<DocumentData[]>([]);
    const [selectedTasks, setSelectedTasks] = useState<DocumentData[]>([]);
    const [showCompletedTasks, setShowCompletedTasks] = useState(false);

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

        // add all the tasks into fetchedTasks
        userTasksSnapshot.forEach((doc) => {
            fetchedTasks.push(doc.data());
        });

        setTasks(fetchedTasks); // Updates the state of tasks
    };

    async function toggleCompletionStatus (taskName: string){
        console.log("Marking task " + taskName + " as completed");

        // Get the document reference of the task to be marked completed
        const docRef = doc(db, "Users", taskCollectionProps.user.uid, "userTasks", taskName);

        // Get the document snapshot
        const task = await getDoc(docRef);

        // Get the json in the document
        const data = task.data()

        if (data) {
            // Mark completed
            await updateDoc(docRef, {
                isCompleted: !data.isCompleted
            });

            console.log("Marked task " + taskName + " as completed");

            await getTasks(); // Wait for updated tasks to be fetched
            handleChange(value);
        } else {
            console.log("Task " + taskName + " does not exist!");
        }
    };

    const handleChange = (newValue: Dayjs | null) => {
        if (!newValue) return;

        console.log("Date has changed to " + newValue.toDate());
        setValue(newValue);

        let tasksIncludingSelectedDate = tasks.filter((task) => {
            const taskStartDate = task.startTime.toDate();
            const taskEndDate = task.endTime.toDate();
            const selectedDate = newValue.toDate();

            const isWithinDuration =
                taskStartDate <= selectedDate && selectedDate <= taskEndDate;

            if (isWithinDuration) {
                console.log(
                    `The task with name ${task.taskName} starts on ${taskStartDate} and ends on ${taskEndDate}.`
                );
                console.log(
                    `The selected date ${selectedDate} falls within this task's duration.`
                );
            }

            return isWithinDuration; // Include task if the selected date falls within its duration
        });

        setSelectedTasks(tasksIncludingSelectedDate);
        console.log(tasksIncludingSelectedDate);
    };

    const handleSwitchToggle = () => {
        console.log("Switch toggled");
        setShowCompletedTasks(!showCompletedTasks);
    }

    useEffect(() => {
        const initialiseTasks = async () => {
            await getTasks(); // Wait for tasks to be fetched
            console.log("Tasks fetched:", tasks); // This will still log stale tasks initially
            handleChange(dayjs()); // Handle today's date after tasks are fetched
        };
        initialiseTasks();
    }, []); // Only runs once on mount

    useEffect(() => {
        handleChange(value); // Ensure tasks are filtered for today's date
    }, [tasks]); // Runs whenever `tasks` changes

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            <Container className="py-3">
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
                    <Typography variant={"h5"} className={"py-2"}>
                        Tasks for {value?.format("MMMM D, YYYY")}
                    </Typography>
                    <Typography variant={"body1"} color={"info"} className={"py-2"}>
                        Note: Tasks are sorted by default in order of start time from earliest to latest
                    </Typography>
                </Grid2>

                <Grid2 container className={"py-2"}>
                    {/* Dynamically fetch the tasks due on a certain date! */}
                    {selectedTasks.length === 0 ?
                        (<Grid2 className={"py-2"}>
                            <Typography variant={"h6"} align={"center"} gutterBottom>
                                No tasks today!
                            </Typography>
                        </Grid2>)
                        : (selectedTasks
                            .filter(task => !task.isCompleted)
                            .sort((taskA, taskB) => taskA.startTime.toDate() - taskB.startTime.toDate())
                            .map(task =>
                            <Grid2 size={12} className={"py-2"}>
                                <Task taskName={task.taskName} taskDescription={task.taskDescription}
                                      startTime={task.startTime.toDate()} endTime={task.endTime.toDate()}
                                      priority={task.priority} isComplete={task.isCompleted}
                                      toggleCompletion={toggleCompletionStatus}/>
                                <hr></hr>
                            </Grid2>)
                          )
                    }
                </Grid2>

                <hr></hr>

                <Grid2 className={"py-2"}>
                    <Typography variant={"h5"} className={"py-2"}>
                        Completed tasks for {value?.format("MMMM D, YYYY")}
                    </Typography>
                    <FormControlLabel
                        control={<Switch checked={showCompletedTasks} onChange={handleSwitchToggle} />}
                        label="Show completed tasks"
                    />
                </Grid2>

                <Slide direction="up" in={showCompletedTasks} mountOnEnter unmountOnExit>
                    <Grid2 container>
                        {/* Dynamically fetch the tasks due on a certain date! */}
                        {selectedTasks
                            .filter(task => task.isCompleted)
                            .sort((taskA, taskB) => taskA.startTime.toDate() - taskB.startTime.toDate())
                            .map(task =>
                                <Grid2 size={12} className={"py-2"}>
                                    <Task taskName={task.taskName} taskDescription={task.taskDescription}
                                          startTime={task.startTime.toDate()} endTime={task.endTime.toDate()}
                                          priority={task.priority} isComplete={task.isCompleted}
                                          toggleCompletion={toggleCompletionStatus}/>
                                    <hr></hr>
                                </Grid2>)
                        }
                    </Grid2>
                </Slide>

            </Container>
        </LocalizationProvider>
    );
}

export default TaskCollection;