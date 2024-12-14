import appIcon from "../assets/timely.png";

function SimpleHeader(){
    return (
        <nav className="bg-white shadow dark:bg-gray-800">
            <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 dark:text-gray-300">
                <img src={appIcon}/>
            </div>
        </nav>
    );
}

export default SimpleHeader;