import profPic from "../assets/img.png";

function Card() {
    return (
        <div className="container mx-auto pt-5">
            <div className="card flex items-center bg-gray-100 rounded-lg shadow-md">
                <img src={profPic} alt="Bronze Rank Icon" className="w-16 h-16 rounded-full"/>
                <div>
                    <h2 className="text-lg font-bold">Name: FlyingDonkey</h2>
                    <p className="text-sm text-gray-600">
                        About: League of Legends player, hardstuck Bronze...
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Card;

