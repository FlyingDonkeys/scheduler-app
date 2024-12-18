import {User} from "firebase/auth";

type TaskProps = {
    taskName: string;
    taskDescription: string;
    startTime: Date;
    endTime: Date;
    priority: string;
    user: User;
}

// Task will display all of the users tasks on the main page
function Task(taskProps: TaskProps){

    return (
        <>
            <div>
                <h1>{taskProps.taskName}</h1>
                <p>{taskProps.taskDescription}</p>
                <p>{taskProps.startTime.toString().substring(0, 24)}</p>
                <p>{taskProps.endTime.toString().substring(0, 24)}</p>
                <p>{taskProps.priority}</p>
            </div>
        </>
    )
}

export default Task;