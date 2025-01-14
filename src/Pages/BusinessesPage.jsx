import { Link } from "react-router-dom";
import { useState } from "react";

const businessesData = [
  {
    id: 1,
    name: "Campus Delight Restaurant",
    category: "Restaurants & Cafeterias",
    location: "SUB",
    description: "Delicious meals at affordable prices.",
    logo: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "TechSavvy Cyber Cafe",
    category: "Cyber Cafes & Printing Centers",
    location: "Container",
    description: "Fast internet and printing services.",
    logo: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    name: "FreshMart Grocery",
    category: "Grocery Shops",
    location: "FASA Market",
    description: "Fresh groceries and household items.",
    logo: "https://via.placeholder.com/100",
  },
  {
    id: 4,
    name: "Elite Photography",
    category: "Photography Studios",
    location: "Library",
    description: "Quality photoshoots for all occasions.",
    logo: "https://via.placeholder.com/100",
  },
  {
    id: 5,
    name: "Sparkling Laundry",
    category: "Laundry Services",
    location: "Marlima & Belima",
    description: "Professional laundry and ironing services.",
    logo: "https://via.placeholder.com/100",
  },
  {
    id: 6,
    name: "GreenBank UNN",
    category: "Banks & ATMs",
    location: "Maingate",
    description: "Secure and fast banking services.",
    logo: "https://via.placeholder.com/100",
  },
  {
    id: 7,
    name: "StyleHub Salon",
    category: "Salons & Barbershops",
    location: "Okeke & Isakaita",
    description: "Trendy haircuts and grooming services.",
    logo: "https://via.placeholder.com/100",
  },
  {
    id: 8,
    name: "UniMall Bookstore",
    category: "Bookshop & Stationery",
    location: "Nkrumah & Boys Hostel",
    description: "Academic and leisure books for everyone.",
    logo: "https://via.placeholder.com/100",
  },
  {
    id: 9,
    name: "Campus Fitness Gym",
    category: "Fitness & Gym",
    location: "Stadium",
    description: "Fitness classes and modern equipment.",
    logo: "https://via.placeholder.com/100",
  },
  {
    id: 10,
    name: "UNN Tech Repairs",
    category: "Mobile Repair & Accessories",
    location: "Okpara & Balewa",
    description: "Quick and affordable device repairs.",
    logo: "https://via.placeholder.com/100",
  },
];

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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const businessesPerPage = 4;

  // Filter businesses based on search term, category, and location
  const filteredBusinesses = businessesData.filter((business) => {
    const matchesSearch = business.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || business.category === selectedCategory;
    const matchesLocation =
      selectedLocation === "All" || business.location === selectedLocation;

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
