# Timely - Task Planner Application

Timely is a feature-rich task planner designed to help individuals organize, track, and manage their daily tasks and schedules efficiently. The application is built using React, Vite, and Firebase, leveraging Material-UI (MUI) for a polished, responsive user interface.

---

## Features

### Core Functionalities

- **Adding Tasks**
    - Specify task details like:
        - ✍️ Task title: A short, descriptive name.
        - 🗚 Description: Detailed information about the task.
        - 📅 Due date: Deadline to complete the task.
        - 🔥 Priority level: High, medium, or low.

- **Task Organization (Planned)**
    - Group tasks using categories or tags.
    - Search and filter tasks by keywords, priority, or tags.
    - Sort tasks by start time, priority, or status (default sorting is by start time).

- **Task Editing (Planned)**
    - Modify task details, priorities, or due dates.

- **Tracking Progress**
    - View an overview of completed and remaining tasks.

- **Task Calendar**
    - Select a date to view tasks starting on that day.
    - Toggle visibility of completed tasks.

---

## Tech Stack

### Frontend
- **React**: For building reusable UI components.
- **Vite**: For a fast development environment and optimized build.
- **Material-UI (MUI)**: For a modern, responsive design.
- **Day.js**: For manipulating and displaying dates and times.

### Backend
- **Firebase Authentication**: Handles user sign-in and sign-up.
- **Firestore**: A cloud database for storing user tasks securely.

### Deployment
- **Railway**: For deploying the application with ease and scalability.

---

## Setup and Installation

### Prerequisites
- Node.js and npm installed.
- Firebase project configured with Firestore and Authentication.

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/timely.git
    ```
2. Navigate to the project directory:
    ```bash
    cd timely
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Run the application:
    ```bash
    npm run dev
    ```
5. Open your browser and navigate to the displayed local development URL.

---

## How to Use

1. **Sign Up or Log In**
    - Create an account or log in using your email and password.

2. **Add a Task**
    - Fill out the task form with details including title, description, start time, end time, and priority.

3. **View Tasks**
    - Navigate to the calendar to select a date and view tasks starting on that day.

4. **Track Progress**
    - Mark tasks as completed or view completed tasks by toggling the completion switch.

5. **Organize and Edit Tasks** (Coming Soon)
    - Features for tagging, searching, and editing tasks are planned for future updates.

---

## Contributing
Contributions are welcome! If you have suggestions for new features or improvements, please open an issue or create a pull request.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgments
- Icons from Material-UI.
- Powered by Firebase.

---

Start managing your tasks effectively with Timely today!
