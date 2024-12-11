import "./hero.css";

const HeroSection = () => {
  return (
    <div className="heroBg relative bg-cover bg-center h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Find What You Need
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          Discover businesses and services near you.
        </p>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search for a business..."
            className="w-3/4 md:w-1/2 px-4 py-2 rounded-l-md focus:outline-none text-black"
          />
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-md">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
