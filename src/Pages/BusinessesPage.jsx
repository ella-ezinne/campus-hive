import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const categories = [
  "All categories",
  "Restaurants & Cafeterias",
  "Grocery Shops",
  "Banks & ATMs",
  "Salons & Barbershops",
  "Cyber Cafes & Printing Centers",
  "Photography Studios",
  "Fitness & Gym",
  "Bookshop & Stationery",
  "Laundry Services",
  "Mobile Repair & Accessories",
];

const locations = [
  "All locations",
  "SUB",
  "Marlima & Belima",
  "Container",
  "FASA Market",
  "Stadium",
  "Maingate",
  "Library",
  "Okpara & Balewa",
  "Akintola & Akpabio",
  "Okeke & Isakaita",
  "Nkrumah & Boys Hostel",
];

const BusinessesPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category") || "All categories";
  const initialLocation = queryParams.get("location") || "All locations";

  const [businessesData, setBusinessesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [currentPage, setCurrentPage] = useState(1);
  const businessesPerPage = 4;

  // Fetch data from Firestore
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "businesses"));
        const businesses = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBusinessesData(businesses);
      } catch (error) {
        console.error("Error fetching businesses:", error.message);
      }
    };

    fetchBusinesses();
  }, []);

  // Filter businesses based on search term, category, and location
  const filteredBusinesses = businessesData.filter((business) => {
    const matchesSearch = business.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All categories" ||
      business.category === selectedCategory;
    const matchesLocation =
      selectedLocation === "All locations" ||
      business.location === selectedLocation;

    return matchesSearch && matchesCategory && matchesLocation;
  });

  // Pagination values
  const totalBusinesses = filteredBusinesses.length;
  const totalPages = Math.ceil(totalBusinesses / businessesPerPage);
  const startIndex = (currentPage - 1) * businessesPerPage;
  const endIndex = startIndex + businessesPerPage;
  const paginatedBusinesses = filteredBusinesses.slice(startIndex, endIndex);

  // Handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Update filters when query parameters change
  useEffect(() => {
    setSelectedCategory(initialCategory);
    setSelectedLocation(initialLocation);
  }, [initialCategory, initialLocation]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-6">
        Explore Businesses
      </h1>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search for a business..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 mb-4 md:mb-0 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Location Filter */}
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {/* Businesses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedBusinesses.map((business) => (
          <Link
            to={`/business/${business.id}`}
            key={business.id}
            className="border rounded-lg shadow-md p-4 flex flex-col items-center text-center"
          >
            {/* Logo */}
            <img
              src={business.logo}
              alt={`${business.name} Logo`}
              className="w-20 h-20 mb-4 rounded-full"
            />
            {/* Business Name */}
            <h2 className="text-xl font-semibold mb-2">{business.name}</h2>
            {/* Category */}
            <p className="text-green-600 font-medium mb-2">
              {business.category}
            </p>
            {/* Location */}
            <p className="text-gray-500 mb-2">{business.location}</p>
            {/* Description */}
            <p className="text-gray-600">{business.description}</p>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === index + 1
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-green-500 hover:text-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BusinessesPage;
