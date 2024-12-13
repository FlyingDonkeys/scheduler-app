import Header from "./Tutorial Components/Header.tsx";
import Features from "./Tutorial Components/Features.tsx";
import Footer from "./Tutorial Components/Footer.tsx";
import Card from "./Tutorial Components/Card.tsx";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Card/>} />
                <Route path="/about" element={<Features/>} />
            </Routes>
            <Footer/>
        </Router>
    )
}

export default App
