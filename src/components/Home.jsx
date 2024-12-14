import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-gray-800 text-white py-4 px-6">
        {/* Title */}
        <h1 className="text-xl font-bold" style={{"fontSize":"27px"}}>CRAFTIFY HUB</h1>

        {/* Links */}
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/merchantLogin"
              className="hover:text-gray-300 transition duration-300 ease-in-out" style={{"fontSize":"20px"}}
            >
              Merchant
            </Link>
          </li>
          <li>
            <Link
              to="/customerLogin"
              className="hover:text-gray-300 transition duration-300 ease-in-out" style={{"fontSize":"20px"}}
            >
              Customer
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-300 to-purple-400">
        <h1 className="text-4xl font-bold text-white mb-2" style={{"fontSize":"40px"}}>
          WELCOME TO CRAFTIFY HUB
        </h1>

        {/* Crafting Quotes and Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quote 1 */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            {/* <h2 className="text-lg font-semibold mb-2">Crafting Quote 1</h2> */}
            <p className="font-bold" style={{"fontSize":"21px"}}>
              DONE IS BETTER THAN PERFECT
            </p>
            <img
              src="https://img.freepik.com/free-photo/giving-final-touches-artwork_1098-18131.jpg?t=st=1713329683~exp=1713333283~hmac=8cc4d9669b069494ba3b36bac1db0cef528ebf8ef0124c70256b0a13914d5c1f&w=900"
              alt="Crafting Image 1"
            />
          </div>

          {/* Quote 2 */}
          <div className="bg-white p-4 rounded-lg shadow-md" style={{"fontSize":"21px"}}>
            {/* <h2 className="text-lg font-semibold mb-2">Crafting Quote 2</h2> */}
            <p className="font-bold">
              THE BEST WAY TO GET STARTED IS TO QUIT TALKING AND BEGIN DOING
            </p>
            <img
              src="https://img.freepik.com/free-photo/wooden-art-pieces-painting-process_23-2148271008.jpg?t=st=1713329734~exp=1713333334~hmac=a0c31bbd6b813bb10f7324cfe21b5a0a5c1435ad5538baf4752accc1fb259fed&w=900"
              alt="Crafting Image 2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
