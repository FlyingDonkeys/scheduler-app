import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Features() {
    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            <Container sx={{ py: 5 }}>
                <Typography variant="h4" align="left" gutterBottom>
                    Features
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Timely is a task planner application designed to help individuals efficiently manage their tasks and schedules.
                    It enables users to create, organize, and track their daily tasks!
                </Typography>
            </Container>

            <Container sx={{ py: 5 }}>
                <Typography variant="h6" gutterBottom>
                    📋 Adding Tasks
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Users may add new tasks to their task list by specifying the following details:
                </Typography>
                <Typography variant="body1" gutterBottom>
                    - 📝 Task title: A short, descriptive title for the task.<br />
                    - 🖊️ Description: Additional information about the task, such as details or notes.<br />
                    - 📅 Due date: A deadline to complete the task.<br />
                    - 🔥 Priority level: Categorize tasks as high, medium, or low priority.
                </Typography>
            </Container>

            <Container sx={{ py: 5 }}>
                <Typography variant="h6" gutterBottom>
                    ✏️ Editing Tasks (to be implemented)
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Users can update existing tasks to modify details, change priorities, or adjust due dates as needed.
                </Typography>
            </Container>

            <Container sx={{ py: 5 }}>
                <Typography variant="h6" gutterBottom>
                    📂 Organizing Tasks (to be implemented)
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Users can organize tasks by using features such as:
                </Typography>
                <Typography variant="body1" gutterBottom>
                    - 🏷️ Categories or tags: Group related tasks together.<br />
                    - 🔍 Search and filters: Quickly locate tasks based on keywords, tags, or priority.<br />
                    - 📊 Sorting options: Sort tasks by start time, priority, or status. Tasks are automatically sorted by start time.
                </Typography>
            </Container>

            <Container sx={{ py: 5 }}>
                <Typography variant="h6" gutterBottom>
                    📈 Tracking Progress
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Users can track the progress of tasks with the following features:
                </Typography>
                <Typography variant="body1" gutterBottom>
                    - ✅ Progress summary: View an overview of completed and remaining tasks.
                </Typography>
            </Container>
        </Container>
    );
}

export default Features;