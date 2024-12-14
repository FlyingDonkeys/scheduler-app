import { Link } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";

const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}

function Header(){
    return (
        <nav className="bg-white shadow dark:bg-gray-800">
            <div
                className="container flex items-center justify-center p-6 mx-auto text-gray-600 dark:text-gray-300">
                <Link to="/"
                   className="text-gray-800 transition-colors duration-300 transform dark:text-gray-200 border-b-2 on hover:border-indigo-600 mx-1.5 sm:mx-6 font-sans">Home</Link>

                <Link to="/about"
                   className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-indigo-600 mx-1.5 sm:mx-6">Features</Link>

                <Link to="/addTask"
                   className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-indigo-600 mx-1.5 sm:mx-6">Add Task</Link>

                <Link to="/"
                   className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-indigo-600 mx-1.5 sm:mx-6"
                    onClick={handleSignOut}>Sign Out</Link>
            </div>
        </nav>
    );
}

export default Header;