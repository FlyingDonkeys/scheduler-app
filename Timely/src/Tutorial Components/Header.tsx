
function Header(){
    return (
        <nav className="bg-white shadow dark:bg-gray-800">
            <div
                className="container flex items-center justify-center p-6 mx-auto text-gray-600 dark:text-gray-300">
                <a href="#"
                   className="text-gray-800 transition-colors duration-300 transform dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6">Home</a>

                <a href="#"
                   className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">Features</a>

                <a href="#"
                   className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">Add Task</a>

                <a href="#"
                   className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">----</a>
            </div>
        </nav>
    );
}

export default Header;