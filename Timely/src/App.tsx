import Header from "./Components/Header.tsx";
import Features from "./Components/Features.tsx";
import Footer from "./Components/Footer.tsx";
import Card from "./Components/Card.tsx";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import TaskForm from "./Components/TaskForm.tsx";

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Card/>} />
                <Route path="/about" element={<Features/>} />
                <Route path="/addTask" element={<TaskForm/>} />
            </Routes>
            <Footer/>
        </Router>
    )
}

export default App
